import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface Coluna<T> {
  chave: keyof T | string
  titulo: string
  alinhar?: 'left' | 'right' | 'center'
  render?: (linha: T) => ReactNode
}

interface TechnicalTableProps<T> {
  colunas: Coluna<T>[]
  dados: T[]
  vazio?: string
  compacto?: boolean
}

export function TechnicalTable<T>({ colunas, dados, vazio = 'Sem registros.', compacto }: TechnicalTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            {colunas.map((c) => (
              <th
                key={String(c.chave)}
                className={cn('whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-texto-secundario',
                  c.alinhar === 'right' && 'text-right', c.alinhar === 'center' && 'text-center')}
              >
                {c.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.length === 0 ? (
            <tr>
              <td colSpan={colunas.length} className="px-3 py-8 text-center text-texto-secundario">{vazio}</td>
            </tr>
          ) : (
            dados.map((linha, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
                {colunas.map((c) => (
                  <td
                    key={String(c.chave)}
                    className={cn('whitespace-nowrap px-3 text-texto-principal', compacto ? 'py-2' : 'py-3',
                      c.alinhar === 'right' && 'text-right', c.alinhar === 'center' && 'text-center')}
                  >
                    {c.render ? c.render(linha) : String(linha[c.chave as keyof T] ?? '—')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
