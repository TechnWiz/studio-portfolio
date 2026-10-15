# Creative Studio Portfolio

An English/Russian portfolio built on Next.js 16, React 19 and TypeScript. It combines a procedural 3D hero for capable desktop browsers with CSS artwork fallbacks, typed concept cases, and a configurable contact webhook.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Useful checks: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Where to edit

- `lib/content.ts` — studio settings, all English/Russian interface text, project narratives, services and media paths.
- `lib/pages.tsx` and `components/site.tsx` — shared page layouts, navigation, filters, transitions and form behavior.
- `components/hero-scene.tsx` and `components/hero-canvas.tsx` — WebGL fallback, mobile camera/composition, procedural lunar surface, lighting and motion tuning; reduced motion keeps the moon visible but still.
- `components/studio-scene.tsx` and `components/studio-canvas.tsx` — an in-view lazy-loaded liquid-glass orb. Adjust its shader colors/distortion in `glassFragment`; moon crater texture, lighting, camera scale and spin are in `hero-canvas.tsx` (`motionTuning`).
- `components/model-viewer.tsx` — on-demand GLB viewing; Three.js only loads after the user opens a supplied model.
- `app/globals.css` — theme, responsive layout, glass surfaces, the isolated SVG liquid lens, hover states and reduced-motion overrides.
- `app/[locale]/` — localized routes, metadata and generated social preview images.
- `public/media/work/<slug>/` — add approved posters, WebM/MP4 videos, gallery images and GLB models. Set paths in the project data; videos on cards load only on hover/focus, case videos use controls and `preload="none"`.

## Portfolio content and contact delivery

Current entries are explicitly labeled studio concepts; their procedural artwork is not client work. Add verified project details or replace a concept in `projects` in `lib/content.ts`. Supply both locales, category, summary, narrative and services. Add optional media only when approved: `video`, `poster`, `mobileVideo`, `gallery` and `model`. Missing optional media leaves the CSS artwork fallback in place.

The form validates in the browser and again at `/api/contact`. It reports “not connected” until `CONTACT_WEBHOOK_URL` is configured. The endpoint forwards validated JSON to that configured webhook, optionally using `CONTACT_WEBHOOK_SECRET` as a bearer token. It returns a delivery error if the webhook fails; it never reports success without an upstream 2xx response. No real email or webhook details were supplied. Add the public email in `studio.email` if you want a direct fallback contact.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin for canonical metadata, sitemap and robots URLs. The logo path and social links are also centralized in `studio` in `lib/content.ts`; no logo, approved portfolio media, email or social profiles were present in the repository.
