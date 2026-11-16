import automationJson from "@/data/automation-projects.json";
import type { ProjectImage } from "@/lib/projects";

/* -------------------------------------------------------------------------- */
/*  Types for data/automation-projects.json                                   */
/* -------------------------------------------------------------------------- */

/** How a claim is sourced. Anything inferred is shown as unverified. */
export type AutomationEvidence =
  | "user-provided"
  | "inferred-from-user-context"
  | (string & {});

export interface AutomationAgency {
  id: string;
  name: string;
  websiteUrl: string | null;
  badgeLabel: string;
}

export interface AutomationAttribution {
  displayBadges: string[];
  scope: string;
  note: string;
}

export interface AutomationImage {
  id: string;
  src: string;
  alt: string;
  type: string;
  isPlaceholder: boolean;
  isMobileConcept: boolean;
  caption: string | null;
  /** Measured width / height, so image boxes can be sized to the content. */
  aspect?: number;
}

export interface AutomationAction {
  id: string;
  label: string;
  href?: string;
  type: string;
  target?: string;
  projectId?: string;
}

export interface AutomationKeyFeature {
  title: string;
  evidence: AutomationEvidence;
}

export interface AutomationTech {
  name: string;
  evidence: AutomationEvidence;
  verificationRequired: boolean;
}

export interface AutomationChallenge {
  title: string;
  status: string;
  resolution: string | null;
  discussionPrompt: string | null;
}

export interface AutomationDetailSection {
  title: string;
  body?: string;
  items?: string[];
}

export interface AutomationDeliveryContext {
  relationship: string;
  /** Null while the owning agency is unconfirmed. */
  agencyId: string | null;
  agencyAssignmentStatus: string;
  badgeIds: string[];
  badgeScope: string;
  role: string;
  collaborationNote: string | null;
}

export interface AutomationProject {
  id: string;
  sortOrder: number;
  title: string;
  subtitle: string;
  category: string;
  projectType: string;
  industry: string;
  status: string;
  featured: boolean;
  overview: string;
  description: string;
  deliveryContext: AutomationDeliveryContext;
  websiteUrl: string | null;
  additionalWebsites: { label: string; url: string }[];
  thumbnail: string;
  images: AutomationImage[];
  actions: AutomationAction[];
  keyFeatures: AutomationKeyFeature[];
  detailSections: AutomationDetailSection[];
  techStack: AutomationTech[];
  challenges: AutomationChallenge[];
  suggestedEnhancements: unknown[];
  results: unknown[];
  contentSource: string;
  reviewRequired: string[];
  businessNeed: string | null;
  myContribution: string | null;
  workflowNarrative: string | null;
  valueStatement: string | null;
  valueStatementType: string;
  caseStudyReadiness: Record<string, string>;
}

export interface AutomationProjectsData {
  schemaVersion: number;
  collection: string;
  title: string;
  description: string;
  agencies: AutomationAgency[];
  attribution: AutomationAttribution;
  ui: Record<string, unknown>;
  editorialNotes: string[];
  projects: AutomationProject[];
}

const data = automationJson as unknown as AutomationProjectsData;

/* -------------------------------------------------------------------------- */
/*  Accessors                                                                 */
/* -------------------------------------------------------------------------- */

/** Featured projects first, then the authored sortOrder. */
export function getAutomationProjects(): AutomationProject[] {
  return [...data.projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.sortOrder - b.sortOrder;
  });
}

export function getAutomationProjectById(
  id: string
): AutomationProject | undefined {
  return data.projects.find((project) => project.id === id);
}

export function getAutomationAgencies(): AutomationAgency[] {
  return data.agencies;
}

/** The agencies credited at collection level, not per project. */
export function getAttributionAgencies(): AutomationAgency[] {
  return data.attribution.displayBadges
    .map((id) => data.agencies.find((agency) => agency.id === id))
    .filter((agency): agency is AutomationAgency => Boolean(agency));
}

export function getAutomationCollection() {
  return {
    title: data.title,
    description: data.description,
    attribution: data.attribution,
  };
}

/**
 * The agency badge for a single card. Only returns one once `agencyId` is
 * filled in — while it is null the card shows the generic relationship label
 * instead, so neither agency is implied to own the project.
 */
export function getProjectAgency(
  project: AutomationProject
): AutomationAgency | null {
  const { agencyId } = project.deliveryContext;
  if (!agencyId) return null;
  return data.agencies.find((agency) => agency.id === agencyId) ?? null;
}

/* -------------------------------------------------------------------------- */
/*  Links                                                                     */
/* -------------------------------------------------------------------------- */

