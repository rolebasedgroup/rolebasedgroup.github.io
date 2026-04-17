import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '@site/src/hooks/useScrollAnimation';

const architectureSlides = [
  {
    id: 1,
    title: 'Auto Discovery',
    description: 'RBG automatically discovers and registers role endpoints, enabling seamless service discovery and communication.',
    image: '/img/discovery.png',
    alt: 'Auto Discovery Architecture',
  },
  {
    id: 2,
    title: 'Inplace Update',
    description: 'Efficient inplace update mechanism that minimizes disruption during configuration changes without recreating entire role groups.',
    image: '/img/inplace-update.png',
    alt: 'Inplace Update Architecture',
  },
  {
    id: 3,
    title: 'Pre-Warmup',
    description: 'Pre-warmup mechanism for faster service initialization. Roles can be pre-provisioned and warmed up before serving requests.',
    image: '/img/prewarmup.png',
    alt: 'Pre-Warmup Architecture',
  },
  {
    id: 4,
    title: 'Independent Role Scaling',
    description: 'Each role can scale independently based on its own metrics. Flexible HPA integration for per-role autoscaling policies.',
    image: '/img/role-scaling.png',
    alt: 'Independent Role Scaling Architecture',
  },
];

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
      className={`section-white homepage-section section-animate circuit-pattern ${isVisible ? 'animate-in' : ''}`}>
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

                <img
                  src={current.image}
                  alt={current.alt}
                  className="slide-image card-3d"
                />
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