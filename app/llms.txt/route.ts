import { getAllProjects } from "@/lib/projects";
import { absoluteUrl, siteDescription } from "@/lib/seo";
export const dynamic = "force-static";
export function GET() {
  const projects = getAllProjects().filter(p => p.detailsEnabled !== false);
  const text = ["# Habibur Rahman", "", `> ${siteDescription}`, "",
    "This portfolio includes personal projects and collaborative company/client work. Project status and contributor credits are provided on individual pages. Concept mockups are not evidence of a shipped application. Client businesses and their products are not owned by the portfolio author.", "",
    "## Portfolio", `- [Profile and expertise](${absoluteUrl("/")}): Experience, skills, development projects and automation/CRM work.`,
    `- [Book a call](${absoluteUrl("/book-call")}): Discuss a development or automation project.`, "", "## Project details",
    ...projects.map(p => `- [${p.title}](${absoluteUrl(`/projects/${p.id}`)}): ${p.subtitle}. Status: ${p.status}.`), "",
    "## Profiles", "- [GitHub](https://github.com/habiburRhaman05): Public code repositories.", "- [LinkedIn](https://www.linkedin.com/in/habiburrhaman05/): Professional profile.", ""].join("\n");
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
