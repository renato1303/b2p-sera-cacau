import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SERA_CACAU_LOGO } from './assets/logo';

// Set high-res favicon dynamically to guarantee it works on Vercel and all deployments
if (typeof document !== 'undefined') {
  let favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.type = 'image/png';
  favicon.href = SERA_CACAU_LOGO;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

