'use client';

import { useContext } from 'react';
import { AutoScrollContext } from './context';

export function useRequestScroll () {
  const { requestScroll } = useContext(AutoScrollContext);

  return requestScroll;
}
