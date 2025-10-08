import { createRoot } from 'react-dom/client';
import './index.css';
import CanvasProvider from './providers/CanvasProvider.tsx';
import XRProvider from './providers/XRProvider.tsx';
import App from './App.tsx';
import { xrStore } from './stores/xr.store.ts';
createRoot(document.getElementById('root')!).render(
  <div className="w-full h-screen relative">
    <button
      className="absolute top-0 left-0 w-32 h-32 z-10 bg-amber-200"
      onClick={() => {
        xrStore.enterAR();
      }}
    >
      Click me
    </button>
    <CanvasProvider>
      <XRProvider>
        <App />
      </XRProvider>
    </CanvasProvider>
  </div>,
);
