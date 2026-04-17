import React from 'react';
import Link from '@docusaurus/Link';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

const capabilities = [
  {
    title: 'Multi-Role Orchestration',
    description:
      'Define complex topologies with gateway, router, prefill, and decode roles. Use standalonePattern for single-pod instances or leaderWorkerPattern for distributed tensor parallelism.',
    link: '/docs/features/multiroles',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
  },
  {
    title: 'Exclusive Topology Scheduling',
    description:
      'Pods of different roles are automatically scheduled on different nodes or topology zones using the exclusive-topology annotation for isolation.',
    link: '/docs/features/exclusive-topology',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
  },
  {
    title: 'Role Dependencies',
    description:
      'Define startup ordering with the dependencies field. Backend roles wait for frontend roles to be ready before creation.',
    link: '/docs/introduction',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Coordinated Updates',
    description:
      'Use CoordinatedPolicy CRD for coordinated rolling updates. maxSkew ensures roles stay within 1% progress difference during updates.',
    link: '/docs/features/update-strategy',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
  {
    title: 'Coordinated Scaling',
    description:
      'HPA integration via scalingAdapter. CoordinatedPolicy with OrderReady progression ensures roles scale together safely.',
    link: '/docs/features/autoscaler',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
  {
    title: 'Role Templates',
    description:
      'Reduce configuration duplication with roleTemplates. Multiple roles can reference shared templates using templateRef.',
    link: '/docs/introduction',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  },
];

function FeatureCard({ title, description, link, icon, delay }) {
  return (
    <div
      className="feature-card card-3d neon-glow"
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="feature-card__icon icon-float">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="40"
          height="40">
          <path d={icon} />
        </svg>
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
      <Link to={link} className="feature-card__link link-underline">
        Learn more
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className={`section-white homepage-section section-animate ${isVisible ? 'animate-in' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-header-tech">Built for Production LLM Serving</h2>
          <p>
            Everything you need to run distributed inference at scale,
            with the simplicity of native Kubernetes APIs (v1alpha2).
          </p>
        </div>
        <div className={`capabilities-grid ${isVisible ? 'animate-in' : ''}`}>
          {capabilities.map((props, idx) => (
            <FeatureCard key={idx} {...props} delay={idx * 50} />
          ))}
        </div>
      </div>
    </section>
  );
}