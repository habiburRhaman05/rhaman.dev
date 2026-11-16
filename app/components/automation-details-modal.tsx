"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, MessageSquare, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { boxAspect } from "@/lib/projects";
import {
  telDisplayNumber,
  toLightboxImages,
  type PublicAutomationProject,
} from "@/lib/automation-projects";
import Modal from "./modal";
import ProjectLightbox from "./project-lightbox";

interface AutomationDetailsModalProps {
  project: PublicAutomationProject | null;
  onClose: () => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </h3>
  );
}

function LinkIcon({ kind }: { kind: "website" | "tel" | "chat" }) {
  if (kind === "tel") return <Phone className="h-4 w-4" aria-hidden="true" />;
  if (kind === "chat")
    return <MessageSquare className="h-4 w-4" aria-hidden="true" />;
  return <ExternalLink className="h-4 w-4" aria-hidden="true" />;
}

export default function AutomationDetailsModal({
  project,
  onClose,
}: AutomationDetailsModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) return null;

  const {
    images,
    sections,
    value,
    features,
    techStack,
    hasUnverifiedTech,
    challenges,
    links,
    agency,
    relationship,
    collaborationNote,
  } = project;
  const lightboxImages = toLightboxImages(images);

  const hero = images[0];
  const rest = images.slice(1);

  const titleId = `automation-${project.id}-title`;

  return (
    <Modal
      labelledBy={titleId}
      onClose={onClose}
      className="max-w-4xl"
    >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-8 sm:py-5">
            <div className="min-w-0 space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {agency ? agency.badgeLabel : relationship}
              </p>
              <h2
                id={titleId}
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                {project.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {project.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
            {collaborationNote && (
              <p className="mb-8 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                {collaborationNote}
              </p>
            )}

            {/* Gallery */}
            {hero && (
              <figure className="mb-10 space-y-3">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(0)}
                  aria-label={`Open ${project.title} image 1 in the fullscreen viewer`}
                  style={{
                    aspectRatio: boxAspect(hero.aspect, {
                      min: 4 / 3,
                      max: 2.4,
                      fallback: 16 / 9,
                    }),
                  }}
                  className="relative block w-full overflow-hidden rounded-xl border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    fill
                    sizes="(min-width: 1024px) 896px, 100vw"
                    className={cn(
                      "object-contain",
                      hero.isPlaceholder && "opacity-40 saturate-0"
                    )}
                  />
                </button>
                {(hero.caption || hero.note) && (
                  <figcaption className="text-xs text-muted-foreground">
                    {hero.caption}
                    {hero.note ? ` · ${hero.note}` : ""}
                  </figcaption>
                )}

                {rest.length > 0 && (
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {rest.map((image, offset) => (
                      <li key={image.id}>
                        <button
                          type="button"
                          onClick={() => setLightboxIndex(offset + 1)}
                          aria-label={`Open ${project.title} image ${
                            offset + 2
                          } in the fullscreen viewer`}
                          style={{
                            aspectRatio: boxAspect(image.aspect, {
                              min: 4 / 3,
                              max: 2.4,
                              fallback: 16 / 9,
                            }),
                          }}
                          className="relative block w-full overflow-hidden rounded-lg border border-border bg-muted transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(min-width: 640px) 50vw, 100vw"
                            loading="lazy"
                            className="object-contain"
                          />
                        </button>
                        {image.note && (
                          <p className="mt-1.5 text-xs text-muted-foreground">
                            {image.note}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </figure>
            )}

            {/* Narrative */}
            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.id} className="space-y-3">
                  <SectionTitle>{section.title}</SectionTitle>
                  {section.body && (
                    <p className="text-[15px] leading-relaxed text-muted-foreground">
                      {section.body}
                    </p>
                  )}
                  {section.items && section.items.length > 0 && (
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                        >
                          <span aria-hidden="true" className="text-primary">
                            ·
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {features.length > 0 && (
                <section className="space-y-4">
                  <SectionTitle>Delivered capabilities</SectionTitle>
                  <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {features.map((feature, index) => (
                      <li key={feature} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 font-mono text-xs text-primary"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] leading-relaxed text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-muted-foreground/80">
                    Scope as reported in the project brief.
                  </p>
                </section>
              )}

              {techStack.length > 0 && (
                <section className="space-y-4">
                  <SectionTitle>Technology stack</SectionTitle>
                  <ul className="flex flex-wrap gap-2">
                    {techStack.map((tech) => {
                      const unverified = tech.unverified;
                      return (
                        <li
                          key={tech.name}
                          className={cn(
                            "rounded-lg border px-3 py-1.5 font-mono text-[13px]",
                            unverified
                              ? "border-dashed border-border bg-transparent text-muted-foreground"
                              : "border-border bg-card text-foreground"
                          )}
                        >
                          {tech.name}
                          {unverified && (
                            <span className="ml-2 font-sans text-[11px] uppercase tracking-wider text-muted-foreground/80">
                              unverified
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  {hasUnverifiedTech && (
                    <p className="text-xs text-muted-foreground/80">
                      Entries marked unverified are inferred from project
                      context and have not been confirmed.
                    </p>
                  )}
                </section>
              )}

              {value && (
                <section className="space-y-3">
                  <SectionTitle>{value.title}</SectionTitle>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {value.body}
                  </p>
                  <p className="text-xs text-muted-foreground/80">
                    Describes the intended operating outcome. No measured
                    results are claimed.
                  </p>
                </section>
              )}

              {challenges.length > 0 && (
                <section className="space-y-4">
                  <SectionTitle>Engineering challenges</SectionTitle>
                  <ul className="space-y-4">
                    {challenges.map((challenge) => (
                      <li
                        key={challenge.title}
                        className="border-l-2 border-border pl-4"
                      >
                        <p className="text-[15px] font-medium">
                          {challenge.title}
                        </p>
                        {challenge.resolution && (
                          <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                            {challenge.resolution}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {links.length > 0 && (
                <section className="space-y-4 border-t border-border pt-8">
                  <SectionTitle>Links</SectionTitle>
                  <div className="flex flex-wrap gap-3">
                    {links.map((link) => {
                      const number = telDisplayNumber(link.href);
                      return (
                        <a
                          key={link.id}
                          href={link.href}
                          {...(link.isTel
                            ? {}
                            : {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              })}
                          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <LinkIcon kind={link.kind} />
                          {link.label}
                          {number && (
                            <span className="font-mono text-xs text-muted-foreground">
                              {number}
                            </span>
                          )}
                          {!link.isTel && (
                            <span className="sr-only">
                              {" "}
                              (opens in a new tab)
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                  {links.some((link) => link.isTel) && (
                    <p className="text-xs text-muted-foreground/80">
                      The voice demo places a call only when you choose to dial
                      the number.
                    </p>
                  )}
                </section>
              )}
            </div>
          </div>

          {lightboxIndex !== null && (
            <ProjectLightbox
              items={lightboxImages}
              index={lightboxIndex}
              onIndexChange={setLightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
    </Modal>
  );
}
