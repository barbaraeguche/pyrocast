import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WildfirePrediction from './app.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WildfirePrediction />
  </StrictMode>,
)
