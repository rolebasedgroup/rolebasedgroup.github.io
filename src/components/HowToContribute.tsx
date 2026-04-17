import React from 'react';
import Link from '@docusaurus/Link';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

const contributionSteps = [
  {
    id: 1,
    title: 'Fork & Clone',
    description: 'Fork the repository on GitHub and clone it to your local machine.',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    link: 'https://github.com/sgl-project/rbg',
  },
  {
    id: 2,
    title: 'Create a Branch',
    description: 'Create a feature branch for your changes. Follow the naming convention: feature/your-feature-name.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    command: 'git checkout -b feature/your-feature-name',
  },
  {
    id: 3,
    title: 'Make Changes',
    description: 'Implement your feature or fix. Write clean, well-documented code following our style guidelines.',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  },
  {
    id: 4,
    title: 'Write Tests',
    description: 'Add tests for your changes. Ensure all existing tests pass before submitting.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    id: 5,
    title: 'Submit PR',
    description: 'Push your changes and create a Pull Request. Include a clear description of your changes.',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    link: 'https://github.com/sgl-project/rbg/pulls',
  },
];

export default function HowToContribute(): JSX.Element {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className={`section-light homepage-section section-animate ${isVisible ? 'animate-in' : ''}`}>
      <div className="container">
        <div className="contribute-header">
          <h2 className="section-header-tech">How to Contribute</h2>
          <p className="contribute-description">
            We welcome contributions from the community! Whether you're fixing a bug,
            adding a feature, or improving documentation, your help makes RBG better.
          </p>
        </div>

        <div className={`contribute-steps animate-stagger ${isVisible ? 'animate-in' : ''}`}>
          {contributionSteps.map((step, index) => (
            <div
              key={step.id}
              className="contribute-step card-3d"
              style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="step-number">{step.id}</div>
              <div className="step-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="32"
                  height="32">
                  <path d={step.icon} />
                </svg>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {step.command && (
                <div className="step-command">
                  <code>{step.command}</code>
                </div>
              )}
              {step.link && (
                <Link to={step.link} className="step-link link-underline">
                  Learn more
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}
              {index < contributionSteps.length - 1 && (
                <div className="step-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="contribute-footer">
          <div className="contribute-links">
            <Link
              to="https://github.com/sgl-project/rbg/blob/main/CONTRIBUTING.md"
              className="contribute-link-button button button--outline button--lg ripple-effect">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{ marginRight: '8px' }}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Contribution Guide
            </Link>
            <Link
              to="https://github.com/sgl-project/rbg/issues"
              className="contribute-link-button button button--outline button--lg ripple-effect">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{ marginRight: '8px' }}>
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Open Issues
            </Link>
            <Link
              to="https://sgl-fru7574.slack.com/archives/C098X0LQZV5"
              className="contribute-link-button button button--outline button--lg ripple-effect">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{ marginRight: '8px' }}>
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.124 2.521a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zm-2.521 10.124a2.528 2.528 0 0 1 2.521-2.521 2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.522h-2.521v-2.522zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.522h6.313A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.313z" />
              </svg>
              Join Slack
            </Link>
          </div>
          <p className="contribute-note">
            Questions? Reach out on <Link to="https://sgl-fru7574.slack.com/archives/C098X0LQZV5">Slack</Link> or open an issue on GitHub.
          </p>
        </div>
      </div>
    </section>
  );
}