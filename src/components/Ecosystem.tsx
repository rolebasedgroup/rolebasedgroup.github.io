import React, { useState } from 'react';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

interface IntegrationData {
  title: string;
  description: string;
  features: string[];
  color: string;
  icon: string;
  architecture: {
    components: string[];
    connections: { from: string; to: string; label: string }[];
  };
  yaml: string;
}

const integrationDetails: Record<string, IntegrationData> = {
  dynamo: {
    title: 'NVIDIA Dynamo',
    description: 'NVIDIA Dynamo runtime with tensor parallelism across multiple workers, using roleTemplates for efficient configuration.',
    features: ['Tensor Parallelism', 'Leader-Worker Pattern', 'KV Cache Transfer', 'Automatic Failover'],
    color: '#76b900',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.43z',
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
  },
  mooncake: {
    title: 'Mooncake',
    description: 'Mooncake integration for high-performance KV cache transfer via RDMA in PD disaggregated deployments.',
    features: ['RDMA Transfer', 'Zero-Copy KV Cache', 'Topology Awareness', 'High Throughput'],
    color: 'var(--rbg-accent)',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z',
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
  },
  llmd: {
    title: 'llm-d',
    description: 'Kubernetes-native distributed inference framework with smart routing, KV-cache aware request scheduling, and traffic-aware autoscaling.',
    features: ['Distributed Serving', 'Smart Routing', 'KV-Cache Aware', 'Auto-scaling'],
    color: '#3b82f6',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    architecture: {
      components: ['Inference Gateway', 'Scheduler', 'Prefill Pool', 'Decode Pool', 'KV Cache Store'],
      connections: [
        { from: 'Gateway', to: 'Scheduler', label: 'Request' },
        { from: 'Scheduler', to: 'Prefill', label: 'Route' },
        { from: 'Prefill', to: 'KV Cache', label: 'Write' },
        { from: 'KV Cache', to: 'Decode', label: 'Reuse' },
        { from: 'Decode', to: 'Gateway', label: 'Response' },
      ],
    },
    yaml: `apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: llmd-inference
spec:
  roles:
    - name: gateway
      replicas: 2
      standalonePattern:
        spec:
          containers:
            - name: llmd-gateway
              image: llm-d/gateway:latest
    - name: scheduler
      replicas: 1
      standalonePattern:
        spec:
          containers:
            - name: llmd-scheduler
              image: llm-d/scheduler:latest
    - name: prefill
      replicas: 3
      leaderWorkerPattern:
        size: 4  # Tensor parallelism
      dependencies: ["scheduler"]
    - name: decode
      replicas: 6
      leaderWorkerPattern:
        size: 2
      dependencies: ["prefill"]`,
  },
  ome: {
    title: 'OME',
    description: 'Open Model Engine - High-performance inference framework with multi-GPU support, dynamic batching, and KV cache optimization.',
    features: ['Multi-GPU Support', 'Dynamic Batching', 'KV Cache Optimization', 'Quantization'],
    color: '#8b5cf6',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    architecture: {
      components: ['Model Loader', 'Batch Manager', 'GPU Pool', 'KV Cache Manager', 'Response Handler'],
      connections: [
        { from: 'Model Loader', to: 'GPU Pool', label: 'Load' },
        { from: 'Batch Manager', to: 'GPU Pool', label: 'Schedule' },
        { from: 'GPU Pool', to: 'KV Cache', label: 'Compute' },
        { from: 'KV Cache', to: 'Response', label: 'Output' },
        { from: 'Response', to: 'Batch Manager', label: 'Complete' },
      ],
    },
    yaml: `apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: ome-inference
spec:
  roles:
    - name: loader
      replicas: 1
      standalonePattern:
        spec:
          containers:
            - name: ome-loader
              image: openmodelengine/loader:latest
    - name: batch-manager
      replicas: 2
      standalonePattern:
        spec:
          containers:
            - name: ome-batcher
              image: openmodelengine/batcher:latest
    - name: gpu-workers
      replicas: 4
      leaderWorkerPattern:
        size: 8  # Multi-GPU workers
      dependencies: ["loader"]
    - name: cache-manager
      replicas: 2
      standalonePattern:
        spec:
          containers:
            - name: ome-cache
              image: openmodelengine/cache:latest`,
  },
};

function ExpandableCard({ type, isVisible, delay }: { type: string; isVisible: boolean; delay: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'yaml'>('architecture');
  const data = integrationDetails[type];

  return (
    <div
      className={`ecosystem-card-expandable card-animate ${isExpanded ? 'expanded' : ''} ${isVisible ? 'animate-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Base Card */}
      <div className="ecosystem-card-base holographic">
        <div className="ecosystem-card__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke={data.color} strokeWidth="2" width="40" height="40">
            <path d={data.icon} />
          </svg>
        </div>
        <h3 className="ecosystem-card__title" style={{ color: data.color }}>{data.title}</h3>
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
              onClick={(e) => { e.stopPropagation(); setActiveTab('architecture'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Architecture
            </button>
            <button
              className={`expanded-tab ${activeTab === 'yaml' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setActiveTab('yaml'); }}
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
                  <span key={idx} className="feature-tag" style={{ borderColor: data.color, color: data.color }}>
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

  const integrations = ['dynamo', 'mooncake', 'llmd', 'ome'];

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
            <span className="ecosystem-stat__value metric-value">K8s 1.22+</span>
            <span className="ecosystem-stat__label status-indicator">Compatibility</span>
          </div>
          <div className="ecosystem-stat card-3d" style={{ transitionDelay: '200ms' }}>
            <span className="ecosystem-stat__value metric-value">Apache 2.0</span>
            <span className="ecosystem-stat__label status-indicator">License</span>
          </div>
        </div>

        <div className="ecosystem-grid-expandable">
          {integrations.map((type, idx) => (
            <ExpandableCard key={type} type={type} isVisible={isVisible} delay={250 + idx * 50} />
          ))}
        </div>
      </div>
    </section>
  );
}