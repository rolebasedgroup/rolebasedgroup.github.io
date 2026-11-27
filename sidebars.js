/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'introduction',
    'architecture',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'install',
        'quick_start',
        'migration-v1alpha1-to-v1alpha2',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'features/multiroles',
        'features/patterns',
        'features/role-dependencies',
        'features/role-templates',
        'features/instance',
        'features/engine-runtime',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      collapsed: false,
      items: [
        'features/autoscaler',
        'features/update-strategy',
        'features/coordinated-policy',
        'features/failure-handling',
        'features/selective-scale-down',
        'features/revision',
        'features/gang-scheduling',
        'features/exclusive-topology',
        'features/monitoring',
        'features/ecosystem-integration',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/api',
        'reference/variables',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Single Node',
          items: [
            'examples/single-node/sglang-single',
            'examples/single-node/vllm-single',
          ],
        },
        {
          type: 'category',
          label: 'Multi Node',
          items: [
            'examples/multi-nodes/sglang-multi',
            'examples/multi-nodes/vllm-multi',
          ],
        },
        {
          type: 'category',
          label: 'PD-Disaggregated',
          items: [
            'examples/pd-disagg/sglang-pd',
            'examples/pd-disagg/vllm-pd',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
