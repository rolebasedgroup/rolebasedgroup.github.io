import React from 'react';

const SCOPEFeatures = [
  {
    title: '🔁 Stable',
    description:
      'Topology-aware deterministic operations with unique RoleID injection and minimal replacement domain principles.',
    icon: '🔁',
  },
  {
    title: '🤝 Coordination',
    description:
      'Cross-role policy engine supporting deployment pairing, coordinated upgrades, linked recovery, and coordinated scaling.',
    icon: '🤝',
  },
  {
    title: '🧭 Orchestration',
    description:
      'Defines role dependencies and precise startup sequences. Topology self-aware service discovery - injects complete role topology into Pods.',
    icon: '🧭',
  },
  {
    title: '⚡ Performance',
    description:
      'Topology-aware placement with hardware affinity (GPU-NVLink > PCIe > RDMA > VPC) and role affinity scheduling.',
    icon: '⚡',
  },
  {
    title: '🧩 Extensible',
    description:
      'Future-proof deployment abstraction using declarative APIs and plugin mechanisms to adapt new architectures in weeks.',
    icon: '🧩',
  },
];

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className="container margin-vert--xl">
      <h2 className="text--center margin-bottom--lg">
        The SCOPE Framework: Five Core Capabilities
      </h2>
      <div className="scope-grid">
        {SCOPEFeatures.map((props, idx) => (
          <div key={idx} className="feature-card">
            <div className="feature-card__icon">{props.icon}</div>
            <div className="feature-card__title">{props.title}</div>
            <div className="feature-card__description">{props.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}