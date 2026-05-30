import { cn } from '@/lib/cn'

interface TabsProps {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-slate-200">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            '-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors',
            active === t.id
              ? 'border-verde-escuro text-verde-escuro'
              : 'border-transparent text-texto-secundario hover:text-texto-principal',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
