import React from 'react';

import { Icons } from '@/components';

export const AuthWallpaper = (): JSX.Element => {
  return (
    <div className="relative hidden lg:flex h-full flex-col bg-muted p-10 text-white dark:border-r">
      <div className="absolute inset-0 bg-zinc-900" />
      <div className="relative z-20 flex items-center text-lg font-medium">
        <Icons.logo className="mr-2 size-6" />
        Superflex AI
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;{"Change starts with you, but it doesn't start until you do."}&rdquo;
          </p>
          <footer className="text-sm">Tom Ziglar</footer>
        </blockquote>
      </div>
    </div>
  );
};
