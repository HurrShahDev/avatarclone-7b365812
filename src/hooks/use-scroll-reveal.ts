import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  /** If true, element is visible immediately (for above-fold content) */
  immediate?: boolean;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', triggerOnce = true, immediate = false } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold, rootMargin, triggerOnce, immediate]);

  return { ref, isVisible };
};

export const useStaggerReveal = (count: number, options: UseScrollRevealOptions = {}) => {
  const { ref, isVisible } = useScrollReveal(options);
  
  const getDelay = (index: number) => ({
    transitionDelay: `${index * 100}ms`,
  });

  return { ref, isVisible, getDelay };
};
