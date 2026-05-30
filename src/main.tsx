import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { carregarDados } from './services/dataService'
import './index.css'

const root = createRoot(document.getElementById('root')!)

function Splash() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-fundo">
      <div className="flex flex-col items-center gap-3 text-texto-secundario">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
        <p className="text-sm">Carregando dados…</p>
      </div>
    </div>
  )
}

root.render(<Splash />)

// Carrega os dados (Supabase → cache) antes de montar o app. Em caso de falha,
// o cache mantém os dados mock como fallback e o app é montado mesmo assim.
carregarDados().finally(() => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
})
