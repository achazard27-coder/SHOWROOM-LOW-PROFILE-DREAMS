# Low Profile + Dreams — Galeria editorial (React V4)

A site built with Vite, React 18, TypeScript, Tailwind CSS 3, and a shadcn-compatible structure.
Design focus: short headline, photography-led walkthrough, rotating brand carousel, qualified B2B form.

## Run
```bash
npm install
npm run dev
npm run build
```

Netlify is configured via netlify.toml to run `npm run build` and publish `dist`. Automatically deploys on GitHub main once Git integration is configured.

## Component
`components/ui/infinite-slider.tsx` uses `framer-motion`, `react-use-measure`, `clsx`, and `tailwind-merge`. This uses **/components/ui** at repository root, so no extra directory needs to be created. `src/index.css` holds the global Tailwind styles.

## Real showroom photos (pending authorization/access)
The Supabase dashboard URL is an administrative view, not a public asset URL.
The connected Supabase account does NOT have access to project `zansdbambqukamkxvwos`.
To use the real images, populate `realPhotos` in `src/data/gallery.ts` with authenticated/approved public URLs in your `lowprofile.dreams` bucket. Example pattern:

`https://zansdbambqukamkxvwos.supabase.co/storage/v1/object/public/lowprofile.dreams/Untitled%20folder/NOME-DO-ARQUIVO.jpg`

Only use this URL shape if the bucket/object is genuinely public. Never expose private storage or service role credentials.

The page shows Unsplash editorial stock imagery in the meantime, clearly flagged as illustrative.

## Real brand logos
The carousel supports a full-resolution official logo URL in the `logo` field of each object in `src/data/brands.ts`, preferably local approved SVGs in `public/logos`.
Currently the cards use the brand domain's official website icon (via Google's icon endpoint) as a provisional authenticity-oriented treatment where available, plus a plain text label. This is NOT a substitute for verified high-resolution original wordmarks. No faux wordmarks are generated.
Please confirm trademarks and usage rights for a public launch.

## B2B form
A hidden static HTML form in index.html allows Netlify to discover `lojistas`.
The React form posts URL-encoded fields to the site after client-side CNPJ and phone validation.
Enable Netlify Forms in the site project to start receiving submissions; test form capture in Netlify Forms dashboard after deployment.
Privacy notice must be reviewed by the data controller (LGPD) before production marketing.

## Images
Supabase real photos not yet integrated; avoid representing generic image-bank photos as actual showroom photographs.
