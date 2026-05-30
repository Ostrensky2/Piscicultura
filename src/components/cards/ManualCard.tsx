import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface ManualCardProps {
  titulo: string
  descricao: string
  icon: ReactNode
  acao?: string
}

export function ManualCard({ titulo, descricao, icon, acao = 'Abrir' }: ManualCardProps) {
  return (
    <div className="card card-pad flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-verde-escuro">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-texto-principal">{titulo}</p>
        <p className="text-xs text-texto-secundario">{descricao}</p>
      </div>
      <button className="inline-flex items-center gap-1 text-sm font-semibold text-verde-escuro hover:underline">
        {acao} <ArrowRight size={15} />
      </button>
    </div>
  )
}
