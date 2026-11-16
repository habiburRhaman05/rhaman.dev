import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/book-call", ...getAllProjects().filter(p => p.detailsEnabled !== false).map(p => `/projects/${p.id}`)].map(path => ({ url: absoluteUrl(path) }));
}
