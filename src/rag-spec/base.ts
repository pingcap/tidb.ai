import { RagExtensionsRegistry } from '@/core/registry';

const baseRegistry = new RagExtensionsRegistry();

if (process.env.BLOB_READ_WRITE_TOKEN) {
  baseRegistry.register(() => import('@createrag/extension-vercel-blob-document-storage'));
} else {
  baseRegistry.register(() => import('@createrag/extension-fs-document-storage'));
}

// Loaders
baseRegistry.register(() => import('@createrag/extension-html-loader'));
baseRegistry.register(() => import('@createrag/extension-markdown-loader'));
baseRegistry.register(() => import('@createrag/extension-text-loader'));
baseRegistry.register(() => import('@createrag/extension-pdf-loader'));

// Task processors
baseRegistry.register(() => import('@createrag/extension-file-task-processor'));
baseRegistry.register(() => import('@createrag/extension-html-task-processor'));
baseRegistry.register(() => import('@createrag/extension-sitemap-task-processor'));
baseRegistry.register(() => import('@createrag/extension-robots-task-processor'));

// Reranker
baseRegistry.register(() => import('@createrag/extension-jinaai-reranker'));
baseRegistry.register(() => import('@createrag/extension-cohere-reranker'));

export { baseRegistry };