# Creative Studio Portfolio

A bilingual creative studio portfolio built with the existing Next.js 16, React 19 and TypeScript app. The site uses localized `/en` and `/ru` routes, a reusable typed project source, and lightweight CSS artwork placeholders that can be replaced by real stills and films.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run lint`, `npx tsc --noEmit`, and `npm run build` for checks.

## Project map

- `app/[locale]/` — English and Russian home, work, case study, services, studio, and contact pages.
- `app/globals.css` — color, type, layout, responsive rules, and reduced motion behavior.
- `components/site.tsx` — shared navigation, portfolio cards and filters, contact form.
- `lib/content.ts` — studio settings, all translations, and project data.
- `lib/pages.tsx` — reusable page compositions.
- `public/media/work/<slug>/` — add project videos, posters, gallery images, and optional model files here.
- `public/brand/` — add the real logo here when supplied; configure its path in `lib/content.ts`.

## Studio and localization

Edit `studio` in `lib/content.ts` to change the displayed studio name, location, email, logo path, and social links. The current name is a replaceable working label because no official name or logo was included in the workspace. Edit `copy.en` and `copy.ru` in the same file for shared navigation and homepage text. Service detail copy is in `ServicesPage` in `lib/pages.tsx`.

## Adding a project

Add an entry to the typed `projects` array in `lib/content.ts`. The slug becomes `/en/work/<slug>` and `/ru/work/<slug>`. Supply both translations, category, summary, narrative, and service list. Put media in `public/media/work/<slug>/`, then set the optional media paths, for example:

```ts
media: { video: "/media/work/new-project/cover.webm", poster: "/media/work/new-project/poster.webp", mobileVideo: "/media/work/new-project/mobile.mp4", model: "/media/work/new-project/model.glb" }
```

Video paths are optional; missing video keeps the art-directed static placeholder. Use compressed WebM/MP4, a properly sized poster, and avoid adding large films above the fold. The content model reserves an optional model path; an interactive model viewer is not wired until actual GLB assets and presentation needs exist.

## Visual tuning and contact

Change palette and typography variables at the top of `app/globals.css`; responsive breakpoints and motion preferences are near the end. No logo, real portfolio assets, email, or social links were present, so placeholders are clearly replaceable. Adding `studio.email` enables the contact form's mailto handoff. The form does not send data to a server; configure an email service and endpoint if direct delivery is needed. No external services are currently required. Set `NEXT_PUBLIC_SITE_URL` to the deployed origin so sitemap and robots URLs point to the live site.


