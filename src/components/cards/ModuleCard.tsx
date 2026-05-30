import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ModuleCardProps {
  to: string
  titulo: string
  icon: ReactNode
}

export function ModuleCard({ to, titulo, icon }: ModuleCardProps) {
  return (
    <Link
      to={to}
      className="card flex flex-col items-center justify-center gap-2 px-3 py-4 text-center transition hover:shadow-card-hover hover:-translate-y-0.5"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-verde-escuro">{icon}</span>
      <span className="text-xs font-semibold text-texto-principal">{titulo}</span>
    </Link>
  )
}
