import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * Uses Intersection Observer to detect when element enters viewport
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.1
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing to prevent re-animation
          observer.unobserve(element);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before fully visible
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isVisible];
}

/**
 * Hook for staggered animation of multiple children
 */
export function useStaggeredAnimation<T extends HTMLElement = HTMLDivElement>(
  childCount: number,
  threshold: number = 0.1
): [React.RefObject<T>, boolean] {
  return useScrollAnimation<T>(threshold);
}