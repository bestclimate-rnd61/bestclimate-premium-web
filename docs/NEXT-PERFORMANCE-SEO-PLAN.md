# BEST CLIMATE NEXT — performance / SEO / deduplication acceptance plan

Status: implementation branch only. Production changes prohibited until explicit approval.

## Inventory before removing anything
- Crawl current bestclimate-rnd.ru: export status, canonical, meta title, description, H1, word count, internal links, structured data, media size, mobile issues.
- Obtain Search Console / Metrica data for organic landing pages, impressions, clicks and conversions; preserve valuable URLs.
- Compare duplicate page intent, overlapping H1/title, service descriptions, repeated banners, sticky CTAs, menus and forms. Maintain a URL-to-action mapping: KEEP / MERGE / REDIRECT 301 / NOINDEX, with evidence and rollback.
- Back up Webasyst theme, settings, DB and redirects before production changes.

## New homepage content budget
1. Header: logo, compact navigation, one primary CTA, phone.
2. Hero: one headline, one subheading, two CTAs, compressed cinematic media.
3. Services: eight unique categories, one card each; no duplicate descriptions.
4. AI selection: one interaction module; server-side model credentials; real stock and pricing only.
5. Advantages: 3-4 verified differentiators, not invented metrics or warranty claims.
6. Portfolio / reviews: verified real projects, no fabricated social proof.
7. One final lead form, contacts and legally required footer.

## Performance acceptance
- Mobile Lighthouse target >=90 Performance and >=90 Accessibility, >=95 SEO, on representative pages; measure rather than claim.
- LCP <=2.5s, INP <=200ms, CLS <=0.1 at 75th percentile real users when enough data exists.
- AVIF/WebP responsive images, hero preload only when needed; below-fold lazy loading.
- Avoid autoplay heavyweight video on mobile; poster and reduced-motion fallback.
- Minimize render-blocking CSS, defer noncritical JS, remove duplicate dependencies; font-display swap and self-host/subset fonts when licensed.
- CDN, long-lived immutable hashed static assets, HTML caching only where safe; Webasyst dynamic cart never cached as public HTML.
- Keyboard navigation, semantic headings, visible focus, contrast, accessible forms.

## SEO and sales safeguards
- Keep staging noindex/nofollow; don't accidentally ship to production.
- Canonicals, hreflang only if applicable, sitemap, robots, JSON-LD validated against actual content.
- Preserve indexed URL structure; 301 only with relevant destination and verified crawl; never redirect all pages to homepage.
- Protect Webasyst checkout, catalog filters, existing tracking, forms, Telegram and CRM integration.
- Contact +7 989 082-41-21; all prices and service guarantees verified before publishing.

## Definition of done
- Before/after screenshots for iPhone, tablet and desktop.
- Crawl comparison, redirect map, Lighthouse reports and performance budget.
- CI success and live staging URL; functional test of product navigation, lead form and mobile menu.
- Rollback instructions and written production go/no-go decision.
