"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { boxAspect, isAspectClamped, type ProjectImage } from "@/lib/projects";

/** Hero and gallery boxes allow taller/wider shapes than the section thumbnails. */
const MEDIA_BOX = { min: 4 / 3, max: 2.4, fallback: 16 / 9 };

/**
 * Matching the box to the image means it fills edge to edge. Only sources too
 * tall or too wide to display whole are clamped, and those are cropped from
 * the top rather than letterboxed.
 */
function mediaBoxProps(aspect: number | undefined) {
  const clamped = isAspectClamped(aspect, MEDIA_BOX);
  return {
    ratio: boxAspect(aspect, MEDIA_BOX),
    fit: clamped ? "object-cover object-top" : "object-contain",
  };
}
import ProjectLightbox from "./project-lightbox";

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

interface ProjectHeroFigureProps {
  /** Full viewable set; the hero is expected to be the first entry. */
  images: ProjectImage[];
  title: string;
}

export function ProjectHeroFigure({ images, title }: ProjectHeroFigureProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hero = images[0];

  if (!hero) return null;

  const heroBox = mediaBoxProps(hero.aspect);

  return (
    <>
      <figure className="space-y-3">
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          aria-label={`Open ${title} hero image in the fullscreen viewer`}
          className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            style={{ aspectRatio: heroBox.ratio }}
            className="relative block w-full"
          >
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className={heroBox.fit}
              priority
            />
          </span>
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/90 px-2.5 py-1.5 text-xs font-medium text-foreground opacity-90 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand className="h-3.5 w-3.5" aria-hidden="true" />
            View fullscreen
          </span>
        </button>
        {hero.note && (
          <figcaption className="text-xs text-muted-foreground">
            {hero.note}
          </figcaption>
        )}
      </figure>

      {openIndex !== null && (
        <ProjectLightbox
          items={images}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                   */
/* -------------------------------------------------------------------------- */

interface ProjectGalleryProps {
  /** Full viewable set, used for lightbox navigation. */
  images: ProjectImage[];
  /** How many leading entries to omit from the grid (the hero shown above). */
  skip?: number;
  title: string;
}

export function ProjectGallery({ images, skip = 1, title }: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = images.slice(skip);

  if (visible.length === 0) return null;

  return (
    <>
      <ul
        className={cn(
          "grid gap-8 sm:gap-10",
          visible.length > 1 && "lg:grid-cols-2"
        )}
      >
        {visible.map((image, offset) => {
          const index = offset + skip;
          const box = mediaBoxProps(image.aspect);
          return (
            <li key={`${image.src}-${index}`}>
              <figure className="space-y-3">
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={`Open ${title} — ${
                    image.caption || image.alt
                  } in the fullscreen viewer`}
                  className="group relative block w-full overflow-hidden rounded-xl border border-border bg-muted transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span
                    style={{ aspectRatio: box.ratio }}
                    className="relative block w-full"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={box.fit}
                      loading="lazy"
                    />
                  </span>
                  <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/90 px-2 py-1 text-[11px] font-medium text-foreground opacity-90 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand className="h-3 w-3" aria-hidden="true" />
                    Expand
                  </span>
                </button>
                <figcaption className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-sm font-medium text-foreground">
                    {image.caption || image.alt}
                  </span>
                  {image.note && (
                    <span className="text-xs text-muted-foreground">
                      · {image.note}
                    </span>
                  )}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      {openIndex !== null && (
        <ProjectLightbox
          items={images}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
