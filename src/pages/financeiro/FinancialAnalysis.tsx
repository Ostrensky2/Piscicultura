import { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { ChartCard } from '@/components/charts/ChartCard'
import { DonutChart } from '@/components/charts/GenericCharts'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { Tabs } from '@/components/ui/Tabs'
import { dataService } from '@/services/dataService'
import { formatMilhoes, formatBRL, formatPct, formatNumero } from '@/services/financialService'
import type { ComposicaoCusto } from '@/types'
import { TrendingUp, Banknote, Target, PiggyBank } from 'lucide-react'

export default function FinancialAnalysis() {
  const ind = dataService.getIndicadores()
  const custos = dataService.getComposicaoCustos()
  const cenarios = dataService.getCenarios()
  const [cenarioAtivo, setCenarioAtivo] = useState<'pessimista' | 'realista' | 'otimista'>('realista')
  const c = cenarios[cenarioAtivo]

  const colunasCusto: Coluna<ComposicaoCusto>[] = [
    { chave: 'categoria', titulo: 'Categoria', render: (x) => <span className="font-semibold">{x.categoria}</span> },
    { chave: 'valor', titulo: 'Valor anual', alinhar: 'right', render: (x) => formatBRL(x.valor) },
    { chave: 'percentual', titulo: '% do OPEX', alinhar: 'right', render: (x) => `${x.percentual}%` },
  ]

  return (
    <PageContainer
      titulo="Análise Financeira"
      descricao="Visão executiva da viabilidade — CAPEX, OPEX, receita, margens e composição de custos."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard rotulo="CAPEX (investimento)" valor={formatMilhoes(ind.capex)} icon={<Banknote size={20} />} corIcone="bg-azul-escuro" />
        <KPICard rotulo="Receita bruta anual" valor={formatMilhoes(ind.receitaBrutaAnual)} icon={<TrendingUp size={20} />} corIcone="bg-verde-escuro" />
        <KPICard rotulo="Lucro operacional" valor={formatMilhoes(ind.lucroOperacionalAnual)} descricao={`Margem ${formatPct(ind.margemOperacionalPct)}`} icon={<PiggyBank size={20} />} corIcone="bg-verde-positivo" />
        <KPICard rotulo="ROI" valor={formatPct(ind.roiPct)} descricao={`Payback ${ind.paybackAnos} anos`} icon={<Target size={20} />} corIcone="bg-azul-medio" destaque />
      </div>

      <div className="mt-5 card card-pad">
        <h3 className="section-title mb-3">Cenários de viabilidade</h3>
        <Tabs
          tabs={[{ id: 'pessimista', label: 'Pessimista' }, { id: 'realista', label: 'Realista' }, { id: 'otimista', label: 'Otimista' }]}
          active={cenarioAtivo}
          onChange={(id) => setCenarioAtivo(id as typeof cenarioAtivo)}
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CenarioItem rotulo="Payback" valor={`${c.paybackAnos} anos`} />
          <CenarioItem rotulo="TIR" valor={formatPct(c.tirPct)} />
          <CenarioItem rotulo="VPL (10 anos)" valor={formatMilhoes(c.vpl10anos)} />
          <CenarioItem rotulo="Margem líquida" valor={formatPct(c.margemLiquidaPct)} />
        </div>
        <p className="mt-3 text-xs text-texto-secundario">
          Lucro anual estimado no cenário <strong>{c.rotulo.toLowerCase()}</strong>: {formatBRL(c.lucroAnual)}.
        </p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChartCard titulo="Composição de custos (OPEX)" subtitulo={`OPEX anual: ${formatMilhoes(ind.opexAnual)}`}>
          <DonutChart dados={custos.map((x) => ({ categoria: x.categoria, valor: x.valor }))} />
        </ChartCard>
        <div className="card card-pad">
          <h3 className="section-title mb-3">Custos por categoria</h3>
          <TechnicalTable colunas={colunasCusto} dados={custos} compacto />
          <p className="mt-3 text-xs text-texto-secundario">
            Produção anual: {formatNumero(ind.producaoAnualKg / 1000)} t · Custo de produção: {formatBRL(ind.custoProducaoKg)}/kg · Preço médio de venda: {formatBRL(ind.precoMedioVendaKg)}/kg
          </p>
        </div>
      </div>
    </PageContainer>
  )
}

function CenarioItem({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl bg-fundo p-3">
      <p className="text-xs text-texto-secundario">{rotulo}</p>
      <p className="mt-0.5 text-xl font-extrabold text-texto-principal">{valor}</p>
    </div>
  )
}
