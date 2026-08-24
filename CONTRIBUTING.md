# Add yourself as a CKA achiever

Congratulations on earning your CKA. The achievers wall is community-maintained, and every credential is verified publicly before it is added.

1. Fork this repository and create a branch named `achiever/<your-github-username>`.
2. Add one object to the beginning of the array in `data/achievers.json`:

```json
{
  "name": "Your full name",
  "challenge": "CKA",
  "achieved": "August 2026",
  "credly": "https://www.credly.com/badges/your-public-badge-id"
}
```

3. Keep the JSON valid. Do not change any other record or site file.
4. Open a pull request using the provided template.

Your Credly badge must be public and show the same name submitted in the record. Only the CKA challenge is accepted right now. If you need help preparing a pull request, open an [achiever submission issue](https://github.com/tuladhar/cka-challenges/issues/new?template=achiever.yml).

