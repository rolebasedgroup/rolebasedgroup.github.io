import React from 'react';
import Link from '@docusaurus/Link';

export default function Ecosystem(): JSX.Element {
  return (
    <section className="container homepage-section ecosystem-section">
      <div className="section-header">
        <h2>Ecosystem Integrations</h2>
        <p>
          RBG integrates with leading AI inference runtimes and frameworks,
          providing a complete solution for production LLM serving.
        </p>
      </div>
      <div className="ecosystem-stats">
        <div className="ecosystem-stat">
          <span className="ecosystem-stat__value">v1alpha2</span>
          <span className="ecosystem-stat__label">API Version</span>
        </div>
        <div className="ecosystem-stat">
          <span className="ecosystem-stat__value">K8s 1.28+</span>
          <span className="ecosystem-stat__label">Compatibility</span>
        </div>
        <div className="ecosystem-stat">
          <span className="ecosystem-stat__value">Apache 2.0</span>
          <span className="ecosystem-stat__label">License</span>
        </div>
      </div>
      <div className="ecosystem-grid">
        <div className="ecosystem-card">
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
        <div className="ecosystem-card">
          <div className="ecosystem-card__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style={{ color: '#76b900' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.43z" />
            </svg>
          </div>
          <h3 className="ecosystem-card__title">NVIDIA Dynamo</h3>
          <p className="ecosystem-card__description">
            Full support for NVIDIA Dynamo runtime with roleTemplates
            for reducing configuration duplication across prefill/decode roles.
          </p>
        </div>
        <div className="ecosystem-card">
          <div className="ecosystem-card__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style={{ color: 'var(--rbg-accent)' }}>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z" />
            </svg>
          </div>
          <h3 className="ecosystem-card__title">Mooncake</h3>
          <p className="ecosystem-card__description">
            Integration with Mooncake transfer engine for high-performance
            KV cache transfer in disaggregated deployments.
          </p>
        </div>
      </div>
      <div className="ecosystem-links">
        <a href="https://github.com/sgl-project/rbg" className="ecosystem-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub Repository
        </a>
        <a href="https://sgl-fru7574.slack.com/archives/C098X0LQZV5" className="ecosystem-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.124 2.521a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zm-2.521 10.124a2.528 2.528 0 0 1 2.521-2.521 2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.522h-2.521v-2.522zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.522h6.313A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.313z" />
          </svg>
          Join Slack
        </a>
        <a href="https://github.com/sgl-project/sglang" className="ecosystem-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.586.92 3.645 1.574 3.645 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
          </svg>
          SGLang Project
        </a>
      </div>
    </section>
  );
}