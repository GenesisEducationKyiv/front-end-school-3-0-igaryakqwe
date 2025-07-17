'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { getQueryClient } from '@/lib/query-client';
import AudioProvider from '@/providers/audio-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <ThemeProvider>
          <AudioProvider>{children}</AudioProvider>
          <Toaster richColors />
        </ThemeProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

export default Providers;
