import { PageContainer } from '@/components/layout/PageContainer'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { KPICard } from '@/components/cards/KPICard'
import { Badge } from '@/components/ui/Badge'
import { dataService } from '@/services/dataService'
import { formatNumero, formatBRL } from '@/services/financialService'
import type { RegistroDespesca } from '@/types'
import { Fish, CalendarCheck, Scale } from 'lucide-react'

export default function Harvest() {
  const despescas = dataService.getDespescas()
  const previstas = despescas.filter((d) => !d.dataRealizada).length
  const biomassaPrevista = despescas.reduce((s, d) => s + d.biomassaEstimadaKg, 0)

  const colunas: Coluna<RegistroDespesca>[] = [
    { chave: 'lote', titulo: 'Lote', render: (d) => <span className="font-semibold">{d.lote}</span> },
    { chave: 'viveiro', titulo: 'Viveiro' },
    { chave: 'dataPrevista', titulo: 'Prevista', render: (d) => new Date(d.dataPrevista).toLocaleDateString('pt-BR') },
    { chave: 'dataRealizada', titulo: 'Realizada', render: (d) => (d.dataRealizada ? new Date(d.dataRealizada).toLocaleDateString('pt-BR') : <Badge tone="cinza">Pendente</Badge>) },
    { chave: 'biomassaEstimadaKg', titulo: 'Biom. estim.', alinhar: 'right', render: (d) => `${formatNumero(d.biomassaEstimadaKg)} kg` },
    { chave: 'biomassaDespescadaKg', titulo: 'Biom. real', alinhar: 'right', render: (d) => (d.biomassaDespescadaKg ? `${formatNumero(d.biomassaDespescadaKg)} kg` : '—') },
    { chave: 'pesoMedioFinalG', titulo: 'Peso final', alinhar: 'right', render: (d) => `${d.pesoMedioFinalG} g` },
    { chave: 'destino', titulo: 'Destino' },
    { chave: 'receitaEstimada', titulo: 'Receita est.', alinhar: 'right', render: (d) => formatBRL(d.receitaEstimada) },
    { chave: 'receitaRealizada', titulo: 'Receita real', alinhar: 'right', render: (d) => (d.receitaRealizada ? formatBRL(d.receitaRealizada) : '—') },
  ]

  return (
    <PageContainer
      titulo="Despesca"
      descricao="Planejamento e registro das despescas — previsto x realizado em biomassa e receita."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <KPICard rotulo="Despescas previstas" valor={`${previstas}`} icon={<CalendarCheck size={20} />} corIcone="bg-azul-medio" />
        <KPICard rotulo="Biomassa prevista" valor={`${formatNumero(biomassaPrevista / 1000, 1)} t`} icon={<Scale size={20} />} corIcone="bg-verde-escuro" />
        <KPICard rotulo="Peso médio final alvo" valor="850 g" icon={<Fish size={20} />} corIcone="bg-azul-claro" />
      </div>

      <div className="mt-5 card card-pad">
        <h3 className="section-title mb-3">Despescas</h3>
        <TechnicalTable colunas={colunas} dados={despescas} />
      </div>
    </PageContainer>
  )
}
