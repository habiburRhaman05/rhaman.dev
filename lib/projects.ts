import projectsJson from "@/data/projects.json";

/* -------------------------------------------------------------------------- */
/*  Types for data/projects.json                                              */
/* -------------------------------------------------------------------------- */

export type ProjectCategoryId = "personal" | "client" | "upcoming";

export type ProjectStatus = "live" | "running" | "delivered" | "upcoming" | "in-development";

/** `technology` means the tags are a tech stack, `capabilities` means feature areas. */
export type ProjectTagsType = "technology" | "capabilities";

export interface ProjectCategory {
  id: ProjectCategoryId;
  label: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  /** Free-form descriptor used as the gallery caption ("hero", "administration", …). */
  kind: string;
  /** Generated/mocked composition rather than a verified screenshot. */
  isConcept: boolean;
  /** Measured width / height, so image boxes can match the content exactly. */
  aspect?: number;
}

/** Discipline buckets used to group client work. */
export type ClientDisciplineId =
  | "web-software"
  | "mobile-apps"
  | "ai-automation-crm";

export interface ClientDiscipline {
  id: ClientDisciplineId;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategoryId;
  status: ProjectStatus;
  featured: boolean;
  client: string | null;
  industry: string | null;
  image: string;
  heroImage: string;
  gallery: ProjectGalleryItem[];
  /** Measured aspect ratio of `image`. */
  imageAspect?: number;
  /** Measured aspect ratio of `heroImage`. */
  heroAspect?: number;
  /** Only set on client projects. */
  discipline?: ClientDisciplineId;
  detailsEnabled?: boolean;
  tags: string[];
  tagsType: ProjectTagsType;
  features: string[];
  challenges: string[];
  futurePlans: string[];
  websiteUrl: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  backendUrl: string | null;
  gradient: string;
  contentSource: string;
  collaborators?: { name: string; role: string }[];
}

export interface ProjectsData {
  schemaVersion: number;
  categories: ProjectCategory[];
  clientDisciplines: ClientDiscipline[];
  notes: Record<string, string>;
  projects: Project[];
}

const data = projectsJson as unknown as ProjectsData;

/* -------------------------------------------------------------------------- */
/*  Accessors                                                                 */
/* -------------------------------------------------------------------------- */

export const CATEGORY_ORDER: ProjectCategoryId[] = [
  "client",
  "personal",
  "upcoming",
];

export function getCategories(): ProjectCategory[] {
  return CATEGORY_ORDER.map((id) =>
    data.categories.find((category) => category.id === id)
  ).filter((category): category is ProjectCategory => Boolean(category));
}

export function getCategoryLabel(id: ProjectCategoryId): string {
  return data.categories.find((category) => category.id === id)?.label ?? id;
}

export function getClientDisciplines(): ClientDiscipline[] {
  return data.clientDisciplines;
}

/**
 * Client projects for one discipline. Returns an empty array for disciplines
 * with nothing published yet — those are still shown, with a count of zero.
 */
export function getClientProjectsByDiscipline(
  discipline: ClientDisciplineId
): Project[] {
  return data.projects.filter(
    (project) =>
      project.discipline === discipline && (project.category === "client" || discipline === "mobile-apps")
  );
}

export function getAllProjects(): Project[] {
  return data.projects;
}

export function getProjectsByCategory(category: ProjectCategoryId): Project[] {
  return data.projects.filter((project) => project.category === category);
}

export function getProjectById(id: string): Project | undefined {
  return data.projects.find((project) => project.id === id);
}

/**
 * Same-category projects first, then anything else, so every project has a
 * meaningful "related" row even in small categories.
 */
export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const others = data.projects.filter((candidate) => candidate.id !== project.id && candidate.detailsEnabled !== false);
  const sameCategory = others.filter(
    (candidate) => candidate.category === project.category
  );
  const rest = others.filter(
    (candidate) => candidate.category !== project.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/*  Derived helpers                                                           */
/* -------------------------------------------------------------------------- */

/** Treats "", "#" and null/undefined as "no link". */
export function normalizeUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed || trimmed === "#") return null;
  return trimmed;
}

export type ProjectLinkTone = "primary" | "secondary";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "website" | "demo" | "repo";
  tone: ProjectLinkTone;
}

/**
 * Builds the link list for a project. A client's business website is never
 * presented as an app demo, and empty/placeholder URLs are dropped entirely.
 */
