import { BackwardButton } from '@/components/navigation/backward-button';
import { useExtension } from '@/components/use-extension';
import type { ReactNode } from 'react';

export default function Layout ({ children, params }: { children: ReactNode, params: { identifier: string } }) {
  const Extension = useExtension(decodeURIComponent(params.identifier));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        <BackwardButton className="mr-2" variant="ghost" />
        {Extension.displayName} | Configuration
      </h1>
      {children}
    </div>
  );
}
