import '@/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
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
