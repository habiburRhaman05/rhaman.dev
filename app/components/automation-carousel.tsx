"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { boxAspect } from "@/lib/projects";
import type { PublicAutomationImage } from "@/lib/automation-projects";

interface AutomationCarouselProps {
  images: PublicAutomationImage[];
  title: string;
  /** Opens the fullscreen viewer at the given index, when provided. */
  onImageActivate?: (index: number) => void;
}

/**
 * Image carousel for an automation card. Never autoplays; navigation is
 * hidden entirely when a project has a single image.
 */
export default function AutomationCarousel({
  images,
  title,
  onImageActivate,
}: AutomationCarouselProps) {
  const reduceMotion = useReducedMotion();
  const multiple = images.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: multiple,
    align: "start",
    active: multiple,
    duration: reduceMotion ? 0 : 25,
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (images.length === 0) return null;

  // One box for every slide, sized to the widest image so nothing is cropped.
  const ratio = boxAspect(
    Math.max(...images.map((image) => image.aspect ?? 16 / 10)),
    { min: 4 / 3, max: 16 / 9, fallback: 16 / 10 }
  );

  const current = images[selected] ?? images[0];
  const note = current.note;

  return (
    <div className="space-y-2">
      <div className="relative">
        <div
          className="overflow-hidden rounded-xl border border-border bg-muted"
          ref={emblaRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={`${title} images`}
        >
          <div className="flex touch-pan-y">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative min-w-0 flex-[0_0_100%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`Image ${index + 1} of ${images.length}`}
              >
                <button
                  type="button"
                  onClick={() => onImageActivate?.(index)}
                  disabled={!onImageActivate}
                  aria-label={`Open ${title} image ${index + 1} in the fullscreen viewer`}
                  style={{ aspectRatio: ratio }}
                  className="relative block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring disabled:cursor-default"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading="lazy"
                    className={cn(
                      "object-contain",
                      image.isPlaceholder && "opacity-40 saturate-0"
                    )}
                  />
                  {image.isPlaceholder && (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <ImageIcon className="h-6 w-6" aria-hidden="true" />
                      <span className="text-xs font-medium">
                        Imagery coming soon
                      </span>
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {multiple && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              aria-label={`Previous image of ${title}`}
              className="absolute left-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label={`Next image of ${title}`}
              className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <span
              className="pointer-events-none absolute bottom-2 right-2 rounded-md border border-border bg-background/90 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              aria-live="polite"
            >
              {selected + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {(current.caption || note) && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {current.caption}
          {note && (
            <span className="text-muted-foreground/80">
              {current.caption ? " · " : ""}
              {note}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
