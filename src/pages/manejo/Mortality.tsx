import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { ChartCard } from '@/components/charts/ChartCard'
import { LineChartGeneric } from '@/components/charts/GenericCharts'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { AlertCard } from '@/components/cards/AlertCard'
import { dataService } from '@/services/dataService'
import { formatNumero } from '@/services/financialService'
import type { RegistroMortalidade } from '@/types'
import { Skull, Percent, Fish } from 'lucide-react'

export default function Mortality() {
  const registros = dataService.getMortalidade()
  const totalMortos = registros.reduce((s, r) => s + r.peixesMortos, 0)
  const maxAcum = Math.max(...registros.map((r) => r.mortalidadeAcumuladaPct))

  const serie = [...registros]
    .reverse()
    .map((r) => ({ data: new Date(r.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }), diaria: r.peixesMortos, acumulada: r.mortalidadeAcumuladaPct }))

  const colunas: Coluna<RegistroMortalidade>[] = [
    { chave: 'data', titulo: 'Data', render: (r) => new Date(r.data).toLocaleDateString('pt-BR') },
    { chave: 'viveiro', titulo: 'Viveiro' },
    { chave: 'lote', titulo: 'Lote' },
    { chave: 'peixesMortos', titulo: 'Peixes mortos', alinhar: 'right', render: (r) => <span className="font-semibold">{formatNumero(r.peixesMortos)}</span> },
    { chave: 'mortalidadeAcumuladaPct', titulo: 'Acum. (%)', alinhar: 'right', render: (r) => `${r.mortalidadeAcumuladaPct}%` },
    { chave: 'causaProvavel', titulo: 'Causa provável' },
    { chave: 'acaoCorretiva', titulo: 'Ação corretiva' },
  ]

  return (
    <PageContainer
      titulo="Mortalidade"
      descricao="Registro de mortalidade diária e acumulada, causas e impacto na biomassa produzida."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <KPICard rotulo="Mortos (período)" valor={formatNumero(totalMortos)} icon={<Skull size={20} />} corIcone="bg-critico" />
        <KPICard rotulo="Mortalidade acum. máx." valor={`${maxAcum}%`} descricao="Limite aceitável: 10%" icon={<Percent size={20} />} corIcone={maxAcum > 10 ? 'bg-alerta' : 'bg-verde-positivo'} />
        <KPICard rotulo="Sobrevivência média" valor="95%" icon={<Fish size={20} />} corIcone="bg-verde-escuro" />
      </div>

      <div className="mt-4">
        <AlertCard alerta={{ id: 'mort1', titulo: 'Pico de mortalidade no V04 associado a baixa oxigenação — manter aeração noturna reforçada.', severidade: 'critico', modulo: 'Mortalidade' }} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChartCard titulo="Mortalidade diária x acumulada">
          <LineChartGeneric
            dados={serie}
            xKey="data"
            series={[
              { dataKey: 'diaria', nome: 'Mortos/dia', cor: '#D32F2F' },
              { dataKey: 'acumulada', nome: 'Acumulada (%)', cor: '#FF9800' },
            ]}
          />
        </ChartCard>
        <div className="card card-pad">
          <h3 className="section-title mb-3">Registros</h3>
          <TechnicalTable colunas={colunas} dados={registros} compacto />
        </div>
      </div>
    </PageContainer>
  )
}
