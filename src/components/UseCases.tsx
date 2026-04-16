import React from 'react';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

const useCases = [
  {
    id: 'cloud-provider',
    title: 'Cloud Service Providers',
    description: 'Deploy and manage large-scale LLM inference services for cloud customers. Scale from hundreds to thousands of instances with coordinated updates.',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    tags: ['Multi-region', 'Auto-scaling', 'High availability'],
  },
  {
    id: 'enterprise-ai',
    title: 'Enterprise AI Platforms',
    description: 'Run private LLM inference infrastructure with topology-aware placement for optimal GPU utilization and minimal latency.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    tags: ['Private cloud', 'GPU optimization', 'Security'],
  },
  {
    id: 'research-labs',
    title: 'AI Research Labs',
    description: 'Experiment with novel inference architectures like PD-disaggregation. Quickly iterate on multi-role topologies for research.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.95-.083-1.885-.548-2.547l-.548-.547a5 5 0 117.072 0z',
    tags: ['Experimentation', 'Custom architectures', 'Flexible deployment'],
  },
  {
    id: 'model-hosting',
    title: 'Model Hosting Services',
    description: 'Host multiple LLM models with isolated deployments. RoleBasedGroupSet enables managing identical inference clusters.',
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    tags: ['Multi-model', 'Isolation', 'Resource sharing'],
  },
];

export default function UseCases(): JSX.Element {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className={`section-white homepage-section section-animate ${isVisible ? 'animate-in' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2>Use Cases</h2>
          <p>
            RBG powers production LLM inference across diverse industries and use scenarios.
            <br />
            <em style={{ color: 'var(--ifm-color-content-secondary)', fontSize: '0.9rem' }}>
              (Content to be added)
            </em>
          </p>
        </div>
        <div className={`usecases-grid ${isVisible ? 'animate-in' : ''}`}>
          {useCases.map((useCase, index) => (
            <div
              key={useCase.id}
              className="usecase-card card-animate"
              style={{ transitionDelay: `${index * 100 + 200}ms` }}>
              <div className="usecase-card__icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="48"
                  height="48">
                  <path d={useCase.icon} />
                </svg>
              </div>
              <h3 className="usecase-card__title">{useCase.title}</h3>
              <p className="usecase-card__description">{useCase.description}</p>
              <div className="usecase-card__tags">
                {useCase.tags.map((tag) => (
                  <span key={tag} className="usecase-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}