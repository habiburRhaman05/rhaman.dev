# Search and AI discovery

Set NEXT_PUBLIC_SITE_URL to the final HTTPS production origin before deployment. Current fallback: https://rhaman.dev. Rebuild after changing it.

- /robots.txt allows public pages and excludes /api/.
- /sitemap.xml is generated from published detail routes and excludes projects with details disabled. No artificial last-modified dates are used.
- /llms.txt is generated from the same project data and provides a concise index. It is an optional discovery convention, not a ranking signal or indexing guarantee.
- The homepage has Person, WebSite and ProfilePage structured data, plus visible answers about services and collaboration.
- Project pages have self-canonicals, social metadata, portfolio narrative structured data and breadcrumbs. No fabricated reviews, business metrics or credentials are added.
- The booking page has its own canonical URL.

After deployment:
1. Confirm the production origin and redirect duplicate www/non-www domains to it.
2. Verify domain ownership in Google Search Console and Bing Webmaster Tools using the owner's account. Submit /sitemap.xml.
3. Inspect representative URLs and validate structured data against the rendered pages.
4. Confirm the host/CDN permits search crawlers, returns real 404s for unknown routes, and serves all images.
5. Track qualified enquiries and search performance. Add verified case-study results and client-approved testimonials over time.

No Search Console submission or production deployment was performed by this change.

References:
https://developers.google.com/search/docs/appearance/ai-features
https://llmstxt.org/
