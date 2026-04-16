import React, { useEffect, useState } from 'react';

/**
 * Scroll Progress Indicator
 * Shows a progress bar at the top of the page indicating scroll position
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
      className="scroll-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 9999,
        background: 'var(--ifm-color-secondary)',
      }}>
      <div
        className="scroll-progress-bar"
        style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, var(--ifm-color-primary), var(--rbg-accent))',
          transition: 'width 0.1s ease-out',
        }} />
    </div>
  );
}