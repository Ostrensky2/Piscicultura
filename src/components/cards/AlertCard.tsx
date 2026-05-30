import { AlertTriangle, AlertOctagon, Info } from 'lucide-react'
import type { Alerta } from '@/types'
import { cn } from '@/lib/cn'

const estilos = {
  info: { wrap: 'bg-blue-50 border-blue-100', icon: 'text-azul-medio', Icon: Info },
  atencao: { wrap: 'bg-orange-50 border-orange-100', icon: 'text-alerta', Icon: AlertTriangle },
  critico: { wrap: 'bg-red-50 border-red-100', icon: 'text-critico', Icon: AlertOctagon },
}

export function AlertCard({ alerta }: { alerta: Alerta }) {
  const { wrap, icon, Icon } = estilos[alerta.severidade]
  return (
    <div className={cn('flex items-start gap-3 rounded-xl border px-3 py-2.5', wrap)}>
      <Icon size={18} className={cn('mt-0.5 shrink-0', icon)} />
      <div className="min-w-0">
        <p className="text-sm leading-snug text-texto-principal">{alerta.titulo}</p>
        {alerta.modulo && <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-texto-secundario">{alerta.modulo}</p>}
      </div>
    </div>
  )
}
