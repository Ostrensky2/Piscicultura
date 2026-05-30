import { PageContainer } from '@/components/layout/PageContainer'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { dataService } from '@/services/dataService'
import type { ModeloPlanilha } from '@/types'
import { Download, FileSpreadsheet } from 'lucide-react'

const statusTone = { importada: 'verde', disponivel: 'azul', pendente: 'cinza' } as const
const statusRotulo = { importada: 'Importada', disponivel: 'Disponível', pendente: 'Pendente' }

export default function SpreadsheetModels() {
  const modelos = dataService.getModelosPlanilhas()
  const importadas = modelos.filter((m) => m.status === 'importada').length

  const colunas: Coluna<ModeloPlanilha>[] = [
    { chave: 'nome', titulo: 'Modelo', render: (m) => <span className="font-semibold">{m.nome}</span> },
    { chave: 'arquivo', titulo: 'Arquivo', render: (m) => <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{m.arquivo}</code> },
    { chave: 'descricao', titulo: 'Descrição' },
    { chave: 'colunasObrigatorias', titulo: 'Colunas obrigatórias', render: (m) => <span className="text-xs text-texto-secundario">{m.colunasObrigatorias.join(', ')}</span> },
    { chave: 'status', titulo: 'Status', alinhar: 'center', render: (m) => <Badge tone={statusTone[m.status]}>{statusRotulo[m.status]}</Badge> },
    { chave: 'acao', titulo: '', alinhar: 'right', render: () => <Button variant="ghost" size="sm" icon={<Download size={14} />}>Baixar</Button> },
  ]

  return (
    <PageContainer
      titulo="Modelos de Planilhas"
      descricao="Modelos padronizados (.xlsx) para coletar dados reais. Preencha e importe na aba Importação de Dados."
      acoes={<Button variant="outline" icon={<FileSpreadsheet size={16} />}>Baixar todos</Button>}
    >
      <p className="mb-4 text-sm text-texto-secundario">
        {modelos.length} modelos disponíveis · {importadas} já importados. Os arquivos ficam em
        {' '}<code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">configuracoes/modelos_planilhas/</code>.
      </p>
      <div className="card card-pad">
        <TechnicalTable colunas={colunas} dados={modelos} compacto />
      </div>
    </PageContainer>
  )
}
