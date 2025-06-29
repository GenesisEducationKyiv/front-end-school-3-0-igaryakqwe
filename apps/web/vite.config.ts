import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { analyzer } from 'vite-bundle-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

const enableAnalyzer = process.env.VITE_ENABLE_ANALYZER === 'true';
const enableVisualizer = process.env.VITE_ENABLE_VISUALIZER === 'true';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    enableAnalyzer && analyzer({ openAnalyzer: true }),
    enableVisualizer && visualizer({ open: true }),
  ].filter(Boolean),
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@grpc-generated': path.resolve(
        __dirname,
        '../../packages/grpc-client/src/generated'
      ),
    },
  },
});
