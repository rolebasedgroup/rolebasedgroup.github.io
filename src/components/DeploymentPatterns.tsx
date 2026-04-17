import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

const patterns = [
  {
    id: 'agg-standalone',
    name: 'Aggregated Standalone',
    description: 'Deploy LLM inference on a single node when the model fits in one node\'s memory. The simplest setup for development and testing.',
    useCase: 'Models under 70B parameters on single or multi-GPU nodes',
    yaml: `apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: sglang-agg-inference
spec:
  roles:
  - name: backend
    replicas: 1
    scalingAdapter:
      enable: true
    rolloutStrategy:
      type: RollingUpdate
      rollingUpdate:
        type: InPlaceIfPossible
    standalonePattern:
      template:
        spec:
          containers:
          - name: backend
            image: lmsysorg/sglang:v0.5.9
            command:
            - python3
            - -m
            - sglang.launch_server
            - --model-path
            - "Qwen/Qwen3-0.6B"
            - --port
            - "8001"
            - --tp-size
            - "1"
            resources:
              limits:
                nvidia.com/gpu: "1"`,
    link: '/docs/examples/single-node/sglang',
  },
  {
    id: 'agg-leader-worker',
    name: 'Aggregated LeaderWorker',
    description: 'Distribute inference across multiple GPUs within and across nodes. Uses leaderWorkerPattern for tensor parallelism.',
    useCase: 'Models requiring tensor parallelism (TP) across multiple GPUs',
    yaml: `apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: agg-lwd
spec:
  roles:
  - name: backend
    replicas: 1
    leaderWorkerPattern:
      size: 2  # 1 leader + 1 worker per instance
      template:
        spec:
          containers:
          - name: sglang
            image: lmsysorg/sglang
            command:
            - python3
            - -m
            - sglang.launch_server
            - --model-path
            - "Qwen/Qwen3-0.6B"
            - --tp-size
            - "2"
            - --dist-init-addr
            - $(RBG_LWP_LEADER_ADDRESS):6379
            - --nnodes
            - $(RBG_LWP_GROUP_SIZE)
            - --node-rank
            - $(RBG_LWP_WORKER_INDEX)
            resources:
              limits:
                nvidia.com/gpu: "1"`,
    link: '/docs/examples/multi-nodes/sglang',
  },
  {
    id: 'pd-standalone',
    name: 'PD-Disaggregated',
    description: 'Separate prefill and decode computation for optimal throughput and latency. Includes router for request dispatching.',
    useCase: 'High-throughput serving with prefill/decode separation',
    yaml: `apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: sglang-pd-inference
spec:
  roles:
  - name: router
    replicas: 1
    standalonePattern:
      template:
        spec:
          containers:
          - name: router
            image: lmsysorg/sglang-router:v0.2.4
            command:
            - python3
            - -m
            - sglang_router.launch_router
            - --pd-disaggregation
  - name: prefill
    replicas: 1
    standalonePattern:
      template:
        spec:
          containers:
          - name: prefill
            image: lmsysorg/sglang:v0.5.9
            command:
            - python3
            - -m
            - sglang.launch_server
            - --disaggregation-mode
            - prefill
            - --model-path
            - "Qwen/Qwen3-0.6B"
            resources:
              limits:
                nvidia.com/gpu: "1"
  - name: decode
    replicas: 1
    standalonePattern:
      template:
        spec:
          containers:
          - name: decode
            image: lmsysorg/sglang:v0.5.9
            command:
            - python3
            - -m
            - sglang.launch_server
            - --disaggregation-mode
            - decode
            - --model-path
            - "Qwen/Qwen3-0.6B"
            resources:
              limits:
                nvidia.com/gpu: "1"`,
    link: '/docs/examples/pd-disagg/sglang',
  },
  {
    id: 'pd-leader-worker',
    name: 'PD-Disaggregated LeaderWorker',
    description: 'Full production setup combining prefill/decode separation with multi-node tensor parallelism for maximum throughput.',
    useCase: 'Production high-throughput serving with TP + PD disaggregation',
    yaml: `apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: pd-disagg-lws
spec:
  roles:
    - name: router
      replicas: 1
      standalonePattern:
        template:
          spec:
            containers:
              - name: router
                image: lmsysorg/sglang-router:v0.2.4
                command:
                  - python3
                  - -m
                  - sglang_router.launch_router
                  - --pd-disaggregation
    - name: prefill
      replicas: 2
      leaderWorkerPattern:
        size: 4  # 1 leader + 3 workers
        template:
          spec:
            containers:
              - name: sglang
                image: lmsysorg/sglang
                command:
                  - python3
                  - -m
                  - sglang.launch_server
                  - --disaggregation-mode
                  - prefill
                  - --tp-size
                  - "4"
                resources:
                  limits:
                    nvidia.com/gpu: "1"
    - name: decode
      replicas: 4
      leaderWorkerPattern:
        size: 2  # 1 leader + 1 worker
        template:
          spec:
            containers:
              - name: sglang
                image: lmsysorg/sglang
                command:
                  - python3
                  - -m
                  - sglang.launch_server
                  - --disaggregation-mode
                  - decode
                  - --tp-size
                  - "2"
                resources:
                  limits:
                    nvidia.com/gpu: "1"`,
    link: '/docs/examples/pd-disagg/sglang',
  },
];

export default function DeploymentPatterns(): JSX.Element {
  const [activePattern, setActivePattern] = useState(patterns[0].id);
  const [sectionRef, isVisible] = useScrollAnimation<HTMLDivElement>();

  const currentPattern = patterns.find((p) => p.id === activePattern)!;

  return (
    <section
      ref={sectionRef}
      className={`section-light homepage-section section-animate ${isVisible ? 'animate-in' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2>Deployment Patterns</h2>
          <p>
            From single-node development to production-grade disaggregated serving,
            RBG supports all inference topologies with native Kubernetes APIs.
          </p>
        </div>
        <div className="pattern-tabs">
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              className={`pattern-tab ${activePattern === pattern.id ? 'active' : ''}`}
              onClick={() => setActivePattern(pattern.id)}>
              {pattern.name}
            </button>
          ))}
        </div>
        <div className="pattern-content">
          <div className="pattern-info">
            <h3>{currentPattern.name}</h3>
            <p className="pattern-description">{currentPattern.description}</p>
            <p className="pattern-usecase">
              <strong>Use case:</strong> {currentPattern.useCase}
            </p>
            <Link to={currentPattern.link} className="pattern-link">
              View full example
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
          <div className="pattern-code">
            <div className="pattern-code-header">
              <div className="pattern-code-dots">
                <span className="pattern-dot red"></span>
                <span className="pattern-dot yellow"></span>
                <span className="pattern-dot green"></span>
              </div>
              <span className="pattern-code-title">{currentPattern.name}.yaml</span>
            </div>
            <pre className="pattern-code-block">
              <code>{currentPattern.yaml}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}