import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'verde' | 'azul' | 'amarelo' | 'vermelho' | 'cinza' | 'lima'

const tones: Record<Tone, string> = {
  verde: 'bg-emerald-100 text-emerald-800',
  azul: 'bg-blue-100 text-blue-800',
  amarelo: 'bg-orange-100 text-orange-800',
  vermelho: 'bg-red-100 text-red-700',
  cinza: 'bg-slate-100 text-slate-600',
  lima: 'bg-lime-100 text-lime-800',
}

export function Badge({ tone = 'cinza', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', tones[tone], className)}>
      {children}
    </span>
  )
}
