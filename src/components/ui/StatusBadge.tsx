import type { Status } from '@/types'
import { Badge } from './Badge'

const map: Record<Status, { tone: 'verde' | 'amarelo' | 'vermelho'; rotulo: string }> = {
  adequado: { tone: 'verde', rotulo: 'Adequado' },
  atencao: { tone: 'amarelo', rotulo: 'Atenção' },
  critico: { tone: 'vermelho', rotulo: 'Crítico' },
}

export function StatusBadge({ status }: { status: Status }) {
  const { tone, rotulo } = map[status]
  return (
    <Badge tone={tone}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone === 'verde' ? 'bg-emerald-500' : tone === 'amarelo' ? 'bg-orange-500' : 'bg-red-500'}`} />
      {rotulo}
    </Badge>
  )
}
