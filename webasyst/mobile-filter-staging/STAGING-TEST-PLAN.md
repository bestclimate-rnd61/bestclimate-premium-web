# Shop-Script mobile filter — staging test plan

This is a release gate, not evidence that the candidate has already passed. Run only against a separate Webasyst / Shop-Script staging installation with sanitized data.

## Preconditions

- Confirm staging has a separate database and filesystem/configuration from production.
- Require access control and `noindex`; disable payment, customer mail/SMS, CRM side effects, and external integrations.
- Record active theme, Shop-Script version, staging URL, and source SHA-256.
- Verify the unmodified `category.html` SHA-256 is `B3F6E7B3B27B78E87A4EB763454D085EA5801FB9AD7F42F4F3C01B83EDD20FF1`.
- Create and verify a private backup before installing the one-line patch.

## Install and render

1. Apply `category-mobile-filter.patch` to the staging theme only.
2. Confirm the resulting diff changes exactly one include guard in `category.html`.
3. Clear the compiled Smarty template cache using the supported staging method.
4. Request a category page and confirm successful Smarty rendering, exactly one mobile panel and one mobile filter form in the DOM, plus the actual Shop-Script price and feature controls.

## Browser matrix

Run against categories `2416`, `2478`, `2515`, and `2451`, at widths 320, 375, 390, 477, 768, and 1024 CSS pixels. Test both a mobile user agent and a desktop user agent with responsive viewport.

For each category and width:

- Open the filter with the visible control; verify the real panel opens, not a demo menu or backdrop alone.
- Close using the close control, backdrop if supported, Escape, and keyboard focus; verify focus returns to the opener.
- Set a price range and apply it; verify the resulting product set and URL/query parameters reflect the range.
- Combine price with one real available feature filter; verify the server result changes and selected values remain selected.
- Reset filters and verify all results return.
- Change price sorting and paginate; verify numeric order across page boundaries, stable handling of equal prices and “Цена по запросу”, and no duplicate or missing product URLs.
- Confirm there is no duplicate form submission, JavaScript console error, failed request, or horizontal overflow.
- Confirm desktop sidebar filters continue to work and no second visible filter panel appears.

## Rollback

If rendering or behavior regresses, restore the backed-up `category.html`, verify its SHA-256 matches the recorded baseline, clear the staging Smarty cache, and rerun a smoke request. Do not promote to production without a separate release confirmation.

## Current evidence

No staging installation was available when this plan was prepared. The prior 24 Edge/Playwright checks describe the unpatched public baseline only. They do not satisfy this staging gate.