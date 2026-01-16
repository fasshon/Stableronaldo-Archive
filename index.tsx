import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log('[DEBUG] index.tsx: Starting application initialization');
console.log('[DEBUG] index.tsx: React version:', React.version);
console.log('[DEBUG] index.tsx: Current URL:', window.location.href);
console.log('[DEBUG] index.tsx: Current pathname:', window.location.pathname);
console.log('[DEBUG] index.tsx: Current origin:', window.location.origin);
console.log('[DEBUG] index.tsx: Base path from import.meta:', (import.meta as any).env?.BASE_URL || '/');
console.log('[DEBUG] index.tsx: All script tags:', Array.from(document.querySelectorAll('script')).map(s => ({
  src: s.src,
  type: s.type,
  textPreview: s.textContent?.substring(0, 50)
})));
console.log('[DEBUG] index.tsx: All link tags:', Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => {
  const link = l as HTMLLinkElement;
  return {
    href: link.href,
    rel: link.rel
  };
}));

// Check for 404 errors on assets
window.addEventListener('error', (e) => {
  if (e.target && (e.target as HTMLElement).tagName === 'SCRIPT' || (e.target as HTMLElement).tagName === 'LINK') {
    const element = e.target as HTMLScriptElement | HTMLLinkElement;
    console.error('[DEBUG] index.tsx: Asset load error detected:', {
      tag: element.tagName,
      src: (element as HTMLScriptElement).src || (element as HTMLLinkElement).href,
      currentPath: window.location.pathname,
      expectedBase: window.location.pathname.split('/').slice(0, 2).join('/') + '/',
      message: e.message
    });
  }
}, true);

const rootElement = document.getElementById('root');
console.log('[DEBUG] index.tsx: Root element found:', !!rootElement, rootElement);

if (!rootElement) {
  console.error('[DEBUG] index.tsx: ERROR - Root element not found!');
  throw new Error("Could not find root element to mount to");
}

console.log('[DEBUG] index.tsx: Creating React root');
const root = ReactDOM.createRoot(rootElement);
console.log('[DEBUG] index.tsx: Rendering App component');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('[DEBUG] index.tsx: App rendered successfully');
