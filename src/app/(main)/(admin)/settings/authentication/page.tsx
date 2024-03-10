'use client';

import { ProviderCardItem } from '@/app/(main)/(admin)/settings/authentication/components';
import { useProvider } from '@/app/(main)/(admin)/settings/authentication/providers';
import * as React from 'react';

// todo: add middleware to redirect to login page(if anonymous)

export default function Page () {
  const { configuredProviders, add, isLoading, error, act, remove, update } =
    useProvider();

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        Authentication Configuration
      </h2>
      <div>
        <ul className="flex flex-col gap-2">
          {configuredProviders.map((provider) => {
            return (
              <li key={provider.name} className="w-full">
                <ProviderCardItem
                  provider={provider.name}
                  enabled={provider.enabled > 0}
                  configured={provider.configured}
                  handleAct={() => {
                    act(
                      provider.enabled > 0 ? 'disable' : 'enable',
                      provider.name,
                    );
                  }}
                  handleUpdate={provider.configured ? update : add}
                  handleRemove={remove}
                  isLoading={isLoading}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
