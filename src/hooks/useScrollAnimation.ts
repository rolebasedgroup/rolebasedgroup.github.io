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

/**
 * Hook for animated number counting effect
 */
export function useAnimatedCounter(
  endValue: number,
  duration: number = 1000,
  trigger: boolean = true
): number {
  const [currentValue, setCurrentValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    startTimeRef.current = null;
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

      // Ease out cubic for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(Math.floor(endValue * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue, duration, trigger]);

  return currentValue;
}

/**
 * Hook for mouse parallax effect on hover
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  intensity: number = 10
): [React.RefObject<T>, { x: number; y: number }] {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = ((e.clientX - centerX) / rect.width) * intensity;
      const y = ((e.clientY - centerY) / rect.height) * intensity;

      setOffset({ x, y });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return [ref, offset];
}