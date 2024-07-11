import { createContext } from 'react';
import type { Entity, Relationship } from '../utils';
import { BaseNetwork, type ReadonlyNetwork } from '../network/Network';

export const NetworkContext = createContext<ReadonlyNetwork<Entity, Relationship>>(new BaseNetwork());
