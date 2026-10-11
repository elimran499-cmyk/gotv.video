import {createRoot, hydrateRoot} from 'react-dom/client';
import App, {redirectToVisitorLanguage} from './App.tsx';
import './index.css';
import {trackConversions} from './conversions';

if (!redirectToVisitorLanguage()) {
  // Counts WhatsApp and order CTA clicks as Google Ads conversions.
  trackConversions();

  // Built pages arrive as finished HTML and are taken over as they are; in
  // development the page starts empty and is drawn here.
  const root = document.getElementById('root')!;
  if (root.hasChildNodes()) hydrateRoot(root, <App />);
  else createRoot(root).render(<App />);
}
