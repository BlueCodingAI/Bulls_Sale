# Rocking C Cattle — Website

A fast, modern marketing site for **Rocking C Cattle** — a family-owned East Texas
ranch raising registered Limousin & Lim-Flex herd sires.

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

- 🎬 Cinematic video hero
- 🐂 Bull gallery with **search** and **Available / Coming Soon / Sold** filters
- 🏷️ Transparent **SOLD** stamp on sold bulls — they stay visible in the gallery
- 📄 Rich bull pages: photo gallery + lightbox, video, weights, EPDs, pedigree
- ✉️ Contact form (with graceful email fallback)
- 📱 Fully responsive and mobile-first
- ⚡ Static-generated pages, optimized images, great SEO

---

## 🐂 For the owner: managing your herd

**Everything about your bulls lives in one file:**

```
src/data/bulls.ts
```

You don't need to touch anything else. Open that file and you'll see one block
per bull, with comments explaining each field.

### Add a new bull

1. Put his photos in a new folder under `public/bulls/`, named after him:
   `public/bulls/duke/1.jpg`, `public/bulls/duke/2.jpg`, …
   *(JPG or PNG. Phone photos are fine — they'll be optimized automatically.)*
2. In `src/data/bulls.ts`, copy an existing bull block, paste it at the **top**
   of the list, and fill in his details.
3. Save. The website updates itself.

### Mark a bull as Sold

In his block, change:

```ts
status: "available",
```

to:

```ts
status: "sold",
soldDateISO: "2026-04-22",   // the date he sold
```

He stays in the gallery with a **SOLD** ribbon, and sold bulls sort newest-first.

### Status options

| Status         | Shows as       | Where it sorts        |
| -------------- | -------------- | --------------------- |
| `"available"`  | Available      | Top of the gallery    |
| `"coming-soon"`| Coming Soon    | After available bulls |
| `"sold"`       | Sold (stamped) | Bottom, newest first  |

### Feature a bull on the home page

Add `featured: true` to up to three available bulls.

### Photos & video for each bull

```ts
photos: [
  { src: "/bulls/duke/1.jpg", alt: "Duke standing in the pasture" },
  { src: "/bulls/duke/2.jpg", alt: "Duke close up" },
],
videos: [
  { src: "/bulls/duke/walk.mp4", poster: "/bulls/duke/1.jpg", label: "Duke moving out" },
],
```

> **Phone videos (.MOV) and iPhone photos (.HEIC)** need a quick one-time
> conversion for the web. A helper script is included — see *Converting media* below.

### Update your contact details & social links

Open `src/data/site.ts` and edit the email, phone, and Facebook / TikTok links
near the top. The whole site (header, footer, contact page) updates from there.

---

## 💻 Running it locally (for a developer)

```bash
npm install
npm run dev        # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

---

## 🚀 Deploying to rockingccattle.com

The easiest host is **[Vercel](https://vercel.com)** (free for this kind of site):

1. Push this project to a GitHub repository.
2. In Vercel, **New Project → Import** that repo. It auto-detects Next.js — just
   click **Deploy**.
3. In **Settings → Domains**, add `rockingccattle.com` and follow the DNS steps
   with your domain registrar.
4. *(Optional)* To receive contact-form emails in your inbox, add the environment
   variables from `.env.example` under **Settings → Environment Variables**, then
   redeploy.

Any other host that supports Next.js (Netlify, Cloudflare, etc.) works too.

---

## ✉️ The contact form

Out of the box, the form **always works** — if no email service is configured it
opens the visitor's email app pre-filled. To have inquiries delivered straight to
your inbox instead, set up a free [Resend](https://resend.com) account and add the
variables in `.env.example`. Direct email and phone are also shown on every page,
so visitors can always reach you.

---

## 🖼️ Converting media (HEIC / MOV → web formats)

Browsers can't show iPhone `.HEIC` photos or `.MOV` videos directly. A Python
helper converts them to optimized `.jpg` and `.mp4`:

```bash
pip install pillow pillow-heif         # one time
# ffmpeg must be installed for video (https://ffmpeg.org)
python scripts/convert_media.py
```

Drop new originals in `public/images/` and `public/videos/`, edit the file list
near the top of `scripts/convert_media.py`, and run it again.

---

## 🗂️ Project structure

```
public/
  bulls/<name>/        each bull's web-ready photos
  gallery/             herd / background photos
  video/               hero video + poster
src/
  app/                 pages (home, /bulls, /bulls/[slug], /about,
                       /why-limousin, /contact) + contact API route
  components/          UI: Navbar, Footer, Hero, BullCard, gallery, form…
  data/
    bulls.ts           ← your herd (edit this)
    site.ts            ← contact info & links (edit this)
  lib/                 types & formatting helpers
scripts/
  convert_media.py     HEIC/MOV → web converter
  verify.mjs           optional visual smoke-test (Playwright)
```

---

*Three generations, one passion for good cattle.* 🤠