export type AutomationLinkKind = "website" | "tel" | "chat";

export interface AutomationLink {
  id: string;
  label: string;
  href: string;
  kind: AutomationLinkKind;
  /** tel: links are only followed when the visitor activates them. */
  isTel: boolean;
}

function usableHref(href: string | undefined | null): string | null {
  if (!href) return null;
  const trimmed = href.trim();
  if (!trimmed || trimmed === "#") return null;
  return trimmed;
}

function linkKind(action: AutomationAction, href: string): AutomationLinkKind {
  if (href.startsWith("tel:")) return "tel";
  if (action.id === "chatbot") return "chat";
  return "website";
}

/** Actions from the JSON, minus modal triggers and unusable URLs. */
export function getAutomationLinks(project: AutomationProject): AutomationLink[] {
  const links: AutomationLink[] = [];
  const seen = new Set<string>();

  for (const action of project.actions) {
    if (action.type === "open-modal") continue;
    const href = usableHref(action.href);
    if (!href || seen.has(href)) continue;
    seen.add(href);
    links.push({
      id: action.id,
      label: action.label,
      href,
      kind: linkKind(action, href),
      isTel: href.startsWith("tel:"),
    });
  }

  for (const extra of project.additionalWebsites ?? []) {
    const href = usableHref(extra.url);
    if (!href || seen.has(href)) continue;
    seen.add(href);
    links.push({
      id: `additional-${href}`,
      label: extra.label,
      href,
      kind: "website",
      isTel: false,
    });
  }

  return links;
}

/** Digits/plus of a tel: URL, for showing the number next to the action. */
export function telDisplayNumber(href: string): string | null {
  if (!href.startsWith("tel:")) return null;
  return href.slice(4) || null;
}

/* -------------------------------------------------------------------------- */
/*  Narrative sections                                                        */
/* -------------------------------------------------------------------------- */

export interface AutomationSection {
  id: string;
  title: string;
  body?: string;
  items?: string[];
  /** Flags prose that states intent rather than a measured result. */
  isIntent?: boolean;
}

/**
 * Titles already covered by a canonical field or by the features list. Any
 * detailSection matching one of these is skipped so the same paragraph is
 * never printed twice.
 */
const COVERED_SECTION_TITLES = new Set([
  "project overview",
  "overview",
  "business need",
  "my contribution",
  "how the workflow fits together",
  "workflow",
  "implementation scope",
  "delivered capabilities",
  "key features",
  "operational value",
]);

/**
 * The narrative, in the order the details modal presents it. Each section has
 * one canonical source, falling back to a matching detailSection body.
 */
export function getAutomationSections(
  project: AutomationProject
): AutomationSection[] {
  const fromDetails = (title: string) =>
    project.detailSections.find(
      (section) => section.title.trim().toLowerCase() === title
    )?.body;

  const candidates: AutomationSection[] = [
    {
      id: "overview",
      title: "Project overview",
      body: project.overview || project.description || fromDetails("project overview"),
    },
    {
      id: "business-need",
      title: "Business need",
      body: project.businessNeed ?? fromDetails("business need"),
    },
    {
      id: "contribution",
      title: "My contribution",
      body: project.myContribution ?? fromDetails("my contribution"),
    },
    {
      id: "workflow",
      title: "How the workflow fits together",
      body:
        project.workflowNarrative ??
        fromDetails("how the workflow fits together"),
    },
  ];

  // Anything the author added beyond the canonical set still gets rendered.
  const extras: AutomationSection[] = project.detailSections
    .filter(
      (section) =>
        !COVERED_SECTION_TITLES.has(section.title.trim().toLowerCase())
    )
    .map((section, index) => ({
      id: `extra-${index}`,
      title: section.title,
      body: section.body,
      items: section.items,
    }));

  return [...candidates, ...extras].filter(
    (section) => Boolean(section.body) || (section.items?.length ?? 0) > 0
  );
}

/** Intent, not a measured outcome — labelled as such wherever it is shown. */
export function getOperationalValue(
  project: AutomationProject
): AutomationSection | null {
  const body =
    project.valueStatement ??
    project.detailSections.find(
      (section) => section.title.trim().toLowerCase() === "operational value"
    )?.body;
  if (!body) return null;
  return {
    id: "value",
    title: "Operational value",
    body,
    isIntent: true,
  };
}

/* -------------------------------------------------------------------------- */
/*  Capabilities, stack and challenges                                        */
/* -------------------------------------------------------------------------- */

export function getKeyFeatureTitles(project: AutomationProject): string[] {
  return project.keyFeatures.map((feature) => feature.title).filter(Boolean);
}

