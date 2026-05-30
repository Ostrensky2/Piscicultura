import type { RegistroDiario } from '@/types'
import { TechnicalTable, type Coluna } from './TechnicalTable'
import { Badge } from '@/components/ui/Badge'

const statusTone = { concluida: 'verde', em_andamento: 'azul', pendente: 'amarelo' } as const
const statusRotulo = { concluida: 'Concluída', em_andamento: 'Em andamento', pendente: 'Pendente' }

export function ActivityTable({ registros }: { registros: RegistroDiario[] }) {
  const colunas: Coluna<RegistroDiario>[] = [
    { chave: 'horario', titulo: 'Hora', render: (r) => <span className="font-semibold">{r.horario}</span> },
    { chave: 'tipo', titulo: 'Tipo', render: (r) => <Badge tone="cinza">{r.tipo}</Badge> },
    { chave: 'viveiro', titulo: 'Viveiro' },
    { chave: 'atividade', titulo: 'Atividade' },
    { chave: 'responsavel', titulo: 'Responsável' },
    {
      chave: 'status', titulo: 'Status', alinhar: 'center',
      render: (r) => <Badge tone={statusTone[r.status]}>{statusRotulo[r.status]}</Badge>,
    },
  ]
  return <TechnicalTable colunas={colunas} dados={registros} vazio="Nenhum registro para os filtros selecionados." />
}
