import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectTabs from "./project-tabs";
import AutomationProjects from "./automation-projects";
import {
  getAttributionAgencies,
  getPublicAutomationProjects,
} from "@/lib/automation-projects";

/** Automation and CRM work lives in its own collection, under this tab. */
const AUTOMATION_DISCIPLINE = "ai-automation-crm";
import {
  boxAspect,
  getCategoryLabel,
  getClientDisciplines,
  getClientProjectsByDiscipline,
  getProjectsByCategory,
  getStatusLabel,
  getTagsLabel,
  isAspectClamped,
  type ClientDiscipline,
  type Project,
} from "@/lib/projects";

/* -------------------------------------------------------------------------- */
/*  Shared pieces                                                             */
/* -------------------------------------------------------------------------- */

function StatusPill({ project }: { project: Project }) {
  const isLive = project.status === "live" || project.status === "running";
  const isUpcoming = project.status === "upcoming";

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isLive && "bg-emerald-500",
          isUpcoming && "bg-amber-500",
          !isLive && !isUpcoming && "bg-primary"
        )}
      />
      {getStatusLabel(project.status)}
    </span>
  );
}

/**
 * The box takes the image's own aspect ratio (clamped for extremes), so the
 * thumbnail fills it edge to edge with no letterboxing.
 */
function Thumbnail({
  project,
  sizes,
  priority = false,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const ratio = boxAspect(project.imageAspect);
  const cropped = isAspectClamped(project.imageAspect);

  return (
    <span
      style={{ aspectRatio: ratio }}
      className={cn(
        "relative block w-full overflow-hidden rounded-xl border border-border bg-muted",
        className
      )}
    >
      <Image
        src={project.image}
        alt={`${project.title} — ${project.subtitle}`}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]",
          cropped ? "object-top" : "object-center"
        )}
      />
    </span>
  );
}

function TagList({
  project,
  limit,
  className,
}: {
  project: Project;
  limit?: number;
  className?: string;
}) {
  if (project.tags.length === 0) return null;
  const shown = limit ? project.tags.slice(0, limit) : project.tags;
  const remaining = project.tags.length - shown.length;

  return (
    <ul
      className={cn("flex flex-wrap items-center gap-x-2 gap-y-1.5", className)}
      aria-label={getTagsLabel(project)}
    >
      {shown.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-border/70 bg-background/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
        >
          {tag}
        </li>
      ))}
      {remaining > 0 && (
        <li className="font-mono text-[11px] text-muted-foreground/80">
          +{remaining}
        </li>
      )}
    </ul>
  );
}

function DetailsAffordance({ label = "View details" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
      {label}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
    </span>
  );
}

