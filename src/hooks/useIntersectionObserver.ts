import { useCallback, useEffect, useRef } from 'react';

const useIntersectionObserver = (
  callback: () => void,
  options?: IntersectionObserverInit,
): ((node: HTMLTableRowElement | null) => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const currentCallback = useRef(callback);

  useEffect(() => {
    currentCallback.current = callback;
  }, [callback]);

  return useCallback(
    (node: HTMLTableRowElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node) {
        if (!observerRef.current) {
          observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                currentCallback.current();
              }
            });
          }, options);
        }
        observerRef.current.observe(node);
      }
    },
    [options],
  );
};

export default useIntersectionObserver;
