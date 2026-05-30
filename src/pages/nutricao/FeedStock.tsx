import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { AlertCard } from '@/components/cards/AlertCard'
import { Badge } from '@/components/ui/Badge'
import { dataService } from '@/services/dataService'
import { formatNumero } from '@/services/financialService'
import type { ItemEstoqueRacao } from '@/types'
import { Boxes, PackageX, Truck } from 'lucide-react'

const statusTone = { ok: 'verde', baixo: 'amarelo', critico: 'vermelho' } as const
const statusRotulo = { ok: 'OK', baixo: 'Baixo', critico: 'Crítico' }

export default function FeedStock() {
  const itens = dataService.getEstoqueRacao()
  const estoqueTotal = itens.reduce((s, i) => s + i.estoqueAtualKg, 0)
  const consumoTotal = itens.reduce((s, i) => s + i.consumoDiarioKg, 0)
  const criticos = itens.filter((i) => i.status === 'critico')

  const colunas: Coluna<ItemEstoqueRacao>[] = [
    { chave: 'tipoRacao', titulo: 'Ração', render: (i) => <span className="font-semibold">{i.tipoRacao}</span> },
    { chave: 'fabricante', titulo: 'Fabricante' },
    { chave: 'estoqueAtualKg', titulo: 'Estoque', alinhar: 'right', render: (i) => `${formatNumero(i.estoqueAtualKg)} kg` },
    { chave: 'consumoDiarioKg', titulo: 'Consumo/dia', alinhar: 'right', render: (i) => `${formatNumero(i.consumoDiarioKg)} kg` },
    { chave: 'diasAutonomia', titulo: 'Autonomia', alinhar: 'right', render: (i) => `${i.diasAutonomia} dias` },
    { chave: 'dataRuptura', titulo: 'Ruptura prev.', render: (i) => new Date(i.dataRuptura).toLocaleDateString('pt-BR') },
    { chave: 'proximaEntrega', titulo: 'Próx. entrega', render: (i) => (i.proximaEntrega ? new Date(i.proximaEntrega).toLocaleDateString('pt-BR') : '—') },
    { chave: 'status', titulo: 'Status', alinhar: 'center', render: (i) => <Badge tone={statusTone[i.status]}>{statusRotulo[i.status]}</Badge> },
  ]

  return (
    <PageContainer
      titulo="Estoque de Ração"
      descricao="Saldo, consumo diário e autonomia por tipo de ração — antecipa rupturas e pedidos de reposição."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <KPICard rotulo="Estoque total" valor={`${formatNumero(estoqueTotal / 1000, 1)} t`} icon={<Boxes size={20} />} corIcone="bg-verde-escuro" />
        <KPICard rotulo="Consumo diário" valor={`${formatNumero(consumoTotal)} kg`} icon={<Truck size={20} />} corIcone="bg-azul-medio" />
        <KPICard rotulo="Itens críticos" valor={`${criticos.length}`} descricao="Risco de ruptura" icon={<PackageX size={20} />} corIcone={criticos.length > 0 ? 'bg-critico' : 'bg-verde-positivo'} />
      </div>

      {criticos.length > 0 && (
        <div className="mt-4 space-y-2">
          {criticos.map((i) => (
            <AlertCard key={i.id} alerta={{ id: i.id, titulo: `${i.tipoRacao}: estoque crítico (${i.diasAutonomia} dias). Ruptura prevista em ${new Date(i.dataRuptura).toLocaleDateString('pt-BR')}.`, severidade: 'critico', modulo: 'Estoque de ração' }} />
          ))}
        </div>
      )}

      <div className="mt-5 card card-pad">
        <h3 className="section-title mb-3">Itens em estoque</h3>
        <TechnicalTable colunas={colunas} dados={itens} />
      </div>
    </PageContainer>
  )
}
