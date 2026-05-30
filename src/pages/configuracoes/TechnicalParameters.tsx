import type { ReactNode } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { dataService } from '@/services/dataService'
import type { ParametroTecnico } from '@/types'
import { Droplets, Fish, DollarSign, SlidersHorizontal } from 'lucide-react'

const iconePorGrupo: Record<string, ReactNode> = {
  'Qualidade da água': <Droplets size={18} />,
  Zootecnia: <Fish size={18} />,
  Financeiro: <DollarSign size={18} />,
}

export default function TechnicalParameters() {
  const params = dataService.getParametrosTecnicos()
  const grupos = Array.from(new Set(params.map((p) => p.grupo)))

  return (
    <PageContainer
      titulo="Parâmetros Técnicos"
      descricao="Valores de referência usados nos cálculos e alertas. Centralizados para fácil revisão pela consultoria."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {grupos.map((g) => {
          const itens = params.filter((p) => p.grupo === g)
          return (
            <div key={g} className="card card-pad">
              <h3 className="section-title mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-verde-escuro">
                  {iconePorGrupo[g] ?? <SlidersHorizontal size={18} />}
                </span>
                {g}
              </h3>
              <dl className="divide-y divide-slate-100">
                {itens.map((p: ParametroTecnico) => (
                  <div key={p.id} className="flex items-center justify-between py-2.5">
                    <dt className="text-sm text-texto-secundario">{p.rotulo}</dt>
                    <dd className="text-sm font-bold text-texto-principal">
                      {p.valor.toLocaleString('pt-BR')}{p.unidade ? ` ${p.unidade}` : ''}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        })}
      </div>
    </PageContainer>
  )
}
