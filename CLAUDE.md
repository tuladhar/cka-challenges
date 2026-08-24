# CKA Challenges

This repository is a static, dependency-free community challenge site deployed on Cloudflare Pages. It lives at `challenges.purutuladhar.com`, with the CKA challenge at `/cka/` and the community wall at `/achievers/`.

## Working in this repository

- Read [`.claude/challenge-cka.md`](.claude/challenge-cka.md) before changing challenge content or presentation.
- Keep shared styles and behavior in `assets/`; keep certification-specific content in its challenge data file.
- Preserve the light, calm, accessible visual language and responsive behavior.
- Never invent video, practice, or credential URLs. Use the documented empty states until real links are supplied.
- Run `npm test` before committing.

## Adding another challenge later

Create `.claude/challenge-<slug>.md`, reference it here, and use `.claude/challenge-cka.md` as the structural precedent. Give the challenge its own route and data file while reusing shared components and design tokens. Do not mix certification-specific content into this file.

