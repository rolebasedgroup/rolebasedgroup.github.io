# RBG Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

The website provides documentation for [RBG (RoleBasedGroup)](https://github.com/sgl-project/rbg) - a Kubernetes API for orchestrating distributed, stateful AI inference workloads.

**Website URL**: https://rolebasedgroup.github.io

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

**Note**: Requires Node.js 18 LTS. Node.js 25+ has compatibility issues with webpack.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory.

## Deployment

The site is automatically deployed via GitHub Actions when changes are pushed to the `main` branch.

### GitHub Pages Configuration

After merging this PR, configure GitHub Pages in repository settings:

1. Go to **Settings** > **Pages**
2. Set **Source** to **Deploy from a branch**
3. Select **gh-pages** branch and **/ (root)** folder
4. Click **Save**

The GitHub Actions workflow will automatically build and deploy to the `gh-pages` branch.

## Project Structure

```
rolebasedgroup.github.io/
├── docusaurus.config.js    # Main configuration
├── package.json            # Dependencies
├── sidebars.js             # Sidebar structure
├── src/
│   ├── css/custom.css      # Custom styles
│   ├── components/         # React components
│   └── pages/              # Custom pages
├── docs/                   # Documentation
├── blog/                   # Blog posts
├── static/                 # Static assets
└── .github/workflows/      # CI/CD workflows
```

## Related Projects

- [sgl-project/rbg](https://github.com/sgl-project/rbg) - RBG source code
- [sgl-project/sglang](https://github.com/sgl-project/sglang) - SGLang project

## License

Apache License 2.0