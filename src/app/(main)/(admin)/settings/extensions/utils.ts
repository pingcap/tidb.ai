import { ArchiveIcon, HardDriveDownloadIcon, type LucideIcon, ScanTextIcon } from 'lucide-react';

export const enum ExtensionCategory {
  LOADER = 'rag.loader',
  TASK_PROCESSOR = 'rag.import-source-task',
  DOCUMENT_STORAGE = 'rag.document-storage',
}

export type ExtensionDef = {
  test: RegExp
  category: ExtensionCategory
  title: string
  icon: LucideIcon
  playground: boolean
}

export const extensionsDefs: ExtensionDef[] = [
  { category: ExtensionCategory.LOADER, test: /\.loader\./, title: 'Loader', icon: ScanTextIcon, playground: false },
  { category: ExtensionCategory.TASK_PROCESSOR, test: /\.import-source-task\./, title: 'Task processor', icon: HardDriveDownloadIcon, playground: false },
  { category: ExtensionCategory.DOCUMENT_STORAGE, test: /\.document-storage\./, title: 'Document storage', icon: ArchiveIcon, playground: false },
];

export function getDef (identifier: string) {
  return extensionsDefs.find(def => def.test.test(identifier));
}
