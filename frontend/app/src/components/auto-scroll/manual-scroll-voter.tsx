'use client';

import { useAutoScrollVoter } from './use-auto-scroll-voter';

/**
 * When scrolling up, stop auto scroll.
 *
 * When scrolled down to bottom, start auto scroll.
 */
export function ManualScrollVoter () {
  const { useScroll, voteAutoScroll, cancelVoteAutoScroll } = useAutoScrollVoter(true);

  useScroll((info) => {
    const { y, reachBottom } = info;
    if (y > 0 && reachBottom) {
      voteAutoScroll();
    } else if (y < 0) {
      cancelVoteAutoScroll();
    }
  });

  return null;
}
