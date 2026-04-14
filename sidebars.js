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
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/multiroles',
        'features/autoscaler',
        'features/update-strategy',
        'features/failure-handling',
        'features/gang-scheduling',
        'features/monitoring',
        'features/exclusive-topology',
        'features/revision',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/variables',
        'reference/api',
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
          items: ['examples/single-node/sglang-single', 'examples/single-node/vllm-single'],
        },
        {
          type: 'category',
          label: 'Multi Node',
          items: ['examples/multi-nodes/sglang-multi', 'examples/multi-nodes/vllm-multi'],
        },
        {
          type: 'category',
          label: 'PD-Disaggregated',
          items: ['examples/pd-disagg/sglang-pd', 'examples/pd-disagg/vllm-pd'],
        },
      ],
    },
  ],
};

export default sidebars;