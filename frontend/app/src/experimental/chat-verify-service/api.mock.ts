import { fn } from '@storybook/test';
import * as api from './api';

export * from './api';
export const getVerify = fn(api.getVerify).mockName('getVerify');
