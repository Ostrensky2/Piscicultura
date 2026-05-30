import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { ChartCard } from '@/components/charts/ChartCard'
import { CashFlowChart } from '@/components/charts/CashFlowChart'
import { BarChartGeneric } from '@/components/charts/GenericCharts'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { dataService } from '@/services/dataService'
import { formatMilhoes, formatBRL } from '@/services/financialService'
import type { FluxoCaixaMensal } from '@/types'
import { Wallet, ArrowDownUp, CalendarRange } from 'lucide-react'

export default function CashFlow() {
  const anual = dataService.getFluxoCaixaAcumulado()
  const mensal = dataService.getFluxoCaixaMensal()
  const ind = dataService.getIndicadores()

  const saldoFinal = anual[anual.length - 1].saldoAcumulado
  const entradasAno1 = mensal.reduce((s, m) => s + m.entradas, 0)
  const saidasAno1 = mensal.reduce((s, m) => s + m.saidas, 0)

  const serieMensal = mensal.map((m) => ({ mes: m.mes, Entradas: m.entradas, Saídas: m.saidas }))

  const colunas: Coluna<FluxoCaixaMensal>[] = [
    { chave: 'mes', titulo: 'Mês', render: (m) => <span className="font-semibold">{m.mes}</span> },
    { chave: 'entradas', titulo: 'Entradas', alinhar: 'right', render: (m) => formatBRL(m.entradas) },
    { chave: 'saidas', titulo: 'Saídas', alinhar: 'right', render: (m) => formatBRL(m.saidas) },
    { chave: 'saldo', titulo: 'Saldo', alinhar: 'right', render: (m) => <span className={m.saldo >= 0 ? 'font-semibold text-verde-positivo' : 'font-semibold text-critico'}>{formatBRL(m.saldo)}</span> },
    { chave: 'saldoAcumulado', titulo: 'Acumulado', alinhar: 'right', render: (m) => formatBRL(m.saldoAcumulado) },
  ]

  return (
    <PageContainer
      titulo="Fluxo de Caixa"
      descricao="Entradas e saídas ao longo do tempo — acumulado de 10 anos e detalhe mensal do primeiro ano."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <KPICard rotulo="Saldo acumulado (10 anos)" valor={formatMilhoes(saldoFinal)} icon={<Wallet size={20} />} corIcone="bg-verde-escuro" />
        <KPICard rotulo="Entradas (ano 1)" valor={formatMilhoes(entradasAno1)} icon={<ArrowDownUp size={20} />} corIcone="bg-azul-medio" />
        <KPICard rotulo="Payback" valor={`${ind.paybackAnos} anos`} descricao="Saldo acumulado positivo" icon={<CalendarRange size={20} />} corIcone="bg-verde-positivo" />
      </div>

      <div className="mt-5 card card-pad">
        <h3 className="section-title mb-3">Saldo acumulado (10 anos)</h3>
        <CashFlowChart dados={anual} paybackAno={Math.round(ind.paybackAnos)} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChartCard titulo="Entradas x saídas mensais" subtitulo={`Ano 1 — saídas anuais: ${formatMilhoes(saidasAno1)}`}>
          <BarChartGeneric dados={serieMensal} xKey="mes" series={[{ dataKey: 'Entradas', nome: 'Entradas', cor: '#1F9D3A' }, { dataKey: 'Saídas', nome: 'Saídas', cor: '#D32F2F' }]} />
        </ChartCard>
        <div className="card card-pad">
          <h3 className="section-title mb-3">Detalhe mensal</h3>
          <TechnicalTable colunas={colunas} dados={mensal} compacto />
        </div>
      </div>
    </PageContainer>
  )
}
