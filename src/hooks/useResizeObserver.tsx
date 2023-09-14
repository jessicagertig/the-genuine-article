import { useState, useRef, useEffect } from "react";

type UseResizeObserverReturn<T> = {
  ref: React.RefObject<T>;
  width: number | undefined;
  height: number | undefined;
};

export default function useResizeObserver<
  T extends HTMLElement
>(): UseResizeObserverReturn<T> {
  const ref = useRef<T>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>();

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(entries => {
        // Only observe the first entry
        const entry = entries[0];
        if (entry) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });

      observer.observe(ref.current);

      // Cleanup function
      return () => {
        observer.disconnect();
      };
    }
  }, [ref]);

  return { ref, width: dimensions?.width, height: dimensions?.height };
}
