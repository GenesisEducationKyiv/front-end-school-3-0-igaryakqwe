import '@/app/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app/app';
import { Toaster } from '@/components/ui/sonner';
import Providers from '@/providers';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <App />
      <Toaster richColors />
    </Providers>
  </StrictMode>
);
