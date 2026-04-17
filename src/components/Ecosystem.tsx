import React, { useState } from 'react';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

const integrationDetails = {
  dynamo: {
    title: 'NVIDIA Dynamo',
    architecture: {
      components: ['Gateway', 'Router', 'Prefill Workers', 'Decode Workers', 'KV Cache Transfer'],
      connections: [
        { from: 'Gateway', to: 'Router', label: 'Request' },
        { from: 'Router', to: 'Prefill', label: 'Route' },
        { from: 'Prefill', to: 'KV Cache', label: 'Write' },
        { from: 'KV Cache', to: 'Decode', label: 'Transfer' },
        { from: 'Decode', to: 'Router', label: 'Response' },
      ],
    },
    yaml: `apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: dynamo-inference
spec:
  roleTemplates:
    - name: dynamo-worker
      template:
        leaderWorkerPattern:
          size: 4  # 1 leader + 3 workers
          restartPolicy: RecreateGroupOnPodRestart
          subGroupPolicy:
            subGroupSize: 2
            subGroupRestartPolicy: RestartAllSubGroupsOnPodRestart
  roles:
    - name: router
      replicas: 1
      standalonePattern:
        spec:
          containers:
            - name: dynamo-router
              image: nvidia/dynamo:latest
    - name: prefill
      replicas: 2
      templateRef: dynamo-worker
    - name: decode
      replicas: 4
      dependencies: ["prefill"]
      templateRef: dynamo-worker`,
  description: 'NVIDIA Dynamo runtime with tensor parallelism across multiple workers, using roleTemplates for efficient configuration.',
  features: ['Tensor Parallelism', 'Leader-Worker Pattern', 'KV Cache Transfer', 'Automatic Failover'],
  color: '#76b900',
  icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.43z',
  },
  mooncake: {
    title: 'Mooncake Transfer Engine',
    architecture: {
      components: ['Prefill Node', 'Mooncake Agent', 'RDMA Network', 'Decode Node'],
      connections: [
        { from: 'Prefill Node', to: 'Mooncake Agent', label: 'KV Cache' },
        { from: 'Mooncake Agent', to: 'RDMA Network', label: 'Transfer' },
        { from: 'RDMA Network', to: 'Mooncake Agent (Decode)', label: 'Receive' },
        { from: 'Mooncake Agent (Decode)', to: 'Decode Node', label: 'Apply' },
      ],
    },
    yaml: `apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: mooncake-pd-disagg
spec:
  exclusiveTopologyAnnotation:
    key: topology.kubernetes.io/zone
  roles:
    - name: router
      replicas: 1
      standalonePattern:
        spec:
          containers:
            - name: sglang-router
              image: lmsysorg/sglang-router:latest
              env:
                - name: MOONCAKE_ENABLED
                  value: "true"
    - name: prefill
      replicas: 2
      leaderWorkerPattern:
        size: 4
      exclusiveTopology: zone
    - name: decode
      replicas: 4
      dependencies: ["prefill"]
      leaderWorkerPattern:
        size: 2
      exclusiveTopology: zone`,
  description: 'Mooncake integration for high-performance KV cache transfer via RDMA in PD disaggregated deployments.',
    features: ['RDMA Transfer', 'Zero-Copy KV Cache', 'Topology Awareness', 'High Throughput'],
    color: 'var(--rbg-accent)',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z',
  },
};

function ExpandableCard({ type, isVisible, delay }: { type: 'dynamo' | 'mooncake'; isVisible: boolean; delay: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'yaml'>('architecture');
  const data = integrationDetails[type];

  return (
    <div
      className={`ecosystem-card-expandable card-animate ${isExpanded ? 'expanded' : ''} ${isVisible ? 'animate-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Base Card */}
      <div
        className="ecosystem-card-base holographic"
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsExpanded(true)}
      >
        <div className="ecosystem-card__icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style={{ color: data.color }}>
            <path d={data.icon} />
          </svg>
        </div>
        <h3 className="ecosystem-card__title">{data.title}</h3>
        <p className="ecosystem-card__description">
          {data.description.split(',')[0]}.
        </p>
        <div className="expand-hint">
          <span>Hover to expand</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d={isExpanded ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'} />
          </svg>
        </div>
      </div>

      {/* Expanded Panel */}
      <div className="ecosystem-card-expanded">
        <div className="expanded-header">
          <div className="expanded-tabs">
            <button
              className={`expanded-tab ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Architecture
            </button>
            <button
              className={`expanded-tab ${activeTab === 'yaml' ? 'active' : ''}`}
              onClick={() => setActiveTab('yaml')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
              YAML Config
            </button>
          </div>
        </div>

        <div className="expanded-content">
          {activeTab === 'architecture' && (
            <div className="architecture-diagram-panel">
              <div className="diagram-flow">
                {data.architecture.components.map((comp, idx) => (
                  <div key={idx} className="diagram-node">
                    <div className="node-box" style={{ borderColor: data.color }}>
                      {comp}
                    </div>
                    {idx < data.architecture.components.length - 1 && (
                      <div className="node-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                          <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="diagram-features">
                {data.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag" style={{ borderColor: data.color }}>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'yaml' && (
            <div className="yaml-preview-panel">
              <div className="yaml-header">
                <div className="yaml-header-dots">
                  <span className="yaml-dot red"></span>
                  <span className="yaml-dot yellow"></span>
                  <span className="yaml-dot green"></span>
                </div>
                <span className="yaml-title">rolebasedgroup-{type}.yaml</span>
              </div>
              <pre className="yaml-code">
                <code>{data.yaml}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Ecosystem(): JSX.Element {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className={`section-white homepage-section section-animate circuit-pattern ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-header-tech">Ecosystem Integrations</h2>
          <p>
            RBG integrates with leading AI inference runtimes and frameworks,
            providing a complete solution for production LLM serving.
          </p>
        </div>

        <div className={`ecosystem-stats ${isVisible ? 'animate-in' : ''}`}>
          <div className="ecosystem-stat card-3d" style={{ transitionDelay: '100ms' }}>
            <span className="ecosystem-stat__value metric-value">v1alpha2</span>
            <span className="ecosystem-stat__label status-indicator">API Version</span>
          </div>
          <div className="ecosystem-stat card-3d" style={{ transitionDelay: '150ms' }}>
            <span className="ecosystem-stat__value metric-value">K8s 1.28+</span>
            <span className="ecosystem-stat__label status-indicator">Compatibility</span>
          </div>
          <div className="ecosystem-stat card-3d" style={{ transitionDelay: '200ms' }}>
            <span className="ecosystem-stat__value metric-value">Apache 2.0</span>
            <span className="ecosystem-stat__label status-indicator">License</span>
          </div>
        </div>

        <div className="ecosystem-grid-expandable">
          {/* SGLang - Standard Card */}
          <div
            className={`ecosystem-card card-animate holographic ${isVisible ? 'animate-in' : ''}`}
            style={{ transitionDelay: '250ms' }}
          >
            <div className="ecosystem-card__icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style={{ color: 'var(--ifm-color-primary)' }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <h3 className="ecosystem-card__title">SGLang Runtime</h3>
            <p className="ecosystem-card__description">
              Native support for SGLang, the fastest LLM serving framework.
              Includes SGLang Router for PD disaggregation routing.
            </p>
          </div>

          {/* Dynamo - Expandable Card */}
          <ExpandableCard type="dynamo" isVisible={isVisible} delay={300} />

          {/* Mooncake - Expandable Card */}
          <ExpandableCard type="mooncake" isVisible={isVisible} delay={350} />
        </div>
      </div>
    </section>
  );
}