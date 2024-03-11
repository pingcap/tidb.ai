import { RagExtensionsRegistry } from '@/core/registry';

const baseRegistry = new RagExtensionsRegistry();

// if (process.env.VERCEL === '1') {
baseRegistry.register(() => import('@createrag/extension-vercel-blob-document-storage'));
// } else {
//   baseRegistry.register(() => import('@createrag/extension-fs-document-storage'));
// }

// Loaders
baseRegistry.register(() => import('@createrag/extension-html-loader'));
baseRegistry.register(() => import('@createrag/extension-markdown-loader'));
baseRegistry.register(() => import('@createrag/extension-text-loader'));
baseRegistry.register(() => import('@createrag/extension-pdf-loader'));

// Splitters
baseRegistry.register(() => import('@createrag/extension-langchain-recursive-character-splitter'));

// Embeddings
baseRegistry.register(() => import('@createrag/extension-openai-embeddings'));

// Chat models
baseRegistry.register(() => import('@createrag/extension-openai-chat-model'));

// Task processors
baseRegistry.register(() => import('@createrag/extension-file-task-processor'));
baseRegistry.register(() => import('@createrag/extension-html-task-processor'));
baseRegistry.register(() => import('@createrag/extension-sitemap-task-processor'));
baseRegistry.register(() => import('@createrag/extension-robots-task-processor'));

// Promptings
baseRegistry.register(() => import('@createrag/extension-refined-prompting'));
// baseRegistry.register(() => import('@createrag/extension-simple-prompting'));

// Reranker
baseRegistry.register(() => import('@createrag/extension-cohere-reranker'));

export { baseRegistry };