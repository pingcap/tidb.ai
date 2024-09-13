'use client';

import { AutoScrollContext } from './context';
import { useContext, useEffect, useId, useMemo } from 'react';

export function useAutoScrollVoter (defaultScroll: boolean) {
  const id = useId();
  const { useScroll, registerVoter, unregisterVoter, voteAutoScroll, cancelVoteAutoScroll } = useContext(AutoScrollContext);

  useEffect(() => {
    registerVoter(id, defaultScroll);
    return () => {
      unregisterVoter(id);
    };
  }, [id]);

  const _voteAutoScroll = useMemo(() => {
    return () => voteAutoScroll(id);
  }, [id]);

  const _cancelVoteAutoScroll = useMemo(() => {
    return () => cancelVoteAutoScroll(id);
  }, [id]);

  return {
    useScroll,
    voteAutoScroll: _voteAutoScroll,
    cancelVoteAutoScroll: _cancelVoteAutoScroll,
  };
}
