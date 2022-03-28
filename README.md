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

If you master/main has protection on it for pushing then you have to auth with a user that can push. At the moment we do not support doing this from this action so you have to  checkout using a `ssh-key` before running this action.

```yaml
      - uses: actions/checkout@v2
        with:
          ssh-key: ${{ secrets.GH_PAT }}

      - uses: Visma-Draftit/npm-tag@v3.0.0
        env:
          GITHUB_EMAIL: bob@builder.dev
          GITHUB_NAME: Bob Builder
```
