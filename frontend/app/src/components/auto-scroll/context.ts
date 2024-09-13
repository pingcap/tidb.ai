'use client';

import { createContext } from 'react';

export type ScrollInfo = {
  x: number
  y: number
  reachLeft: boolean
  reachTop: boolean
  reachRight: boolean
  reachBottom: boolean
}
export type ScrollEdge = 'top' | 'left' | 'right' | 'bottom';
export type ScrollHandler = (info: ScrollInfo) => void;

export interface AutoScrollContextValues {
  registerVoter (id: string, defaultScroll: boolean): void;

  unregisterVoter (id: string): void;

  voteAutoScroll (id: string): void;

  cancelVoteAutoScroll (id: string): void;

  useScroll (handler: ScrollHandler): void;

  requestScroll (edge: ScrollEdge): void;
}

export const AutoScrollContext = createContext<AutoScrollContextValues>({
  registerVoter (id: string, defaultScroll: boolean) {},
  unregisterVoter (id: string) {},
  voteAutoScroll (id: string) {},
  cancelVoteAutoScroll (id: string) {},
  useScroll () {},
  requestScroll () {},
});
