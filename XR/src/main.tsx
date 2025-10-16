import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import XRProvider from "./providers/XRProvider.tsx";
import CanvasProvider from "./providers/CanvasProvider.tsx";
import { useXRStore } from './providers/useXRStore.ts';

createRoot(document.getElementById('root')!).render(
  <div className="w-full h-screen relative">
    <button
      onClick={() => {
        useXRStore.enterAR();
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
