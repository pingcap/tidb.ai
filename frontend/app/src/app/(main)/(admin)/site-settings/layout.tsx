'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { SecondaryNavigator, SecondaryNavigatorLink, SecondaryNavigatorLayout } from '@/components/secondary-navigator';
import { type ReactNode } from 'react';

export default function SiteSettingsLayout ({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <AdminPageHeading title="Site Settings" />
      <SecondaryNavigatorLayout>
        <SecondaryNavigator>
          <SecondaryNavigatorLink pathname="/site-settings">
            Website
          </SecondaryNavigatorLink>
          <SecondaryNavigatorLink pathname="/site-settings/integrations">
            Integrations
          </SecondaryNavigatorLink>
          <SecondaryNavigatorLink pathname="/site-settings/custom_js">
            JS Widget
          </SecondaryNavigatorLink>
        </SecondaryNavigator>
        <div className='flex-1 overflow-x-hidden'>
          {children}
        </div>
      </SecondaryNavigatorLayout>
    </div>
  );
}
