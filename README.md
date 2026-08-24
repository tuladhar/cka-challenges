# CKA Challenges

A community learning challenge covering every domain and competency in the current Certified Kubernetes Administrator curriculum. Watch practical videos, practice in real labs, track progress, and join the achievers wall after earning the certification.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/cka/`.

## Add content

Video IDs and practical lab URLs live in [`assets/challenges.js`](assets/challenges.js). Detailed content rules are in [`.claude/challenge-cka.md`](.claude/challenge-cka.md).

## Add an achiever

See [`CONTRIBUTING.md`](CONTRIBUTING.md). All credentials are reviewed in public through a pull request.

## Deployment

The project is a static site configured for Cloudflare Pages. Its production routes are:

- `https://challenges.purutuladhar.com/cka/`
- `https://challenges.purutuladhar.com/achievers/`

Build command: `npm run build`. Output directory: `dist`.

## Curriculum source

CKA Curriculum v1.35 from the official [CNCF curriculum repository](https://github.com/cncf/curriculum/blob/master/CKA_Curriculum_v1.35.pdf), licensed CC BY 4.0.

## License

Site code is available under the [MIT License](LICENSE). CNCF curriculum wording remains subject to its original CC BY 4.0 license.
