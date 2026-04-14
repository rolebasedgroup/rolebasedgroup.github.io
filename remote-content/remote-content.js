/**
 * Remote Content Sync Configuration
 *
 * This module configures automatic syncing of documentation from the RBG main repository.
 */

const remoteContentConfig = [
  {
    name: 'rbg-docs-features',
    sourceBaseUrl: 'https://raw.githubusercontent.com/sgl-project/rbg/main/doc/',
    outDir: 'docs/features-synced',
    documents: [
      'features/multiroles.md',
      'features/autoscaler.md',
      'features/update-strategy.md',
      'features/failure-handling.md',
      'features/gang-scheduling.md',
      'features/monitoring.md',
      'features/exclusive-topology.md',
      'features/revision.md',
    ],
  },
  {
    name: 'rbg-docs-reference',
    sourceBaseUrl: 'https://raw.githubusercontent.com/sgl-project/rbg/main/doc/',
    outDir: 'docs/reference-synced',
    documents: [
      'reference/variables.md',
      'reference/api.md',
    ],
  },
  {
    name: 'rbg-docs-getting-started',
    sourceBaseUrl: 'https://raw.githubusercontent.com/sgl-project/rbg/main/doc/',
    outDir: 'docs',
    documents: [
      'install.md',
      'quick_start.md',
    ],
  },
];

// Export for use in docusaurus.config.js
module.exports = remoteContentConfig;