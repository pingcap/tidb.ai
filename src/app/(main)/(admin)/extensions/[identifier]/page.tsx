import { SplitterPlayground } from '@/app/(main)/(admin)/extensions/[identifier]/splitter';
import { ExtensionCategory, getDef } from '@/app/(main)/(admin)/extensions/utils';
import { baseRegistry } from '@/rag-spec/base';
import { notFound } from 'next/navigation';

export default function ExtensionPage ({ params }: { params: { identifier: string } }) {
  const identifier = decodeURIComponent(params.identifier);
  const def = getDef(identifier);

  const ctor = baseRegistry.getComponent(identifier);

  if (def) {
    switch (def.category) {
      case ExtensionCategory.SPLITTER:
        return <SplitterPlayground Splitter={ctor as any} />;
    }
  }

  notFound();
}
