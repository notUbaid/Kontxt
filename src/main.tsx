import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { DeferredVercelMetrics } from './components/DeferredVercelMetrics.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <DeferredVercelMetrics />
    </BrowserRouter>
  </StrictMode>,
)
