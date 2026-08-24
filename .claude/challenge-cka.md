# CKA challenge instructions

## Purpose

The CKA challenge helps people prepare across every official Certified Kubernetes Administrator exam domain through a simple loop: watch a practical video, use a linked hands-on lab, and mark the competency complete. People who pass can submit their public Credly credential and appear on `/achievers/`.

## Routes and source files

- `/` → `index.html` course catalog
- `/cka/` → `cka/index.html`
- `/achievers/` → `achievers/index.html`
- CKA curriculum and media links → `assets/challenges.js`
- Shared behavior → `assets/site.js`
- Achiever records → `data/achievers.json`
- Shared presentation → `assets/styles.css`

## Curriculum

The content currently follows the official CNCF CKA Curriculum v1.35. It contains 27 competencies:

- Storage — 10%, 3 competencies
- Workloads & Scheduling — 15%, 5 competencies
- Services & Networking — 20%, 6 competencies
- Cluster Architecture, Installation & Configuration — 25%, 8 competencies
- Troubleshooting — 30%, 5 competencies

Before changing domain names, weights, or competencies, compare against the newest PDF in the official [`cncf/curriculum`](https://github.com/cncf/curriculum) repository. Keep competency IDs stable when wording changes so visitors do not lose local progress.

## Adding videos

Set a competency's `videoId` in `assets/challenges.js` to the YouTube video ID only, not the full URL:

```js
videoId: "dQw4w9WgXcQ"
```

Videos render through `youtube-nocookie.com`, load lazily, and remain embedded on the site. An empty ID intentionally renders a “coming soon” card.

## Adding practical labs

Add KillerCoda and/or iximiuz Labs entries to the competency's `practice` array:

```js
practice: [
  { label: "Practice on KillerCoda", url: "https://..." },
  { label: "Practice on iximiuz Labs", url: "https://..." }
]
```

Use deep links to the exact matching scenario, not a provider homepage. An empty array intentionally renders an explanatory empty state.

## Progress and newsletter behavior

Completed competency IDs are stored locally under `cka-challenges-completed`. The newsletter modal appears once per browser and uses `cka-newsletter-seen`. Its form is a placeholder: connect the submission handler in `assets/site.js` when the newsletter provider and endpoint are supplied. Do not claim an address was subscribed before that integration exists.

## Achievers workflow

Achievers open a pull request that adds one record to `data/achievers.json`. Each entry needs a real name, `CKA` challenge label, achievement month/year, and public Credly credential URL. Keep records ordered newest first. Reviewers must open the credential and verify that the name and CKA certification match before merging.

## Design constraints

- Keep the site light; do not introduce a dark theme.
- Follow the restrained hands-on lab catalog pattern: black utility navigation, square course tiles, a navy course overview, pale course body, compact filters, and rectangular lesson cards. Avoid oversized editorial typography, gradients outside the course hero, excessive rounded cards, decorative orbs, and generic AI-landing-page treatments.
- Maintain keyboard-accessible lesson dialogs, semantic headings, visible focus behavior, reduced-motion support, responsive layout, shareable lesson hashes, and privacy-enhanced embedded videos.
- Keep the challenge data-driven so a new certification can reuse the same experience.
