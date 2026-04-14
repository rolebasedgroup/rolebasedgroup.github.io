import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction">
            Get Started 🚀
          </Link>
          <Link
            className="button button--outline button--lg"
            to="https://github.com/sgl-project/rbg">
            GitHub ⭐
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="RBG - Kubernetes API for orchestrating distributed AI inference workloads">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className="container margin-vert--lg">
          <section className="architecture-section">
            <h2 className="text--center margin-bottom--lg">Architecture Overview</h2>
            <div className="text--center">
              <img
                src="https://raw.githubusercontent.com/sgl-project/rbg/main/doc/rbgs-concept.png"
                alt="RBG Architecture"
                style={{maxWidth: '800px', width: '100%'}}
              />
            </div>
            <div className="row margin-top--lg">
              <div className="col col--6 padding-vert--lg">
                <h3>What is RBG?</h3>
                <p>
                  <strong>RoleBasedGroup (RBG)</strong> is a Kubernetes API for orchestrating
                  distributed, stateful AI inference workloads with <strong>multi-role collaboration</strong>
                  and <strong>built-in service discovery</strong>.
                </p>
                <p>
                  It provides a common deployment pattern for production LLM inference,
                  especially <strong>disaggregated architectures</strong> such as prefill/decode separation.
                </p>
              </div>
              <div className="col col--6 padding-vert--lg">
                <h3>Why RBG?</h3>
                <p>
                  Traditional Kubernetes primitives (e.g. plain StatefulSets / Deployments) are
                  ill-suited for LLM inference services that:
                </p>
                <ul>
                  <li>Run as <strong>multi-role topologies</strong> (gateway/router/prefill/decode)</li>
                  <li>Are <strong>performance-sensitive</strong> to GPU/network topology</li>
                  <li>Require <strong>atomic, cross-role operations</strong> (deploy/upgrade/scale/failover)</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        <div className="container margin-vert--xl">
          <h2 className="text--center">Deployment Patterns</h2>
          <div className="row">
            <div className="col col--4">
              <div className="feature-card">
                <div className="feature-card__icon">💻</div>
                <h3>Single Node</h3>
                <p>
                  Deploy LLM inference service on a single node when the model fits
                  in one Kubernetes Node's memory.
                </p>
                <Link to="/docs/examples/single-node/sglang">
                  View Examples →
                </Link>
              </div>
            </div>
            <div className="col col--4">
              <div className="feature-card">
                <div className="feature-card__icon">🔗</div>
                <h3>Multi Node</h3>
                <p>
                  Use multi-node distributed inference when the model is too large
                  for a single Node to load.
                </p>
                <Link to="/docs/examples/multi-nodes/sglang">
                  View Examples →
                </Link>
              </div>
            </div>
            <div className="col col--4">
              <div className="feature-card">
                <div className="feature-card__icon">⚡</div>
                <h3>PD-Disaggregated</h3>
                <p>
                  Disaggregating prefill and decode computation improves the performance
                  of large language models serving.
                </p>
                <Link to="/docs/examples/pd-disagg/sglang">
                  View Examples →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}