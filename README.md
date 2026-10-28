# Developer portfolio

A KDE Plasma desktop portfolio with a Three.js wallpaper and direct project, contact, and CV links. An optional scrolling view uses the same content. Built with React, TypeScript, Tailwind, and Three.js.

## Features

- 3D desktop as the main site, with web/backend and systems/desktop project groups
- Application links: `/?focus=web#projects` and `/?focus=systems#projects`
- Optional scrolling view at `/?view=scroll`; `/?view=desktop` also opens the main desktop
- Window controls for minimize, maximize, restore, and close
- Tray behavior to focus/minimize apps
- Labeled mobile navigation in the main desktop view
- Three.js wallpaper loads only in the desktop experience
- Real PlumCrate screenshots and source-linked L.A.R.P. test evidence
- Bilingual content (English and Portuguese) with in-app language toggle
- CV app with inline preview plus localized files (`cv-en.pdf` and `cv-pt.pdf`)
- Projects app where `liveUrl` is optional (projects without demo only show source link)

## App Modules

- Projects
- About
- Experience
- Skills
- Contact
- CV

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Three.js + @react-three/fiber
- i18next + react-i18next
- Phosphor Icons

## Local Development

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # start development server
npm run lint     # run eslint
npm run build    # type-check and create production build
npm run cv:build # regenerate the English and Portuguese CV PDFs
npm run verify   # exercise both layouts, languages, project evidence, and CV links
npm run preview  # preview production build
```

## Content and Customization

Main content is managed in:

- `src/data/portfolioContent.ts`

Update this file to manage profile data, projects, contacts, skills, and CV sources.  
For projects, use:

- `liveUrl` (optional)
- `repoUrl` (required)

Translations are defined in:

- `src/i18n/resources.ts`

CV files are served from:

- `public/cv-en.pdf`
- `public/cv-pt.pdf`

### Update the CV

Edit `src/data/cvContent.ts` for the summary, employment, selected project descriptions, education, and languages. The generator also reads contacts, project links, skills, and the role from `src/data/portfolioContent.ts`.

Run `npm run cv:build` with Node.js 24 or later and Chromium installed. Set `CHROMIUM_PATH` if the browser executable is not named `chromium`. The command replaces both PDFs in `public/` without starting a server. Check both files for page breaks before publishing, and update `cvInfo.lastUpdated` when the content changes.

The production build uses the checked-in PDFs and does not require Chromium. Sources for the current profile and project descriptions are recorded in [content sources](docs/content-sources.md).

Employment is edited once in `src/data/cvContent.ts`. Both Experience views and the CV generator read those entries.

### Verify the interface

Run `npm run build`, then `npx playwright install chromium` and `npm run verify`. Alternatively, use an existing browser with `CHROMIUM_PATH=/usr/bin/chromium npm run verify`.

The verifier starts and stops a local production preview. Set `PORTFOLIO_URL` to check a deployed site instead. Set `SCREENSHOT_DIR` to save screenshots outside the repository. It checks the scrolling and desktop views in both languages, widths down to 320 px, immediate contact/CV actions, project ordering, screenshot loading, experience, and matching PDF downloads.
