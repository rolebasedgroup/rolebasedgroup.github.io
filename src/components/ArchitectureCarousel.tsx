import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

const architectureSlides = [
  {
    id: 1,
    title: 'Role-Based Architecture',
    description: 'RBG treats your inference service as a coordinated organism with multiple roles working together.',
    image: 'https://raw.githubusercontent.com/sgl-project/rbg/main/doc/rbgs-concept.png',
    alt: 'RBG Architecture Concept',
  },
  {
    id: 2,
    title: 'Multi-Role Collaboration',
    description: 'Gateway, Router, Prefill, and Decode roles collaborate seamlessly for optimal inference performance.',
    image: null, // Will show a diagram representation
    diagram: 'multi-role',
  },
  {
    id: 3,
    title: 'Topology Scheduling',
    description: 'Exclusive topology scheduling ensures roles are isolated on different nodes or zones.',
    image: null,
    diagram: 'topology',
  },
  {
    id: 4,
    title: 'PD Disaggregation',
    description: 'Prefill/Decode separation enables specialized optimization for each phase.',
    image: null,
    diagram: 'pd-disagg',
  },
];

function DiagramSlide({ type }: { type: string }) {
  return (
    <div className="diagram-container">
      {type === 'multi-role' && (
        <svg viewBox="0 0 400 200" className="architecture-diagram">
          {/* Gateway */}
          <rect x="20" y="80" width="60" height="40" rx="8" fill="#4f46e5" opacity="0.8"/>
          <text x="50" y="105" textAnchor="middle" fill="white" fontSize="12">Gateway</text>

          {/* Router */}
          <rect x="120" y="80" width="60" height="40" rx="8" fill="#0ea5e9" opacity="0.8"/>
          <text x="150" y="105" textAnchor="middle" fill="white" fontSize="12">Router</text>

          {/* Prefill */}
          <rect x="220" y="40" width="70" height="35" rx="8" fill="#a855f7" opacity="0.8"/>
          <text x="255" y="62" textAnchor="middle" fill="white" fontSize="11">Prefill</text>

          {/* Decode */}
          <rect x="220" y="120" width="70" height="35" rx="8" fill="#10b981" opacity="0.8"/>
          <text x="255" y="142" textAnchor="middle" fill="white" fontSize="11">Decode</text>

          {/* Connections */}
          <line x1="80" y1="100" x2="120" y2="100" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          <line x1="180" y1="100" x2="220" y2="57" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          <line x1="180" y1="100" x2="220" y2="137" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          <line x1="255" y1="75" x2="255" y2="120" stroke="#ec4899" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)"/>

          {/* Arrow marker */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
            </marker>
          </defs>

          {/* Labels */}
          <text x="290" y="95" fill="#94a3b8" fontSize="10">KV Cache</text>
          <text x="290" y="105" fill="#94a3b8" fontSize="10">Transfer</text>
        </svg>
      )}

      {type === 'topology' && (
        <svg viewBox="0 0 400 200" className="architecture-diagram">
          {/* Node 1 */}
          <rect x="30" y="30" width="100" height="60" rx="8" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2"/>
          <text x="80" y="55" textAnchor="middle" fill="#a5b4fc" fontSize="11">Node 1</text>
          <rect x="45" y="65" width="30" height="18" rx="4" fill="#4f46e5"/>
          <text x="60" y="78" textAnchor="middle" fill="white" fontSize="8">Router</text>

          {/* Node 2 */}
          <rect x="30" y="110" width="100" height="60" rx="8" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2"/>
          <text x="80" y="135" textAnchor="middle" fill="#a5b4fc" fontSize="11">Node 2</text>
          <rect x="45" y="145" width="30" height="18" rx="4" fill="#a855f7"/>
          <text x="60" y="158" textAnchor="middle" fill="white" fontSize="8">Prefill</text>

          {/* Node 3 */}
          <rect x="250" y="30" width="100" height="60" rx="8" fill="#1e1b4b" stroke="#10b981" strokeWidth="2"/>
          <text x="300" y="55" textAnchor="middle" fill="#a5b4fc" fontSize="11">Node 3</text>
          <rect x="265" y="65" width="30" height="18" rx="4" fill="#10b981"/>
          <text x="280" y="78" textAnchor="middle" fill="white" fontSize="8">Decode</text>

          {/* Node 4 */}
          <rect x="250" y="110" width="100" height="60" rx="8" fill="#1e1b4b" stroke="#10b981" strokeWidth="2"/>
          <text x="300" y="135" textAnchor="middle" fill="#a5b4fc" fontSize="11">Node 4</text>
          <rect x="265" y="145" width="30" height="18" rx="4" fill="#10b981"/>
          <text x="280" y="158" textAnchor="middle" fill="white" fontSize="8">Decode</text>

          {/* Labels */}
          <text x="200" y="20" textAnchor="middle" fill="#94a3b8" fontSize="12">Exclusive Topology Zones</text>

          {/* Zone labels */}
          <text x="80" y="185" textAnchor="middle" fill="#64748b" fontSize="10">Zone A</text>
          <text x="300" y="185" textAnchor="middle" fill="#64748b" fontSize="10">Zone B</text>
        </svg>
      )}

      {type === 'pd-disagg' && (
        <svg viewBox="0 0 400 200" className="architecture-diagram">
          {/* Request flow */}
          <rect x="20" y="80" width="50" height="40" rx="8" fill="#0ea5e9" opacity="0.8"/>
          <text x="45" y="105" textAnchor="middle" fill="white" fontSize="10">Request</text>

          {/* Prefill phase */}
          <rect x="120" y="40" width="80" height="50" rx="8" fill="#a855f7" opacity="0.8"/>
          <text x="160" y="60" textAnchor="middle" fill="white" fontSize="12">Prefill</text>
          <text x="160" y="78" textAnchor="middle" fill="white" fontSize="9">(Heavy Compute)</text>

          {/* KV Cache */}
          <rect x="230" y="85" width="50" height="30" rx="6" fill="#ec4899" opacity="0.6"/>
          <text x="255" y="105" textAnchor="middle" fill="white" fontSize="9">KV Cache</text>

          {/* Decode phase */}
          <rect x="300" y="130" width="80" height="50" rx="8" fill="#10b981" opacity="0.8"/>
          <text x="340" y="150" textAnchor="middle" fill="white" fontSize="12">Decode</text>
          <text x="340" y="168" textAnchor="middle" fill="white" fontSize="9">(Token Gen)</text>

          {/* Response */}
          <rect x="330" y="40" width="50" height="40" rx="8" fill="#4f46e5" opacity="0.8"/>
          <text x="355" y="65" textAnchor="middle" fill="white" fontSize="10">Response</text>

          {/* Arrows */}
          <line x1="70" y1="90" x2="120" y2="65" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
          <line x1="200" y1="65" x2="230" y2="100" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
          <line x1="280" y1="100" x2="300" y2="155" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
          <line x1="340" y1="130" x2="340" y2="80" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead2)"/>

          {/* Arrow marker */}
          <defs>
            <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
            </marker>
          </defs>

          {/* Phase labels */}
          <text x="95" y="30" fill="#94a3b8" fontSize="10">Phase 1</text>
          <text x="295" y="200" fill="#94a3b8" fontSize="10">Phase 2</text>
        </svg>
      )}
    </div>
  );
}

