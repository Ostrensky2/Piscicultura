import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { ChartCard } from '@/components/charts/ChartCard'
import { BarChartGeneric } from '@/components/charts/GenericCharts'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { dataService } from '@/services/dataService'
import { formatNumero, formatBRL2 } from '@/services/financialService'
import type { DesempenhoLote } from '@/types'
import { TrendingUp, Gauge, Percent } from 'lucide-react'

export default function Performance() {
  const lotes = dataService.getDesempenhoLotes()
  const caMedia = lotes.reduce((s, l) => s + l.conversaoAlimentar, 0) / lotes.length
  const sobrevMedia = lotes.reduce((s, l) => s + l.sobrevivenciaPct, 0) / lotes.length
  const custoMedio = lotes.reduce((s, l) => s + l.custoAlimentarKg, 0) / lotes.length

  const serie = lotes.map((l) => ({ lote: l.lote.replace('L-2025-', 'L'), CA: l.conversaoAlimentar, custo: l.custoAlimentarKg }))

  const colunas: Coluna<DesempenhoLote>[] = [
    { chave: 'lote', titulo: 'Lote', render: (l) => <span className="font-semibold">{l.lote}</span> },
    { chave: 'viveiro', titulo: 'Viveiro' },
    { chave: 'conversaoAlimentar', titulo: 'CA', alinhar: 'right', render: (l) => l.conversaoAlimentar.toFixed(2) },
    { chave: 'ganhoPesoG', titulo: 'Ganho', alinhar: 'right', render: (l) => `${l.ganhoPesoG} g` },
    { chave: 'sobrevivenciaPct', titulo: 'Sobrev.', alinhar: 'right', render: (l) => `${l.sobrevivenciaPct}%` },
    { chave: 'biomassaFinalKg', titulo: 'Biom. final', alinhar: 'right', render: (l) => `${formatNumero(l.biomassaFinalKg)} kg` },
    { chave: 'custoAlimentarKg', titulo: 'Custo alim./kg', alinhar: 'right', render: (l) => formatBRL2(l.custoAlimentarKg) },
    { chave: 'eficienciaAlimentarPct', titulo: 'Eficiência', alinhar: 'right', render: (l) => `${l.eficienciaAlimentarPct}%` },
  ]

  return (
    <PageContainer
      titulo="Desempenho Alimentar"
      descricao="Conversão alimentar, eficiência e custo por kg produzido — base para ajustar manejo e rentabilidade."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <KPICard rotulo="CA média" valor={caMedia.toFixed(2)} descricao="Meta: ≤ 1,55" icon={<Gauge size={20} />} corIcone={caMedia <= 1.55 ? 'bg-verde-positivo' : 'bg-alerta'} />
        <KPICard rotulo="Sobrevivência média" valor={`${formatNumero(sobrevMedia, 1)}%`} icon={<Percent size={20} />} corIcone="bg-verde-escuro" />
        <KPICard rotulo="Custo alimentar médio" valor={`${formatBRL2(custoMedio)}/kg`} icon={<TrendingUp size={20} />} corIcone="bg-azul-medio" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChartCard titulo="Conversão alimentar por lote" subtitulo="Menor é melhor">
          <BarChartGeneric dados={serie} xKey="lote" series={[{ dataKey: 'CA', nome: 'Conversão alimentar' }]} />
        </ChartCard>
        <div className="card card-pad">
          <h3 className="section-title mb-3">Desempenho por lote</h3>
          <TechnicalTable colunas={colunas} dados={lotes} compacto />
        </div>
      </div>
    </PageContainer>
  )
}
