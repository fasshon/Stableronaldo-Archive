import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Get repository name from environment or default to 'stable-vods'
    // IMPORTANT: If your repo name is different, change 'stable-vods' below to match your repository name
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'stable-vods';
    const base = process.env.GITHUB_PAGES ? `/${repoName}/` : '/';
    
    console.log('Building with base path:', base);
    
    return {
      base: base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
