import { createContext } from 'react';

export const RemarkContentContext = createContext<{ reactId: string, rawContent: string }>({ reactId: '', rawContent: '' });
