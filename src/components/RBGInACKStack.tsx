import React from 'react';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

export default function RBGInACKStack(): JSX.Element {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className={`section-blue homepage-section section-animate ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-header-tech">RBG in ACK Serving Stack</h2>
          <p>
            RoleBasedGroup is a core component of Alibaba Cloud's ACK Serving Stack,
            providing the orchestration layer for production-grade LLM inference services.
          </p>
        </div>

        <div className="stack-container">
          <div className="stack-image-wrapper">
            <div className="stack-frame">
              <div className="stack-frame-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
                  <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>ACK Serving Stack Architecture</span>
              </div>
              <img
                src="/img/stack.png"
                alt="RBG in ACK Serving Stack Architecture"
                className="stack-image"
              />
            </div>
          </div>

          <div className="stack-content">
            <div className="stack-highlights">
              <div className="stack-highlight-item">
                <div className="highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" width="24" height="24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h4>Native Integration</h4>
                <p>Seamlessly integrated with ACK's container runtime and GPU management capabilities.</p>
              </div>

              <div className="stack-highlight-item">
                <div className="highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" width="24" height="24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4>Performance Optimized</h4>
                <p>Leverages ACK's high-performance network and storage stack for optimal inference throughput.</p>
              </div>

              <div className="stack-highlight-item">
                <div className="highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" width="24" height="24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4>Enterprise Ready</h4>
                <p>Built on ACK's enterprise-grade security, observability, and multi-cluster capabilities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}