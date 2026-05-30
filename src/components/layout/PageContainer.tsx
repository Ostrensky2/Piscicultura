import type { ReactNode } from 'react'

interface PageContainerProps {
  titulo: string
  descricao?: string
  acoes?: ReactNode
  children: ReactNode
}

export function PageContainer({ titulo, descricao, acoes, children }: PageContainerProps) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-texto-principal lg:text-2xl">{titulo}</h1>
          {descricao && <p className="mt-1 max-w-3xl text-sm text-texto-secundario">{descricao}</p>}
        </div>
        {acoes && <div className="flex flex-wrap items-center gap-2">{acoes}</div>}
      </div>
      {children}
    </div>
  )
}
