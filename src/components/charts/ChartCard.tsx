import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ChartCardProps {
  titulo: string
  subtitulo?: string
  acao?: ReactNode
  children: ReactNode
  className?: string
}

export function ChartCard({ titulo, subtitulo, acao, children, className }: ChartCardProps) {
  return (
    <div className={cn('card card-pad', className)}>
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="section-title">{titulo}</h3>
          {subtitulo && <p className="text-xs text-texto-secundario">{subtitulo}</p>}
        </div>
        {acao}
      </div>
      {children}
    </div>
  )
}