export function getProjectLinks(project: Project): ProjectLink[] {
  const website = normalizeUrl(project.websiteUrl);
  const demo = normalizeUrl(project.demoUrl);
  const repo = normalizeUrl(project.githubUrl);
  const backend = normalizeUrl(project.backendUrl);

  const links: ProjectLink[] = [];

  if (project.category === "client") {
    if (website) {
      links.push({
        label: "Client Website",
        href: website,
        kind: "website",
        tone: "primary",
      });
    }
    if (demo && demo !== website) {
      links.push({
        label: "Live Demo",
        href: demo,
        kind: "demo",
        tone: "primary",
      });
    }
  } else if (project.status === "upcoming") {
    const preview = demo ?? website;
    if (preview) {
      links.push({
        label: "Live Preview",
        href: preview,
        kind: "demo",
        tone: "primary",
      });
    }
  } else {
    if (demo) {
      links.push({
        label: "Live Demo",
        href: demo,
        kind: "demo",
        tone: "primary",
      });
    }
    if (website && website !== demo) {
      links.push({
        label: "Visit Website",
        href: website,
        kind: "website",
        tone: "primary",
      });
    }
  }

  if (repo) {
    links.push({
      label: "Source Code",
      href: repo,
      kind: "repo",
      tone: "secondary",
    });
  }
  if (backend && backend !== repo) {
    links.push({
      label: "Backend Source",
      href: backend,
      kind: "repo",
      tone: "secondary",
    });
  }

  return links;
}

/** "Technology" for real stacks, "Capabilities" for described feature areas. */
export function getTagsLabel(project: Project): string {
  return project.tagsType === "technology" ? "Technology stack" : "Capabilities";
}

/**
 * Gallery entries for the details page, with the hero image removed so the
 * same composition is not shown twice.
 */
export function getGalleryForDetails(project: Project): ProjectGalleryItem[] {
  const seen = new Set<string>([project.heroImage]);
  return project.gallery.filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}

/**
 * Aspect ratio for an image box: the image's own ratio where that is
 * reasonable, clamped for very tall or very wide sources so a card never
 * collapses or runs off the page. Matching the ratio means the image fills
 * its box with no letterboxing.
 */
export function boxAspect(
  aspect: number | undefined,
  { min = 4 / 3, max = 16 / 9, fallback = 16 / 10 } = {}
): number {
  const value = aspect && aspect > 0 ? aspect : fallback;
  return Math.min(Math.max(value, min), max);
}

/** True when the box had to be clamped, i.e. the image will be cropped to fill. */
export function isAspectClamped(
  aspect: number | undefined,
  options?: Parameters<typeof boxAspect>[1]
): boolean {
  if (!aspect || aspect <= 0) return true;
  return boxAspect(aspect, options) !== aspect;
}

/** A single viewable image, ready for the gallery grid and the lightbox. */
export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  /** Short qualifier shown with the caption, e.g. for concept mockups. */
  note?: string;
  /** Measured aspect ratio, used to size the image box exactly. */
  aspect?: number;
}

function toProjectImage(item: ProjectGalleryItem): ProjectImage {
  return {
    src: item.src,
    alt: item.alt,
    caption: formatGalleryKind(item.kind),
    note: item.isConcept ? "Concept mockup" : undefined,
    aspect: item.aspect,
  };
}

/**
 * The full viewable set for a project: hero image first, then every other
 * gallery entry. Used for lightbox navigation so the hero stays reachable
 * without being repeated in the gallery grid.
 */
export function getProjectImages(project: Project): ProjectImage[] {
  const heroEntry = project.gallery.find(
    (item) => item.src === project.heroImage
  );
  const hero: ProjectImage = heroEntry
    ? toProjectImage(heroEntry)
    : {
        src: project.heroImage,
        alt: `${project.title} — project overview`,
        caption: "Overview",
        aspect: project.heroAspect,
      };

  return [hero, ...getGalleryForDetails(project).map(toProjectImage)];
}

/** Generic `kind` values that read poorly as captions on their own. */
const KIND_CAPTIONS: Record<string, string> = {
  thumbnail: "Overview",
  preview: "Project preview",
  placeholder: "Coming soon",
  hero: "Hero composition",
};

/** Human-readable caption from a gallery entry's `kind`. */
export function formatGalleryKind(kind: string): string {
  if (!kind) return "";
  const mapped = KIND_CAPTIONS[kind.toLowerCase()];
  if (mapped) return mapped;
  return kind.charAt(0).toUpperCase() + kind.slice(1);
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: "Live",
  running: "Live",
  "in-development": "In Development",
  delivered: "Delivered",
  upcoming: "In progress",
};

export function getStatusLabel(status: ProjectStatus): string {
  return STATUS_LABELS[status] ?? status;
}

/** Client / industry / status facts, skipping anything the JSON does not have. */
export interface ProjectFact {
  label: string;
  value: string;
}

export function getProjectFacts(project: Project): ProjectFact[] {
  const facts: ProjectFact[] = [];
  if (project.client) facts.push({ label: "Client", value: project.client });
  if (project.industry)
    facts.push({ label: "Industry", value: project.industry });
  facts.push({ label: "Status", value: getStatusLabel(project.status) });
  facts.push({ label: "Type", value: getCategoryLabel(project.category) });
  return facts;
}
