// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "RBG",
  tagline: "Kubernetes-native LLM inference orchestration with RoleBasedGroup",
  favicon: "img/favicon.ico",

  // URL config for GitHub Pages deployment
  url: "https://rolebasedgroup.github.io",
  baseUrl: "/",

  organizationName: "rolebasedgroup",
  projectName: "rolebasedgroup.github.io",
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // SEO: Organization structured data
  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'RBG - RoleBasedGroup',
        url: 'https://rolebasedgroup.github.io',
        description: 'Kubernetes API for orchestrating distributed, stateful AI inference workloads with multi-role collaboration and built-in service discovery.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Kubernetes',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }),
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          sidebarCollapsible: false,
          editUrl: "https://github.com/sgl-project/rbg/tree/main/doc/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "ignore",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      }),
    ],
  ],

  plugins: [],

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      metadata: [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@sglang' },
        { name: 'og:type', content: 'website' },
        { name: 'og:site_name', content: 'RBG - RoleBasedGroup' },
      ],
      navbar: {
        title: "RBG",
        logo: {
          alt: "RBG Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Documentation",
          },
          {
            to: "/blog",
            label: "Blog",
            position: "left",
          },
          {
            href: "https://github.com/sgl-project/rbg",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://sgl-fru7574.slack.com/archives/C098X0LQZV5",
            label: "Slack",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Introduction",
                to: "/docs/introduction",
              },
              {
                label: "Quick Start",
                to: "/docs/quick-start",
              },
              {
                label: "Features",
                to: "/docs/features/multiroles",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Slack",
                href: "https://sgl-fru7574.slack.com/archives/C098X0LQZV5",
              },
              {
                label: "GitHub Issues",
                href: "https://github.com/sgl-project/rbg/issues",
              },
              {
                label: "SGLang",
                href: "https://github.com/sgl-project/sglang",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/sgl-project/rbg",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} RoleBasedGroup. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["yaml", "go", "bash", "json"],
      },
    }),
};