function GroupHeading({
  index,
  label,
  description,
  count,
}: {
  index: string;
  label: string;
  description: string;
  count: number;
}) {
  return (
    <div className="mb-10 border-t border-border pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight sm:text-2xl">
          <span className="font-mono text-sm text-primary">{index}</span>
          {label}
        </h3>
        <span className="font-mono text-xs text-muted-foreground">
          {count} {count === 1 ? "project" : "projects"}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Client work                                                               */
/* -------------------------------------------------------------------------- */

function EmptyDiscipline({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-12 text-center">
      <p className="text-sm font-medium text-foreground">
        No {label} projects yet
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Work in this area is not published here yet. The delivered client
        projects are under Web &amp; Software Development.
      </p>
    </div>
  );
}

function disciplineCount(discipline: ClientDiscipline): number {
  return discipline.id === AUTOMATION_DISCIPLINE
    ? getPublicAutomationProjects().length
    : getClientProjectsByDiscipline(discipline.id).length;
}

function DisciplinePanel({ discipline }: { discipline: ClientDiscipline }) {
  if (discipline.id === AUTOMATION_DISCIPLINE) {
    return (
      <AutomationProjects
        projects={getPublicAutomationProjects()}
        agencies={getAttributionAgencies()}
      />
    );
  }

  const projects = getClientProjectsByDiscipline(discipline.id);
  if (discipline.id === "mobile-apps" && projects.length > 0) {
    return <ul className="grid gap-6 lg:grid-cols-2">{projects.map((project) => (
      <li key={project.id} className="rounded-2xl border border-border bg-card p-5 space-y-5">
        <Thumbnail project={project} sizes="(min-width: 1024px) 45vw, 100vw" />
        <div className="flex flex-wrap items-center gap-3"><span className="text-xs font-medium uppercase tracking-wider text-primary">{getCategoryLabel(project.category)}</span><StatusPill project={project} /></div>
        <div><h4 className="text-2xl font-semibold">{project.title}</h4><p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p></div>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        {project.detailsEnabled === false ? <><p className="text-xs text-muted-foreground">Concept preview. Features are in development.</p><button disabled className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground opacity-60 cursor-not-allowed">Details coming soon</button></> : <Link href={`/projects/${project.id}`}><DetailsAffordance /></Link>}
      </li>
    ))}</ul>;
  }
  const [lead, ...rest] = [
    ...projects.filter((project) => project.featured),
    ...projects.filter((project) => !project.featured),
  ];

  if (!lead) return <EmptyDiscipline label={discipline.label} />;

  return (
    <>
      <ClientLead project={lead} />
      {rest.length > 0 && (
        <ul className="mt-6 grid gap-6 lg:grid-cols-2">
          {rest.map((project) => (
            <li key={project.id} className="flex">
              <ClientCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function ClientLead({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6"
    >
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Thumbnail
            project={project}
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority
          />
        </div>

        <div className="space-y-5 lg:col-span-5 lg:pr-4">
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill project={project} />
            {project.industry && (
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {project.industry}
              </span>
            )}
          </div>

          <div className="space-y-2">
            {project.client && (
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {project.client}
              </p>
            )}
            <h4 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.title}
            </h4>
            <p className="text-sm text-muted-foreground">{project.subtitle}</p>
          </div>

          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <TagList project={project} limit={5} />
          <DetailsAffordance label="View project details" />
        </div>
      </div>
    </Link>
  );
}

function ClientCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-5"
    >
      <Thumbnail
        project={project}
        sizes="(min-width: 1024px) 45vw, 100vw"
      />

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {project.client ? (
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {project.client}
            </span>
          ) : (
            <span />
          )}
          <StatusPill project={project} />
        </div>

        <div className="space-y-1.5">
          <h4 className="text-xl font-semibold tracking-tight">
            {project.title}
          </h4>
          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-auto space-y-4 pt-1">
          <TagList project={project} limit={4} />
          <DetailsAffordance />
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Personal work                                                             */
/* -------------------------------------------------------------------------- */

function PersonalRow({ project, index }: { project: Project; index: number }) {
  return (
    <li>
      <Link
        href={`/projects/${project.id}`}
        className="group grid items-center gap-5 rounded-2xl p-3 transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-12 sm:gap-8 sm:p-4"
      >
        <div className="sm:col-span-5 lg:col-span-4">
          <Thumbnail
            project={project}
            sizes="(min-width: 640px) 40vw, 100vw"
          />
        </div>

        <div className="space-y-3 sm:col-span-7 lg:col-span-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <StatusPill project={project} />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {project.title}
            </h4>
            <p className="text-sm text-muted-foreground">{project.subtitle}</p>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <TagList project={project} limit={6} />
          <DetailsAffordance />
        </div>
      </Link>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Upcoming work                                                             */
/* -------------------------------------------------------------------------- */

function UpcomingCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-dashed border-border bg-card/50 p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        style={{ aspectRatio: boxAspect(project.imageAspect) }}
        className="relative block w-full overflow-hidden rounded-xl border border-border bg-muted"
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover opacity-50 saturate-50"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-border bg-background/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Coming soon
          </span>
        </span>
      </span>

      <div className="flex flex-1 flex-col gap-3">
        <div className="space-y-1.5">
          <h4 className="text-lg font-semibold tracking-tight">
            {project.title}
          </h4>
          {project.industry && (
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {project.industry}
            </p>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-auto pt-1">
          <DetailsAffordance />
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function Projects() {
  const clientProjects = getProjectsByCategory("client");
  const clientDisciplines = getClientDisciplines();
  const personalProjects = getProjectsByCategory("personal").filter((project) => project.discipline !== "mobile-apps");
  const upcomingProjects = getProjectsByCategory("upcoming");

  return (
    <section id="projects" className="py-20">
      <div className="mb-16">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
          Portfolio
        </p>
        <h2 className="section-heading text-3xl font-bold sm:text-4xl">
          Selected Work
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Delivered client platforms and self-directed engineering projects,
          grouped by discipline. Explore case studies and features, with concept
          previews for apps in development.
        </p>
      </div>

      <div className="mb-24">
        <GroupHeading
          index="01"
          label="Real Client Works in Ghlprime"
          description="Client websites, software and automation, alongside personal mobile apps in development."
          count={clientProjects.length + getPublicAutomationProjects().length + getClientProjectsByDiscipline("mobile-apps").filter((project) => project.category === "personal").length}
        />

        <ProjectTabs
          label="Project disciplines"
          tabs={clientDisciplines.map((discipline) => ({
            id: discipline.id,
            label: discipline.label,
            count: disciplineCount(discipline),
          }))}
          panels={Object.fromEntries(
            clientDisciplines.map((discipline) => [
              discipline.id,
              <DisciplinePanel key={discipline.id} discipline={discipline} />,
            ])
          )}
        />
      </div>

      {personalProjects.length > 0 && (
        <div className="mb-24">
          <GroupHeading
            index="02"
            label={getCategoryLabel("personal")}
            description="Products built end to end to explore architecture, real-time systems and AI tooling, with source code available."
            count={personalProjects.length}
          />

          <ol className="divide-y divide-border">
            {personalProjects.map((project, index) => (
              <PersonalRow key={project.id} project={project} index={index} />
            ))}
          </ol>
        </div>
      )}

      {upcomingProjects.length > 0 && (
        <div>
          <GroupHeading
            index="03"
            label={getCategoryLabel("upcoming")}
            description="Work in progress. Details and screens are published here once each project is ready to show."
            count={upcomingProjects.length}
          />

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingProjects.map((project) => (
              <li key={project.id} className="flex">
                <UpcomingCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
