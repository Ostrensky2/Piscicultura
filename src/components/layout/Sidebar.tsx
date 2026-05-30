import { NavLink } from 'react-router-dom'
import { Fish, X } from 'lucide-react'
import { navegacao } from '@/config/navigation'
import { cn } from '@/lib/cn'

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-azul-profundo/40 lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-azul-profundo text-slate-100 transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Marca */}
        <div className="flex items-center gap-3 px-5 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-verde-escuro">
            <Fish size={22} className="text-verde-claro" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-extrabold tracking-tight text-white">PISCIS</p>
            <p className="text-xs font-semibold tracking-[0.2em] text-verde-claro">EXPERTISE</p>
          </div>
          <button onClick={onClose} className="ml-auto rounded-lg p-1 text-slate-300 hover:bg-white/10 lg:hidden">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {navegacao.map((grupo, gi) => (
            <div key={gi} className="mb-1">
              {grupo.titulo && (
                <p className="px-3 pb-1 pt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">{grupo.titulo}</p>
              )}
              {grupo.itens.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive ? 'bg-verde-escuro text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white',
                    )
                  }
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="truncate">{item.rotulo}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
