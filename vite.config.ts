import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'fs';

export default defineConfig(({ mode }) => {
    console.log('[DEBUG] vite.config.ts: Config loading', {
      mode,
      nodeEnv: process.env.NODE_ENV,
      githubRepo: process.env.GITHUB_REPOSITORY,
      githubPages: process.env.GITHUB_PAGES,
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('GITHUB') || k.includes('PAGES'))
    });
    
    const env = loadEnv(mode, '.', '');
    console.log('[DEBUG] vite.config.ts: Loaded env vars', {
      hasGithubRepo: !!process.env.GITHUB_REPOSITORY,
      hasGithubPages: !!process.env.GITHUB_PAGES,
      githubRepoValue: process.env.GITHUB_REPOSITORY,
      githubPagesValue: process.env.GITHUB_PAGES
    });
    
    // Check if CNAME file exists (indicates custom domain)
    const hasCustomDomain = existsSync(path.resolve(__dirname, 'CNAME'));
    console.log('[DEBUG] vite.config.ts: Custom domain check', {
      hasCustomDomain,
      cnamePath: path.resolve(__dirname, 'CNAME')
    });
    
    // Get repository name from environment or default to 'Stableronaldo-Archive'
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'Stableronaldo-Archive';
    
    // Determine base path:
    // - If custom domain (CNAME exists), use root '/' 
    // - If standard GitHub Pages (no CNAME), use '/repo-name/'
    // - For dev, always use root '/'
    const isProduction = mode === 'production' || process.env.NODE_ENV === 'production';
    const isGithubPages = !!process.env.GITHUB_PAGES || isProduction;
    
    // Custom domain = root path, standard GitHub Pages = repo path
    const base = hasCustomDomain ? '/' : (isGithubPages ? `/${repoName}/` : '/');
    
    console.log('[DEBUG] vite.config.ts: Building with base path:', {
      base,
      repoName,
      hasCustomDomain,
      isGithubPages,
      isProduction,
      githubRepo: process.env.GITHUB_REPOSITORY,
      githubPagesEnv: process.env.GITHUB_PAGES,
      mode
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
