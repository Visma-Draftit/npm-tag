# npm-tag

Tag the current branch using npm publish.

## Configuration

- **GITHUB_TOKEN (required)**
  - Github token to allow tagging the version.

`npm-tag` will use `npm version (major|minor|patch)`.

```yaml
- uses: Visma-Draftit/npm-tag@v3.0.0
  env:
    GITHUB_EMAIL: bob@builder.dev
    GITHUB_NAME: Bob Builder
```