export default function ArchitectureCarousel(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [sectionRef, isVisible] = useScrollAnimation<HTMLDivElement>();

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % architectureSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isVisible]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % architectureSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + architectureSlides.length) % architectureSlides.length);
    setIsAutoPlaying(false);
  };

  const current = architectureSlides[currentSlide];

  return (
    <section
      ref={sectionRef}
      className={`section-light homepage-section section-animate circuit-pattern ${isVisible ? 'animate-in' : ''}`}>
      <div className="container">
        <div className="carousel-header">
          <h2 className="section-header-tech">How It Works</h2>
          <p className="carousel-description">
            RBG treats your inference service as a coordinated organism,
            managing roles, dependencies, and topology as a single unit.
          </p>
        </div>

        <div className="carousel-container">
          <button
            className="carousel-nav carousel-nav-prev"
            onClick={prevSlide}
            aria-label="Previous slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="carousel-slide-container">
            <div className="carousel-slide active">
              <div className="slide-content">
                <div className="slide-title-container">
                  <span className="slide-number">0{current.id}</span>
                  <h3 className="slide-title">{current.title}</h3>
                </div>
                <p className="slide-description">{current.description}</p>

                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.alt}
                    className="slide-image card-3d"
                  />
                ) : (
                  <DiagramSlide type={current.diagram} />
                )}
              </div>
            </div>
          </div>

          <button
            className="carousel-nav carousel-nav-next"
            onClick={nextSlide}
            aria-label="Next slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slide indicators */}
        <div className="carousel-indicators">
          {architectureSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}>
              <span className="indicator-label">{slide.title}</span>
            </button>
          ))}
        </div>

        {/* Auto-play toggle */}
        <button
          className={`carousel-autoplay-toggle ${isAutoPlaying ? 'playing' : ''}`}
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}>
          {isAutoPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}