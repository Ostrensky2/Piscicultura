import { Menu, Bell, CalendarDays, ChevronDown, UserRound } from 'lucide-react'
import { dataService } from '@/services/dataService'

export function Topbar({ onMenu, alertas }: { onMenu: () => void; alertas: number }) {
  const p = dataService.getDadosProjeto()
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="flex items-center gap-4 px-4 py-3 lg:px-6">
        <button onClick={onMenu} className="rounded-lg p-2 text-texto-secundario hover:bg-slate-100 lg:hidden">
          <Menu size={20} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-texto-principal sm:text-base">
            Projeto: <span className="text-verde-escuro">{p.nomeProjeto}</span>
          </p>
          <p className="hidden truncate text-xs text-texto-secundario sm:block">
            Espécie: {p.especie} &nbsp;·&nbsp; Sistema: {p.sistema} &nbsp;·&nbsp; Região: {p.regiao}
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-texto-secundario md:flex">
          <CalendarDays size={15} />
          <span>Última atualização: {p.ultimaAtualizacao}</span>
        </div>

        <button className="relative rounded-lg p-2 text-texto-secundario hover:bg-slate-100">
          <Bell size={19} />
          {alertas > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-critico px-1 text-[10px] font-bold text-white">
              {alertas}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-verde-escuro">
            <UserRound size={18} />
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-texto-principal">{p.produtor}</p>
            <p className="text-xs text-texto-secundario">{p.perfilUsuario}</p>
          </div>
          <ChevronDown size={16} className="text-texto-secundario" />
        </div>
      </div>
    </header>
  )
}
