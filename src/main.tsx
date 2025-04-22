import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';
import { Toaster } from 'sonner';
import Providers from '@/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
      <Toaster richColors />
    </Providers>
  </StrictMode>
);
