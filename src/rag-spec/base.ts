import { RagComponentRegistry } from '@/core/registry';
import { OpenaiChatModel } from '@/rag-spec/chat-model/OpenaiChatModel';
import { FileSystemDocumentStorage } from '@/rag-spec/doument-storage/FileSystemDocumentStorage';
import { VercelBlobDocumentStorage } from '@/rag-spec/doument-storage/VercelBlobDocumentStorage';
import { OpenaiEmbeddings } from '@/rag-spec/embeddings/OpenaiEmbeddings';
import { HtmlLoader } from '@/rag-spec/loaders/HtmlLoader';
import { MarkdownLoader } from '@/rag-spec/loaders/MarkdownLoader';
import { TextLoader } from '@/rag-spec/loaders/TextLoader';
import { RecursiveCharacterTextSplitter } from '@/rag-spec/spliter/RecursiveCharacterTextSplitter';
import { HtmlTaskProcessor } from '@/rag-spec/task-processor/HtmlTaskProcessor';
import { RobotsTxtTaskProcessor } from '@/rag-spec/task-processor/RobotsTxtTaskProcessor';
import { SitemapXmlTaskProcessor } from '@/rag-spec/task-processor/SitemapXmlTaskProcessor';

const baseRegistry = new RagComponentRegistry();

if (process.env.VERCEL === '1') {
  baseRegistry.register(VercelBlobDocumentStorage);
} else {
  baseRegistry.register(FileSystemDocumentStorage);
}
baseRegistry.register(HtmlLoader);
baseRegistry.register(MarkdownLoader);
baseRegistry.register(TextLoader);
baseRegistry.register(RecursiveCharacterTextSplitter);
baseRegistry.register(OpenaiEmbeddings);
baseRegistry.register(OpenaiChatModel);

baseRegistry.register(RobotsTxtTaskProcessor);
baseRegistry.register(SitemapXmlTaskProcessor);
baseRegistry.register(HtmlTaskProcessor);

export { baseRegistry };