import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import QuickStart from '@site/src/components/QuickStart';
import DeploymentPatterns from '@site/src/components/DeploymentPatterns';
import UseCases from '@site/src/components/UseCases';
import Ecosystem from '@site/src/components/Ecosystem';
import ScrollProgress from '@site/src/components/ScrollProgress';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Kubernetes-native
            <br />
            LLM Inference Orchestration
          </h1>
          <p className={styles.heroSubtitle}>
            Production-grade deployment for multi-role AI workloads.
            Prefill/decode separation, tensor parallelism, and hardware-aware placement
            — all with a single declarative API (v1alpha2).
          </p>
          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg button-scale"
              to="/docs/quick_start">
              Get Started
            </Link>
            <Link
              className="button button--outline button--lg button-scale"
              to="https://github.com/sgl-project/rbg">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
                style={{ marginRight: '8px' }}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </Link>
          </div>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>v1alpha2 API</span>
            <span className={styles.heroBadge}>Apache 2.0</span>
            <span className={styles.heroBadge}>Kubernetes 1.28+</span>
          </div>
        </div>
        <div className={styles.heroPreview}>
          <div className={styles.codePreview}>
            <div className={styles.codeHeader}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ marginRight: '8px' }}>
                <path d="M14.23 12.004a2.246 2.246 0 0 1-2.235 2.245 2.246 2.246 0 0 1-2.245-2.245 2.246 2.246 0 0 1 2.245-2.244c.041 0 .08.003.12.01a1.76 1.76 0 0 0 1.82 1.724 1.76 1.76 0 0 0 1.724-1.82 2.246 2.246 0 0 1 2.235 2.245zm-4.47 0a2.246 2.246 0 0 0 2.245 2.244 2.246 2.246 0 0 0 2.245-2.244 2.246 2.246 0 0 0-2.245-2.245c-.04 0-.08.003-.12.01a1.76 1.76 0 0 1-1.82-1.724 1.76 1.76 0 0 1-1.724 1.82 2.246 2.246 0 0 0-2.235 2.245zm7.16 0a2.246 2.246 0 0 1-2.235 2.245 2.246 2.246 0 0 1-2.245-2.245 2.246 2.246 0 0 1 2.245-2.244c.04 0 .08.003.12.01a1.76 1.76 0 0 0 1.82 1.724 1.76 1.76 0 0 0 1.724-1.82 2.246 2.246 0 0 1 2.235 2.245z" />
              </svg>
              RoleBasedGroup.yaml
            </div>
            <pre className={styles.codeBlock}>
              <code>{`apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: llm-inference
spec:
  roles:
    - name: router
      replicas: 1
      standalonePattern: ...
    - name: prefill
      replicas: 2
      leaderWorkerPattern:
        size: 4  # 1 leader + 3 workers
    - name: decode
      replicas: 4
      dependencies: ["prefill"]
      leaderWorkerPattern:
        size: 2`}</code>
            </pre>
          </div>
        </div>
      </div>
    </header>
  );
}

function ArchitectureSection(): JSX.Element {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className={`section-light homepage-section section-animate ${isVisible ? 'animate-in' : ''}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>How It Works</h2>
          <p>
            RBG treats your inference service as a coordinated organism,
            managing roles, dependencies, and topology as a single unit.
          </p>
        </div>
        <div className="text--center">
          <img
            src="https://raw.githubusercontent.com/sgl-project/rbg/main/doc/rbgs-concept.png"
            alt="RBG Architecture"
            style={{ maxWidth: '900px', width: '100%' }}
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="RBG - Kubernetes API for orchestrating distributed AI inference workloads with multi-role collaboration">
      <ScrollProgress />
      <HomepageHeader />
      <main>
        <QuickStart />
        <HomepageFeatures />
        <DeploymentPatterns />
        <ArchitectureSection />
        <Ecosystem />
        <UseCases />
      </main>
    </Layout>
  );
}