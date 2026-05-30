import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { AppRoutes } from './routes'
import { dataService } from '@/services/dataService'

function Layout() {
  const [open, setOpen] = useState(false)
  const alertasCriticos = dataService.getAlertas().filter((a) => a.severidade === 'critico').length
  return (
    <div className="min-h-screen bg-fundo">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <Topbar onMenu={() => setOpen(true)} alertas={alertasCriticos} />
        <main>
          <Outlet />
        </main>
        <footer className="border-t border-slate-200 px-6 py-4 text-center text-xs text-texto-secundario">
          Seus dados estão seguros conosco. As informações deste projeto são confidenciais. · PISCIS Expertise © 2025
        </footer>
      </div>
    </div>
  )
}

export default function App() {
  return <AppRoutes Layout={Layout} />
}
