import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log('[DEBUG] index.tsx: Starting application initialization');
console.log('[DEBUG] index.tsx: React version:', React.version);
console.log('[DEBUG] index.tsx: Current URL:', window.location.href);
console.log('[DEBUG] index.tsx: Base path:', (import.meta as any).env?.BASE_URL || '/');

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
