"use client";

import { useState } from "react";
import { ArrowUpRight, ExternalLink, MessageSquare, Phone } from "lucide-react";
import {
  telDisplayNumber,
  toLightboxImages,
  type AutomationAgency,
  type PublicAutomationProject,
} from "@/lib/automation-projects";
import AutomationCarousel from "./automation-carousel";
import AutomationDetailsModal from "./automation-details-modal";
import ProjectLightbox from "./project-lightbox";

interface AutomationProjectsProps {
  projects: PublicAutomationProject[];
  agencies: AutomationAgency[];
}

/* -------------------------------------------------------------------------- */
/*  Collection attribution                                                    */
/* -------------------------------------------------------------------------- */

function CompanyAffiliations({ agencies }: { agencies: AutomationAgency[] }) {
  if (agencies.length === 0) return null;

  return (
    <div className="mb-10 rounded-2xl border border-border bg-card/60 p-5 sm:p-6">
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Company affiliations
      </h4>
      <ul className="mt-4 flex flex-wrap gap-3">
        {agencies.map((agency) => {
          const content = (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              {agency.name}
            </>
          );
          return (
            <li key={agency.id}>
              {agency.websiteUrl ? (
                <a
                  href={agency.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {content}
                  <ExternalLink className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium">
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        These projects were delivered as company client work. Each card credits
        the company that delivered that project.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

function ActionLink({
  href,
  label,
  isTel,
  kind,
}: {
  href: string;
  label: string;
  isTel: boolean;
  kind: "website" | "tel" | "chat";
}) {
  const number = telDisplayNumber(href);
  const Icon = kind === "tel" ? Phone : kind === "chat" ? MessageSquare : ExternalLink;

  return (
    <a
      href={href}
      {...(isTel ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
      {number && (
        <span className="font-mono text-xs text-muted-foreground">{number}</span>
      )}
      {!isTel && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

function AutomationCard({
  project,
  onViewDetails,
  onImageActivate,
}: {
  project: PublicAutomationProject;
  onViewDetails: () => void;
  onImageActivate: (index: number) => void;
}) {
  const { agency, relationship, collaborationNote, links } = project;
  const tech = project.techStack.slice(0, 4);
  const remainingTech = project.techStack.length - tech.length;

  return (
    <article className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30 sm:p-5">
      <AutomationCarousel
        images={project.images}
        title={project.title}
        onImageActivate={onImageActivate}
      />

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {agency ? (
            agency.websiteUrl ? (
              <a
                href={agency.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {agency.name}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {agency.name}
              </span>
            )
          ) : (
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {relationship}
            </span>
          )}
          <span aria-hidden="true" className="h-3 w-px bg-border" />
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            {project.industry}
          </span>
          {project.featured && (
            <span className="text-xs uppercase tracking-wider text-muted-foreground/70">
              Featured
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <h4 className="text-xl font-semibold tracking-tight">
            {project.title}
          </h4>
          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.overview}
        </p>

        {collaborationNote && (
          <p className="text-xs leading-relaxed text-muted-foreground/80">
            {collaborationNote}
          </p>
        )}

        {tech.length > 0 && (
          <ul
            className="flex flex-wrap items-center gap-x-2 gap-y-1.5"
            aria-label="Technology"
          >
            {tech.map((item) => (
              <li
                key={item.name}
                className="rounded-md border border-border/70 bg-background/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {item.name}
              </li>
            ))}
            {remainingTech > 0 && (
              <li className="font-mono text-[11px] text-muted-foreground/80">
                +{remainingTech}
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={onViewDetails}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View Details
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
          {links.map((link) => (
            <ActionLink
              key={link.id}
              href={link.href}
              label={link.label}
              isTel={link.isTel}
              kind={link.kind}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Panel                                                                     */
/* -------------------------------------------------------------------------- */

export default function AutomationProjects({
  projects,
  agencies,
}: AutomationProjectsProps) {
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{
    projectId: string;
    index: number;
  } | null>(null);

  if (projects.length === 0) return null;

  const detailsProject =
    projects.find((project) => project.id === detailsId) ?? null;
  const lightboxProject = lightbox
    ? projects.find((project) => project.id === lightbox.projectId)
    : undefined;

  return (
    <div>
      <CompanyAffiliations agencies={agencies} />

      <ul className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id} className="flex">
            <AutomationCard
              project={project}
              onViewDetails={() => setDetailsId(project.id)}
              onImageActivate={(index) =>
                setLightbox({ projectId: project.id, index })
              }
            />
          </li>
        ))}
      </ul>

      <AutomationDetailsModal
        project={detailsProject}
        onClose={() => setDetailsId(null)}
      />

      {lightbox && lightboxProject && (
        <ProjectLightbox
          items={toLightboxImages(lightboxProject.images)}
          index={lightbox.index}
          onIndexChange={(index) => setLightbox({ ...lightbox, index })}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
