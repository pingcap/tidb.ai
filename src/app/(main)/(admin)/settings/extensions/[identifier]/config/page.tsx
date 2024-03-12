import type { ConfigProps } from '@/app/(main)/(admin)/settings/extensions/[identifier]/config/common';
import { ConfigFallback } from '@/app/(main)/(admin)/settings/extensions/[identifier]/config/ConfigFallback';
import { ConfigLoader } from '@/app/(main)/(admin)/settings/extensions/[identifier]/config/ConfigLoader';
import { ConfigPrompting } from '@/app/(main)/(admin)/settings/extensions/[identifier]/config/ConfigPrompting';
import { ConfigSplitter } from '@/app/(main)/(admin)/settings/extensions/[identifier]/config/ConfigSplitter';
import { ExtensionCategory, getDef } from '@/app/(main)/(admin)/settings/extensions/utils';
import { notFound } from 'next/navigation';

export default function Page ({ params }: { params: { identifier: string } }) {
  const identifier = decodeURIComponent(params.identifier);

  const def = getDef(identifier);

  if (!def) {
    notFound();
  }

  const configProps: ConfigProps = {
    base: '/api/v1/indexes/default',
    identifier,
  };

  switch (def.category) {
    case ExtensionCategory.SPLITTER:
      return <ConfigSplitter {...configProps} />;
    case ExtensionCategory.PROMPTING:
      return <ConfigPrompting {...configProps} />;
    case ExtensionCategory.LOADER:
      return <ConfigLoader {...configProps} />;
    default:
      return <ConfigFallback {...configProps} />;
  }
}