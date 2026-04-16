import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

const installCommands = {
  kubectl: `# Install RBG controller
kubectl apply --server-side -f https://raw.githubusercontent.com/sgl-project/rbg/main/deploy/kubectl/manifests.yaml

# Wait for controller to be ready
kubectl wait deploy/rbgs-controller-manager -n rbgs-system \\
  --for=condition=available --timeout=5m`,
  helm: `# Install RBG with Helm
helm upgrade --install rbgs ./deploy/helm/rbgs \\
  --create-namespace \\
  --namespace rbgs-system \\
  --wait`,
};

export default function QuickStart(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'kubectl' | 'helm'>('kubectl');
  const [sectionRef, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className={`section-white homepage-section section-animate ${isVisible ? 'animate-in' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2>Get Started in Minutes</h2>
          <p>
            Deploy your first inference service with just a few commands.
            RBG integrates seamlessly with your existing Kubernetes workflow.
          </p>
        </div>
        <div className="quickstart-tabs">
          <button
            className={`quickstart-tab ${activeTab === 'kubectl' ? 'active' : ''}`}
            onClick={() => setActiveTab('kubectl')}>
            kubectl
          </button>
          <button
            className={`quickstart-tab ${activeTab === 'helm' ? 'active' : ''}`}
            onClick={() => setActiveTab('helm')}>
            Helm
          </button>
        </div>
        <div className="quickstart-code">
          <CodeBlock language="bash">{installCommands[activeTab]}</CodeBlock>
        </div>
        <div className="quickstart-links">
          <a href="/docs/install" className="quickstart-link">
            View full installation guide
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a href="/docs/quick_start" className="quickstart-link">
            Quick start tutorial
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}