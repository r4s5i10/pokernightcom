# PokerNight.com migration and cutover checklist

This repository is the new Vercel-hosted PokerNight.com. The WordPress database and files are migration sources only. Do not commit database exports, credentials, access tokens, customer records, form submissions, order data, or payment data.

## Current migration inventory

- 183 WordPress posts
- 82 WordPress pages
- 1,127 media records
- 17 WooCommerce products
- 115 rebuilt episode records across six season collections, plus Studio 52 content
- Existing Mailchimp/Bloom newsletter audience
- Existing GA4 and Meta Pixel identifiers
- WooCommerce/Stripe order flow on the legacy site
- Gravity Forms and Ninja Forms data in the legacy database
- Redirection, Yoast SEO, Cookie Law Info, WP Polls, Metricool, and EmailOctopus records found in the source site/database

The supplied May 2, 2026 SQL export contains sensitive customer, order, form, user, API-key, payment-token, and Wordfence records. It must remain outside Git. A fresh export and media snapshot are required immediately before an approved cutover.

## Preview and rebuild

- [x] Keep Vercel connected to `r4s5i10/pokernightcom`
- [x] Work on the `redesign` branch only
- [x] Rebuild home, episode, news, watch, and Poker Night app experiences
- [x] Rebuild the 17-product catalog and product-detail URLs
- [x] Preserve current WooCommerce checkout during preview
- [x] Replace the newsletter endpoint with the existing Mailchimp provider
- [x] Add canonical metadata, Open Graph/Twitter image, robots, and XML sitemap
- [x] Redirect known app and expired sweepstakes routes
- [x] Preserve legacy root-level post URLs through permanent redirects
- [ ] Finish migrating original-resolution media from WordPress storage to durable new storage
- [ ] Export and compare the complete WordPress redirect table
- [ ] Export and compare every Yoast title, description, canonical, and social field
- [ ] Decide the permanent commerce backend and checkout domain before production
- [ ] Have RSI legal review the legacy privacy policy and current responsible-gaming language
- [ ] Configure Mailchimp and analytics environment variables in Vercel

## Quality assurance

- [ ] Review all primary pages at 360px, 768px, 1024px, and 1440px widths
- [ ] Test keyboard navigation, visible focus, headings, landmarks, labels, and color contrast
- [ ] Test every navigation, episode, story, social, platform, app, and store link
- [ ] Submit newsletter tests for new, existing, invalid, and provider-error addresses
- [ ] Complete test orders for product variants, tax, shipping, confirmation email, refund, and failure paths
- [ ] Crawl the preview and compare all legacy URLs against a 200/301/308/404 report
- [ ] Validate page titles, descriptions, canonicals, Open Graph, Twitter cards, robots, and sitemap
- [ ] Run production build, Lighthouse, and Vercel Speed Insights checks
- [ ] Confirm analytics events in debug mode without counting preview traffic
- [ ] Confirm no secrets, dumps, customer data, or tokens are tracked by Git

## Pre-cutover

- [ ] Obtain written approval for production cutover
- [ ] Confirm RSI is the registrant and administrative owner of the domain
- [ ] Confirm Cloudflare account ownership, recovery methods, billing, and authorized users
- [ ] Lower DNS TTL only after approval and at least 24 hours before cutover
- [ ] Take fresh database, uploads, DNS, redirect, analytics, and order backups
- [ ] Freeze WordPress content/store changes for the final sync window
- [ ] Complete final product, post, media, metadata, and redirect delta migration
- [ ] Add and verify `pokernight.com` and `www.pokernight.com` in the Vercel project
- [ ] Verify mail records and all non-web DNS records will remain unchanged
- [ ] Prepare rollback DNS values and identify the person authorized to execute rollback

## Cutover and rollback

- [ ] Point only the approved web records to Vercel; do not alter mail or unrelated records
- [ ] Verify TLS, apex/www behavior, canonical host, redirects, forms, store, analytics, and core pages
- [ ] Run the legacy URL crawl again against production
- [ ] Monitor Vercel errors, form delivery, checkout, analytics, and uptime
- [ ] Keep the legacy server intact and inaccessible to the public until the rollback window closes
- [ ] Roll back DNS if critical checkout, routing, TLS, or form failures cannot be corrected promptly

## After cutover

- [ ] Submit the new sitemap in Google Search Console and Bing Webmaster Tools
- [ ] Monitor 404s, redirects, indexing, Core Web Vitals, analytics, orders, and signup delivery
- [ ] Retain encrypted backups according to RSI policy
- [ ] Remove or anonymize unneeded legacy personal data under an approved retention policy
- [ ] Decommission WordPress/Vultr only after written approval and the agreed retention period
