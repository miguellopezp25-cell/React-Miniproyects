import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PokemonPage } from './pokimon/PokimonApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PokemonPage />
  </StrictMode>,
)
