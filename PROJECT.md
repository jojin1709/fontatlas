# Project map

- `app/page.tsx` — entry page
- `app/globals.css` — full responsive UI styling
- `components/FontAtlasApp.tsx` — main product UI and interactions
- `lib/fonts.ts` — curated font catalog + categories + scripts + CDN URL helpers
- `app/api/fonts/route.ts` — catalog API
- `app/api/fonts/[slug]/route.ts` — single-font API
- `app/api/css/[slug]/route.ts` — CSS integration endpoint
- `public/design-reference.png` — approved visual reference

The project is intentionally login-free and database-free.
