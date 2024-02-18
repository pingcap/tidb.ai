'use client';

import * as React from 'react';
import {
  useProvider,
  supportedProviders,
  NewProviderCardItem,
  ProviderCardItem,
} from '@/app/(main)/(admin)/authentication/components';

// todo: add middleware to redirect to login page(if anonymous)

export default function Page() {
  const { configuredProviders, add, isLoading, error, act, remove, update } =
    useProvider();

  return (
    <>
      <h1 className='text-2xl font-semibold mb-4'>Authentication Configuration</h1>
      <div>
        <ul className='flex flex-col gap-2'>
          {configuredProviders.map((provider) => {
            return (
              <li key={provider.name} className='w-full'>
                <ProviderCardItem
                  provider={provider.name}
                  enabled={provider.enabled > 0}
                  handleAct={() => {
                    act(
                      provider.enabled > 0 ? 'disable' : 'enable',
                      provider.name
                    );
                  }}
                  handleUpdate={update}
                  handleRemove={remove}
                  isLoading={isLoading}
                />
              </li>
            );
          })}
        </ul>
      </div>
      {!(configuredProviders?.length >= supportedProviders?.length) && (
        <h2 className='text-xl font-semibold mb-4'>Supported Providers</h2>
      )}
      <div>
        <ul className='flex gap-2'>
          {supportedProviders
            .filter(
              (i) => !configuredProviders.map((j) => j.name).includes(i.id)
            )
            .map((provider) => {
              return (
                <li key={provider.id} className='w-fit'>
                  <NewProviderCardItem
                    provider={provider.id}
                    handleAdd={add}
                    disabled={isLoading}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
