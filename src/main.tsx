import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SERA_CACAU_LOGO } from './assets/logo';

// Set high-res favicon dynamically to guarantee it works on all deployments and environments
if (typeof document !== 'undefined') {
  const iconLinks = document.querySelectorAll("link[rel*='icon'], link[rel='apple-touch-icon']");
  iconLinks.forEach(link => {
    (link as HTMLLinkElement).href = `/favicon.png?v=${Date.now()}`;
  });
  if (iconLinks.length === 0) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = `/favicon.png?v=${Date.now()}`;
    document.head.appendChild(favicon);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

