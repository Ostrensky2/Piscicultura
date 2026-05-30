import { PageContainer } from '@/components/layout/PageContainer'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { Badge } from '@/components/ui/Badge'
import { dataService } from '@/services/dataService'
import type { Condicionante, StatusDocumento } from '@/types'

const docTone: Record<StatusDocumento, 'verde' | 'amarelo' | 'vermelho' | 'cinza'> = {
  valido: 'verde', vencendo: 'amarelo', vencido: 'vermelho', pendente: 'cinza',
}
const docRotulo: Record<StatusDocumento, string> = {
  valido: 'Atendida', vencendo: 'No prazo', vencido: 'Atrasada', pendente: 'Pendente',
}

function formatPrazo(prazo: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(prazo)) return prazo
  return new Date(prazo).toLocaleDateString('pt-BR')
}

export default function Conditions() {
  const condicionantes = dataService.getCondicionantes()

  const colunas: Coluna<Condicionante>[] = [
    { chave: 'descricao', titulo: 'Condicionante', render: (c) => <span className="font-semibold">{c.descricao}</span> },
    { chave: 'orgao', titulo: 'Órgão' },
    { chave: 'prazo', titulo: 'Prazo', render: (c) => formatPrazo(c.prazo) },
    { chave: 'responsavel', titulo: 'Responsável' },
    { chave: 'evidencia', titulo: 'Evidência', render: (c) => c.evidencia ?? '—' },
    { chave: 'status', titulo: 'Status', alinhar: 'center', render: (c) => <Badge tone={docTone[c.status]}>{docRotulo[c.status]}</Badge> },
  ]

  return (
    <PageContainer
      titulo="Condicionantes"
      descricao="Exigências dos órgãos ambientais, prazos, responsáveis e evidências de cumprimento."
    >
      <div className="card card-pad">
        <TechnicalTable colunas={colunas} dados={condicionantes} />
      </div>
    </PageContainer>
  )
}
