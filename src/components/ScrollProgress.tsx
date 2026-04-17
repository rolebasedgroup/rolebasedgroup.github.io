import React, { useEffect, useState } from 'react';

/**
 * Scroll Progress Indicator
 * Shows a progress bar at the top of the page indicating scroll position
 * Enhanced with tech-style glow effect
 */
export default function ScrollProgress(): JSX.Element {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return (
    <div
      className="scroll-progress-tech"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 9999,
        background: 'rgba(99, 102, 241, 0.1)',
      }}>
      <div
        className="scroll-progress-bar"
        style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, var(--ifm-color-primary), var(--rbg-accent), var(--rbg-tech-purple))',
          transition: 'width 0.1s ease-out',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.6), 0 0 20px rgba(99, 102, 241, 0.4)',
          position: 'relative',
        }}>
        {/* Animated glow tip */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--rbg-tech-cyan)',
            boxShadow: '0 0 8px var(--rbg-tech-cyan), 0 0 16px var(--rbg-tech-cyan)',
          }}
        />
      </div>
    </div>
  );
}