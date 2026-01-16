import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    console.log('[DEBUG] vite.config.ts: Config loading', {
      mode,
      nodeEnv: process.env.NODE_ENV,
      githubRepo: process.env.GITHUB_REPOSITORY,
      githubPages: process.env.GITHUB_PAGES
    });
    
    const env = loadEnv(mode, '.', '');
    console.log('[DEBUG] vite.config.ts: Loaded env vars', {
      hasGithubRepo: !!process.env.GITHUB_REPOSITORY,
      hasGithubPages: !!process.env.GITHUB_PAGES
    });
    
    // Get repository name from environment or default to 'Stableronaldo-Archive'
    // IMPORTANT: If your repo name is different, change 'Stableronaldo-Archive' below to match your repository name
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'Stableronaldo-Archive';
    const base = process.env.GITHUB_PAGES ? `/${repoName}/` : '/';
    
    console.log('[DEBUG] vite.config.ts: Building with base path:', {
      base,
      repoName,
      isGithubPages: !!process.env.GITHUB_PAGES,
      githubRepo: process.env.GITHUB_REPOSITORY
    });
    
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
