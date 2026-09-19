# FontAtlas

A clean, no-login font discovery and developer integration platform built with Next.js. The starter catalog is designed around open-source/licensed fonts and official upstream delivery rather than blindly mirroring font files.

## Included

- Modern SaaS typography-first UI
- Responsive desktop/tablet/mobile layout
- 50+ curated font records covering sans, serif, slab, monospace, display, handwriting, script, blackletter, pixel and multilingual fonts
- Instant search
- Category and Unicode-script filtering
- Live font preview
- Weight, size and letter-spacing controls
- Font comparison (up to 3)
- Browser-local favorites via localStorage
- Typography playground
- Local `.ttf`, `.otf`, `.woff`, `.woff2` parsing with OpenType.js
- Glyph/metadata-oriented tooling foundation
- Developer snippets for CDN, CSS, HTML, Tailwind, Next.js and React
- Public metadata API
- Per-font CSS endpoint
- License/source metadata
- No login
- No Supabase
- No Firebase
- No Render
- Vercel-ready

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Framework preset: Next.js.
4. No environment variables are required for the starter project.
5. Deploy.

## API

- `GET /api/fonts` — catalog metadata
- `GET /api/fonts/inter` — one font record
- `GET /api/css/inter` — reusable CSS endpoint

Replace `inter` with any catalog slug.

## Important font licensing note

FontAtlas must not mirror or redistribute font files unless the applicable license permits the exact intended use. The starter implementation therefore uses official/open upstream web delivery for the catalog and stores license/source metadata. Before adding a font to an owned CDN, verify its license and redistribution terms.

For a future production CDN layer, Cloudflare R2 + Cloudflare's edge delivery can be added for fonts that are explicitly licensed for redistribution. Keep immutable/versioned URLs and correct CORS/MIME/cache headers.

## Architecture

```text
Next.js / React UI
        |
        +-- Static font metadata
        +-- Browser-local favorites
        +-- Browser-local font testing
        +-- Vercel API routes
        |      +-- /api/fonts
        |      +-- /api/fonts/:slug
        |      +-- /api/css/:slug
        |
        +-- Official upstream font CDN
```

## Extending the catalog

Add another object to `lib/fonts.ts`. Keep these fields accurate:

- family
- designer
- category
- scripts
- weights
- variable
- styles
- license
- licenseUrl
- sourceUrl
- googleFamily

Do not invent license information.

## Design reference

`public/design-reference.png` contains the approved visual direction used for the initial UI.
