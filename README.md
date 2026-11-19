# TRIQON AI — Official Website

React + TypeScript + Vite + Tailwind CSS website for **TRIQON AI** (*Intelligence · Innovation · Impact*), deployed at [https://triqon-ai.vercel.app/](https://triqon-ai.vercel.app/).

## Local Development

```bash
npm install
npm run dev
```

## Production Build & Typecheck

```bash
npm run lint
npm run build
```

## Simple Content Editing (Admin CMS)

Because this website is a static Vite SPA deployed on Vercel with no backend server or database, editable content is stored in `src/content/siteContent.json` and configured for **Pages CMS** via `.pages.yml` (no secrets in browser code and no fake login):

1. Visit [https://app.pagescms.org](https://app.pagescms.org) and sign in with your GitHub account (`amjadali-ai`).
2. Select the `triqon-ai-website` repository.
3. Open **TRIQON AI Website Content** to edit homepage text, general company contact (`triqonai@gmail.com`), services, founder details, project entries, and principles.
4. Click **Save** — Pages CMS commits directly to GitHub and Vercel automatically rebuilds and updates `https://triqon-ai.vercel.app/`.

Optionally, you may set `VITE_CMS_CONTENT_URL` in Vercel Environment Variables to a public read-only JSON endpoint (such as a Sanity public CDN query) to override bundled content at runtime.

## Visitor Feedback Backend & Storage

The **Website Feedback** section (`#feedback`) is backed by a Vercel Serverless API route (`api/feedback.ts`) that validates submissions and persistently stores them in your provisioned Firebase Firestore database (`magnetic-element-t61jg`, collection `feedback`, secured by `firestore.rules`):

- **Vercel Environment Variable Name:** `VITE_FEEDBACK_ENDPOINT`
- **Vercel Environment Variable Value:** `https://triqon-ai.vercel.app/api/feedback`

Add `VITE_FEEDBACK_ENDPOINT` in your existing Vercel project (**Settings → Environment Variables**) and redeploy. You can review stored submissions directly in the [Firebase Console](https://console.firebase.google.com/project/magnetic-element-t61jg/firestore/databases/ai-studio-triqonaiwebsite-83585e76-acaa-461b-8180-13390301e20d/data/~2Ffeedback).

## Deploying Updates to the Existing Vercel Project

Push changes to the `main` branch of `amjadali-ai/triqon-ai-website` (ensuring `node_modules` and `dist` are not tracked in Git):

```bash
git rm -r --cached node_modules dist tsconfig.tsbuildinfo 2>/dev/null || true
git add .
git commit -m "Polish TRIQON AI website, add company email, feedback, and CMS config"
git push origin main
```

Vercel will automatically deploy to `https://triqon-ai.vercel.app/`.
