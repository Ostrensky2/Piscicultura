import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface KPICardProps {
  rotulo: string
  valor: string
  descricao?: string
  icon?: ReactNode
  corIcone?: string
  destaque?: boolean
}

export function KPICard({ rotulo, valor, descricao, icon, corIcone = 'bg-verde-escuro', destaque }: KPICardProps) {
  return (
    <div className={cn('card card-pad flex items-start gap-4', destaque && 'ring-1 ring-verde-positivo/40')}>
      {icon && (
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white', corIcone)}>
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm text-texto-secundario">{rotulo}</p>
        <p className="mt-0.5 text-2xl font-extrabold leading-tight text-texto-principal">{valor}</p>
        {descricao && <p className="mt-0.5 text-xs text-texto-secundario">{descricao}</p>}
      </div>
    </div>
  )
}
