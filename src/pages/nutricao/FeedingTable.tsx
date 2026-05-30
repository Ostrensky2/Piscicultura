import { useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { ChartCard } from '@/components/charts/ChartCard'
import { Field, Input } from '@/components/ui/Input'
import { dataService } from '@/services/dataService'
import { calcularArracoamento, taxaSugeridaPorPeso } from '@/services/feedingService'
import { formatNumero, formatBRL } from '@/services/financialService'
import type { LinhaArracoamento } from '@/types'
import { Calculator } from 'lucide-react'

export default function FeedingTable() {
  const linhas = dataService.getTabelaArracoamento()

  const [calc, setCalc] = useState({ pesoMedioG: 360, numeroPeixes: 50_000, sobrevivenciaPct: 95, taxaArracoamentoPct: 2.2, precoRacaoKg: 4.6 })
  const resultado = useMemo(() => calcularArracoamento(calc), [calc])

  function setCampo(campo: keyof typeof calc, valor: number) {
    setCalc((c) => ({ ...c, [campo]: valor }))
  }

  const colunas: Coluna<LinhaArracoamento>[] = [
    { chave: 'lote', titulo: 'Lote', render: (l) => <span className="font-semibold">{l.lote}</span> },
    { chave: 'viveiro', titulo: 'Viveiro' },
    { chave: 'pesoMedioG', titulo: 'Peso médio', alinhar: 'right', render: (l) => `${l.pesoMedioG} g` },
    { chave: 'biomassaEstimadaKg', titulo: 'Biomassa', alinhar: 'right', render: (l) => `${formatNumero(l.biomassaEstimadaKg)} kg` },
    { chave: 'taxaArracoamentoPct', titulo: 'Taxa', alinhar: 'right', render: (l) => `${l.taxaArracoamentoPct}%` },
    { chave: 'racaoDiariaKg', titulo: 'Ração/dia', alinhar: 'right', render: (l) => `${formatNumero(l.racaoDiariaKg)} kg` },
    { chave: 'tratosPorDia', titulo: 'Tratos', alinhar: 'center' },
    { chave: 'tipoRacao', titulo: 'Ração' },
    { chave: 'granulometriaMm', titulo: 'Granul.', render: (l) => `${l.granulometriaMm} mm` },
    { chave: 'custoDiario', titulo: 'Custo/dia', alinhar: 'right', render: (l) => formatBRL(l.custoDiario) },
  ]

  return (
    <PageContainer
      titulo="Tabela de Arraçoamento"
      descricao="Plano diário de arraçoamento por lote e calculadora para simular biomassa, ração e custo."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <ChartCard titulo="Calculadora de arraçoamento" className="lg:col-span-1" acao={<Calculator size={18} className="text-verde-escuro" />}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Peso médio (g)">
                <Input type="number" value={calc.pesoMedioG} onChange={(e) => setCampo('pesoMedioG', Number(e.target.value))} />
              </Field>
              <Field label="Nº de peixes">
                <Input type="number" value={calc.numeroPeixes} onChange={(e) => setCampo('numeroPeixes', Number(e.target.value))} />
              </Field>
              <Field label="Sobrevivência (%)">
                <Input type="number" value={calc.sobrevivenciaPct} onChange={(e) => setCampo('sobrevivenciaPct', Number(e.target.value))} />
              </Field>
              <Field label="Taxa (%/dia)">
                <Input type="number" step="0.1" value={calc.taxaArracoamentoPct} onChange={(e) => setCampo('taxaArracoamentoPct', Number(e.target.value))} />
              </Field>
              <Field label="Preço ração (R$/kg)">
                <Input type="number" step="0.1" value={calc.precoRacaoKg} onChange={(e) => setCampo('precoRacaoKg', Number(e.target.value))} />
              </Field>
            </div>
            <button
              type="button"
              onClick={() => setCampo('taxaArracoamentoPct', taxaSugeridaPorPeso(calc.pesoMedioG))}
              className="text-xs font-semibold text-verde-escuro hover:underline"
            >
              Usar taxa sugerida p/ {calc.pesoMedioG} g ({taxaSugeridaPorPeso(calc.pesoMedioG)}%)
            </button>

            <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-primary-50 p-3">
              <ResultItem rotulo="Peixes vivos" valor={formatNumero(resultado.peixesVivos)} />
              <ResultItem rotulo="Biomassa" valor={`${formatNumero(resultado.biomassaKg)} kg`} />
              <ResultItem rotulo="Ração/dia" valor={`${formatNumero(resultado.racaoDiariaKg)} kg`} />
              <ResultItem rotulo="Ração/semana" valor={`${formatNumero(resultado.racaoSemanalKg)} kg`} />
              <ResultItem rotulo="Custo/dia" valor={formatBRL(resultado.custoDiario)} />
              <ResultItem rotulo="Custo/semana" valor={formatBRL(resultado.custoSemanal)} />
            </div>
          </div>
        </ChartCard>

        <div className="card card-pad lg:col-span-2">
          <h3 className="section-title mb-3">Plano de arraçoamento por lote</h3>
          <TechnicalTable colunas={colunas} dados={linhas} compacto />
        </div>
      </div>
    </PageContainer>
  )
}

function ResultItem({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <p className="text-[11px] text-texto-secundario">{rotulo}</p>
      <p className="text-sm font-bold text-texto-principal">{valor}</p>
    </div>
  )
}
