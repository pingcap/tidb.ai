import { RagComponentRegistry } from '@/core/registry';
import { OpenaiChatModel } from '@/rag-spec/chat-model/OpenaiChatModel';
import { FileSystemDocumentStorage } from '@/rag-spec/doument-storage/FileSystemDocumentStorage';
import { VercelBlobDocumentStorage } from '@/rag-spec/doument-storage/VercelBlobDocumentStorage';
import { OpenaiEmbeddings } from '@/rag-spec/embeddings/OpenaiEmbeddings';
import { HtmlLoader } from '@/rag-spec/loaders/HtmlLoader';
import { MarkdownLoader } from '@/rag-spec/loaders/MarkdownLoader';
import { TextLoader } from '@/rag-spec/loaders/TextLoader';
import { RecursiveCharacterTextSplitter } from '@/rag-spec/spliter/RecursiveCharacterTextSplitter';

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

export { baseRegistry };