export function isUnverifiedTech(tech: AutomationTech): boolean {
  return tech.verificationRequired || tech.evidence !== "user-provided";
}

export interface AutomationTechGroups {
  all: AutomationTech[];
  hasUnverified: boolean;
}

export function getTechStack(project: AutomationProject): AutomationTechGroups {
  const all = project.techStack ?? [];
  return { all, hasUnverified: all.some(isUnverifiedTech) };
}

/**
 * Only challenges that have been confirmed and resolved. Editorial drafts
 * (`draft-needs-confirmation`, or no resolution) stay out of public view.
 */
export function getPublishableChallenges(
  project: AutomationProject
): AutomationChallenge[] {
  return (project.challenges ?? []).filter(
    (challenge) =>
      challenge.status !== "draft-needs-confirmation" &&
      Boolean(challenge.resolution)
  );
}

/* -------------------------------------------------------------------------- */
/*  Images                                                                    */
/* -------------------------------------------------------------------------- */

/** Short qualifier shown with an image caption. */
export function imageNote(image: AutomationImage): string | undefined {
  if (image.isPlaceholder) return "Imagery pending";
  if (image.isMobileConcept) return "Mobile view is a concept mockup";
  return undefined;
}

/* -------------------------------------------------------------------------- */
/*  Public view model                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Only what the public UI renders. Editorial material — draft challenges and
 * their discussion prompts, suggested enhancements, review checklists and
 * case-study readiness — is dropped here so it never reaches the browser,
 * not merely hidden with CSS.
 */
export interface PublicAutomationImage {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
  note?: string;
  aspect?: number;
  isPlaceholder: boolean;
}

export interface PublicAutomationTech {
  name: string;
  /** Inferred from context rather than confirmed. */
  unverified: boolean;
}

export interface PublicAutomationChallenge {
  title: string;
  resolution: string;
}

/** The delivering company shown on a card, once attribution is confirmed. */
export interface PublicAutomationAgency {
  name: string;
  badgeLabel: string;
  websiteUrl: string | null;
}

export interface PublicAutomationProject {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  featured: boolean;
  /** Generic relationship label, used while no agency is attributed. */
  relationship: string;
  /** Set only once deliveryContext.agencyId names an agency. */
  agency: PublicAutomationAgency | null;
  role: string;
  collaborationNote: string | null;
  overview: string;
  images: PublicAutomationImage[];
  links: AutomationLink[];
  sections: AutomationSection[];
  features: string[];
  techStack: PublicAutomationTech[];
  hasUnverifiedTech: boolean;
  value: AutomationSection | null;
  challenges: PublicAutomationChallenge[];
}

function toPublicImage(image: AutomationImage): PublicAutomationImage {
  return {
    id: image.id,
    src: image.src,
    alt: image.alt,
    caption: image.caption,
    note: imageNote(image),
    aspect: image.aspect,
    isPlaceholder: image.isPlaceholder,
  };
}

export function toPublicProject(
  project: AutomationProject
): PublicAutomationProject {
  const agency = getProjectAgency(project);
  const { all: techStack, hasUnverified } = getTechStack(project);

  return {
    id: project.id,
    title: project.title,
    subtitle: project.subtitle,
    industry: project.industry,
    featured: project.featured,
    relationship: project.deliveryContext.relationship,
    agency: agency
      ? {
          name: agency.name,
          badgeLabel: agency.badgeLabel,
          websiteUrl: agency.websiteUrl,
        }
      : null,
    role: project.deliveryContext.role,
    collaborationNote: project.deliveryContext.collaborationNote,
    overview: project.overview || project.description,
    images: project.images.map(toPublicImage),
    links: getAutomationLinks(project),
    sections: getAutomationSections(project),
    features: getKeyFeatureTitles(project),
    techStack: techStack.map((tech) => ({
      name: tech.name,
      unverified: isUnverifiedTech(tech),
    })),
    hasUnverifiedTech: hasUnverified,
    value: getOperationalValue(project),
    challenges: getPublishableChallenges(project).map((challenge) => ({
      title: challenge.title,
      resolution: challenge.resolution as string,
    })),
  };
}

/** Public projects, featured first and then by the authored sortOrder. */
export function getPublicAutomationProjects(): PublicAutomationProject[] {
  return getAutomationProjects().map(toPublicProject);
}

/** Public images in the shape the shared lightbox consumes. */
export function toLightboxImages(
  images: PublicAutomationImage[]
): ProjectImage[] {
  return images.map((image) => ({
    src: image.src,
    alt: image.alt,
    caption: image.caption ?? image.alt,
    note: image.note,
    aspect: image.aspect,
  }));
}
