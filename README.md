# npm-tag

Tag the current branch using npm publish.

## Configuration

- **GITHUB_TOKEN (required)**
  - Github token to allow tagging the version.

`npm-tag` will use `npm version (major|minor|patch)`.

```yaml
- uses: Visma-Draftit/npm-tag@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
