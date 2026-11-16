export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rhaman.dev").origin;
export const siteName = "Habibur Rahman";
export const siteDescription = "Habibur Rahman is a software developer in Dhaka, Bangladesh, building web and mobile apps, AI agents, GoHighLevel CRM integrations and business workflow automation.";
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
export const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": `${siteUrl}/#person`, name: siteName, url: siteUrl,
      jobTitle: "Software Developer & AI Automation Specialist", description: siteDescription,
      homeLocation: { "@type": "Place", name: "Dhaka, Bangladesh" },
      sameAs: ["https://github.com/habiburRhaman05", "https://www.linkedin.com/in/habiburrhaman05/"],
      knowsAbout: ["Web development", "Mobile app development", "AI agents", "GoHighLevel", "CRM integration", "n8n", "Workflow automation"] },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: `${siteName} Portfolio`, publisher: { "@id": `${siteUrl}/#person` }, inLanguage: "en" },
    { "@type": "ProfilePage", "@id": `${siteUrl}/#profile`, url: siteUrl, name: `${siteName} Portfolio`, mainEntity: { "@id": `${siteUrl}/#person` }, isPartOf: { "@id": `${siteUrl}/#website` } }
  ]
};
