import { absoluteUrl, jsonLd } from "@/lib/seo";
import type { Metadata } from "next/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { Button } from "@/app/components/ui/button";
import {
  ProjectGallery,
  ProjectHeroFigure,
} from "@/app/components/project-media";
import {
  boxAspect,
  isAspectClamped,
  getAllProjects,
  getCategoryLabel,
  getProjectById,
  getProjectFacts,
  getProjectImages,
  getProjectLinks,
  getRelatedProjects,
  getStatusLabel,
  getTagsLabel,
  type Project,
} from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

// Any id outside generateStaticParams() renders the not-found page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().filter((project) => project.detailsEnabled !== false).map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project || project.detailsEnabled === false) {
    return { title: "Project not found — Habibur Rhaman" };
  }

  const title = `${project.title} — ${project.subtitle}`;

  return {
    title: `${title} | Habibur Rhaman`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title,
      description: project.description,
      type: "article",
      url: absoluteUrl(`/projects/${project.id}`),
      images: [{ url: project.heroImage, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [project.heroImage],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Pieces                                                                    */
/* -------------------------------------------------------------------------- */

function SectionTitle({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
    >
      {children}
    </h2>
  );
}

function RelatedCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        style={{ aspectRatio: boxAspect(project.imageAspect) }}
        className="relative block w-full overflow-hidden rounded-lg border border-border bg-muted"
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          loading="lazy"
          className={
            isAspectClamped(project.imageAspect)
              ? "object-cover object-top"
              : "object-cover object-center"
          }
        />
      </span>
      <span className="flex flex-1 flex-col gap-1.5">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {getCategoryLabel(project.category)}
        </span>
        <span className="text-base font-semibold tracking-tight">
          {project.title}
        </span>
        <span className="text-sm text-muted-foreground">
          {project.subtitle}
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        View details
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project || project.detailsEnabled === false) notFound();

  const images = getProjectImages(project);
  const links = getProjectLinks(project);
  const facts = getProjectFacts(project);
  const related = getRelatedProjects(project);
  const isUpcoming = project.status === "upcoming";
  const hasDetail =
    project.features.length > 0 ||
    project.tags.length > 0 ||
    images.length > 1;

  return (
    <article className="relative min-h-screen grid-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({
        "@context": "https://schema.org", "@graph": [
          { "@type": "CreativeWork", name: project.title, description: project.description,
            url: absoluteUrl(`/projects/${project.id}`), image: absoluteUrl(project.heroImage),
            author: { "@type": "Person", name: "Habibur Rahman", url: absoluteUrl("/") },
            ...(project.collaborators?.length ? { contributor: project.collaborators.map(p => ({ "@type": "Person", name: p.name })) } : {}) },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: project.title, item: absoluteUrl(`/projects/${project.id}`) }
          ] }
        ]
      }) }} />
      <div className="grid-glow" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 sm:px-8 sm:pt-32">
        <Breadcrumb className="mb-10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/#projects">Projects</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground">
                {project.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-wider text-muted-foreground">
            <span className="font-medium text-primary">
              {getCategoryLabel(project.category)}
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-border" />
            <span>{getStatusLabel(project.status)}</span>
            {project.industry && (
              <>
                <span aria-hidden="true" className="h-3 w-px bg-border" />
                <span>{project.industry}</span>
              </>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              {project.subtitle}
            </p>
          </div>

          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.description}
          </p>
          {project.collaborators && project.collaborators.length > 0 && (
            <div className="flex flex-wrap gap-2" aria-label="Project collaborators">
              {project.collaborators.map((person) => (
                <span key={person.name} className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm">
                  Built in collaboration with <strong className="font-semibold">{person.name}</strong>
                  <span className="text-muted-foreground"> · {person.role}</span>
                </span>
              ))}
            </div>
          )}

          {links.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {links.map((link) => (
                <Button
                  key={link.href + link.label}
                  asChild
                  variant={link.tone === "primary" ? "default" : "outline"}
                  className="rounded-xl"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.kind === "repo" ? (
                      <Github className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    )}
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
              ))}
            </div>
          )}
        </header>

        {/* Hero */}
        <div className="mt-12">
          <ProjectHeroFigure images={images} title={project.title} />
        </div>

        {/* Facts */}
        <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="space-y-1.5">
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="text-sm font-medium text-foreground">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        {isUpcoming && !hasDetail && (
          <p className="mt-10 rounded-xl border border-dashed border-border bg-card/50 p-6 text-sm leading-relaxed text-muted-foreground">
            This project is still in progress. Screens, features and technical
            details will be published here once it is ready to show.
          </p>
        )}

        {/* Features */}
        {project.features.length > 0 && (
          <section className="mt-16 space-y-6" aria-labelledby="features-title">
            <SectionTitle id="features-title">What it does</SectionTitle>
            <ol className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {project.features.map((feature, index) => (
                <li key={feature} className="flex gap-4">
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
          </section>
        )}

        {/* Tags: technology stack or capabilities */}
        {project.tags.length > 0 && (
          <section className="mt-16 space-y-6" aria-labelledby="tags-title">
            <SectionTitle id="tags-title">{getTagsLabel(project)}</SectionTitle>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-[13px] text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Gallery */}
        {images.length > 1 && (
          <section className="mt-20 space-y-8" aria-labelledby="gallery-title">
            <div className="space-y-2">
              <SectionTitle id="gallery-title">Gallery</SectionTitle>
              <p className="text-sm text-muted-foreground">
                Select any image to open the fullscreen viewer with zoom and
                keyboard navigation.
              </p>
            </div>
            <ProjectGallery images={images} title={project.title} />
          </section>
        )}

        {/* Challenges & future plans */}
        {(project.challenges.length > 0 || project.futurePlans.length > 0) && (
          <div className="mt-20 grid gap-12 border-t border-border pt-12 lg:grid-cols-2 lg:gap-16">
            {project.challenges.length > 0 && (
              <section
                className="space-y-6"
                aria-labelledby="challenges-title"
              >
                <SectionTitle id="challenges-title">
                  Engineering challenges
                </SectionTitle>
                <ul className="space-y-4">
                  {project.challenges.map((challenge) => (
                    <li
                      key={challenge}
                      className="border-l-2 border-border pl-4 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      {challenge}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.futurePlans.length > 0 && (
              <section className="space-y-6" aria-labelledby="plans-title">
                <SectionTitle id="plans-title">What&apos;s next</SectionTitle>
                <ul className="space-y-4">
                  {project.futurePlans.map((plan) => (
                    <li
                      key={plan}
                      className="border-l-2 border-primary/40 pl-4 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      {plan}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 space-y-8" aria-labelledby="related-title">
            <SectionTitle id="related-title">Other projects</SectionTitle>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="flex">
                  <RelatedCard project={item} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Back */}
        <div className="mt-20 border-t border-border pt-8">
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/#projects">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to all projects
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
