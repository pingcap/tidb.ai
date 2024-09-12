'use client';

import { type MutableRefObject, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { AutoScrollContext, ScrollEdge, ScrollHandler } from './context';

export interface AutoScrollProps {
  /**
   * undefined - Window
   * null - no scroll target
   */
  target?: HTMLElement | null;
  children: ReactNode;
  edgePixels?: number;
}

export function AutoScroll ({ target, edgePixels = 0, children }: AutoScrollProps) {
  const [map, setMap] = useState<Map<string, boolean>>(() => new Map());
  const [handlers, setHandlers] = useState<MutableRefObject<ScrollHandler>[]>([]);
  const lastScrollPositionInfo = useRef<{ left: number, top: number }>({ left: 0, top: 0 });
  const targetRef = useRef(target);

  const currentHandlers = useRef(handlers);
  useEffect(() => {
    currentHandlers.current = handlers;
    targetRef.current = target;
  });

  const registerVoter = useCallback((id: string, defaultScroll: boolean) => {
    setMap(map => new Map(map).set(id, defaultScroll));
  }, []);

  const unregisterVoter = useCallback((id: string) => {
    setMap(map => {
      map = new Map(map);
      map.delete(id);
      return map;
    });
  }, []);

  const voteAutoScroll = useCallback((id: string) => {
    setMap(map => {
      if (map.get(id)) {
        return map;
      }
      return new Map(map).set(id, true);
    });
  }, []);

  const cancelVoteAutoScroll = useCallback((id: string) => {
    setMap(map => {
      if (map.get(id) === false) {
        return map;
      }
      return new Map(map).set(id, false);
    });
  }, []);

  const useScroll = useCallback(function useScroll (handler: ScrollHandler) {
    const currentRef = useRef(handler);

    useEffect(() => {
      currentRef.current = handler;
    });

    useEffect(() => {
      setHandlers(handlers => [...handlers, currentRef]);

      return () => {
        setHandlers(handlers => handlers.filter(handler => handler !== currentRef));
      };
    }, []);
    return;
  }, []);

  useEffect(() => {
    if (target === null) {
      return;
    }

    const scrollTarget = target ?? window;
    if (scrollTarget) {
      const measureTarget = scrollTarget === window ? document.documentElement : scrollTarget;
      const eventTarget = scrollTarget;

      lastScrollPositionInfo.current = {
        left: measureTarget.scrollLeft,
        top: measureTarget.scrollTop,
      };

      const getSize = () => {
        if (scrollTarget === window) {
          return {
            width: window.innerWidth,
            height: window.innerHeight,
          };
        } else {
          return measureTarget.getBoundingClientRect();
        }
      };

      const handleScroll = (event: Event) => {
        const { scrollLeft, scrollTop, scrollHeight, scrollWidth } = measureTarget;
        const { width, height } = getSize();

        const x = scrollLeft - lastScrollPositionInfo.current.left;
        const y = scrollTop - lastScrollPositionInfo.current.top;

        const reachLeft = scrollLeft <= edgePixels;
        const reachRight = scrollLeft + width >= scrollWidth - edgePixels;
        const reachTop = scrollTop <= edgePixels;
        const reachBottom = scrollTop + height >= scrollHeight - edgePixels;

        lastScrollPositionInfo.current = {
          left: scrollLeft,
          top: scrollTop,
        };

        currentHandlers.current.forEach(ref => {
          ref.current({
            x, y, reachLeft, reachTop, reachRight, reachBottom,
          });
        });
      };

      eventTarget.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        eventTarget.removeEventListener('scroll', handleScroll);
      };
    }
  }, [target, edgePixels]);

  const votes = Array.from(map.values());
  const shouldAutoScroll = votes.length > 0 && votes.indexOf(false) === -1;
  const shouldAutoScrollRef = useRef(shouldAutoScroll);

  useEffect(() => {
    shouldAutoScrollRef.current = shouldAutoScroll;
  });

  const requestScroll = useCallback((edge: ScrollEdge) => {
    const target = targetRef.current;

    if (target === null) {
      return;
    }

    const scrollTarget = target ?? document.documentElement;
    if (shouldAutoScrollRef.current && scrollTarget) {
      switch (edge) {
        case 'top':
          scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'left':
          scrollTarget.scrollTo({ left: 0, behavior: 'smooth' });
          break;
        case 'bottom':
          scrollTarget.scrollTo({ top: scrollTarget.scrollHeight, behavior: 'smooth' });
          break;
        case 'right':
          scrollTarget.scrollTo({ left: scrollTarget.scrollWidth, behavior: 'smooth' });
          break;
      }
    }
  }, []);

  return (
    <AutoScrollContext.Provider
      value={{
        useScroll,
        registerVoter,
        unregisterVoter,
        voteAutoScroll,
        cancelVoteAutoScroll,
        requestScroll,
      }}>
      {children}
    </AutoScrollContext.Provider>
  );
}
