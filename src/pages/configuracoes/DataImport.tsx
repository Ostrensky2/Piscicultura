import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AlertCard } from '@/components/cards/AlertCard'
import { dataService, FONTE_DADOS } from '@/services/dataService'
import { UploadCloud, Database, FileSpreadsheet } from 'lucide-react'

const fonteRotulo: Record<typeof FONTE_DADOS, string> = {
  mock: 'Dados demonstrativos (mock)',
  json: 'Arquivos JSON',
  api: 'API REST',
  supabase: 'Supabase',
}

export default function DataImport() {
  const modelos = dataService.getModelosPlanilhas()

  return (
    <PageContainer
      titulo="Importação de Dados"
      descricao="Carregue planilhas preenchidas para substituir os dados demonstrativos pelos dados reais da fazenda."
    >
      <div className="mb-4">
        <AlertCard alerta={{ id: 'imp1', titulo: `Fonte de dados ativa: ${fonteRotulo[FONTE_DADOS]}. A importação será habilitada quando a camada de dados real estiver conectada.`, severidade: 'info', modulo: 'Configurações' }} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card card-pad flex flex-col items-center justify-center border-2 border-dashed border-slate-300 py-10 text-center lg:col-span-2">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-verde-escuro">
            <UploadCloud size={28} />
          </span>
          <p className="mt-3 text-sm font-semibold text-texto-principal">Arraste planilhas .xlsx aqui</p>
          <p className="mt-1 text-xs text-texto-secundario">ou selecione os arquivos preenchidos a partir dos modelos</p>
          <Button className="mt-4" icon={<FileSpreadsheet size={16} />} disabled>Selecionar arquivos</Button>
        </div>

        <div className="card card-pad">
          <h3 className="section-title mb-3 flex items-center gap-2"><Database size={18} className="text-verde-escuro" /> Como funciona</h3>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-texto-secundario">
            <li>Baixe os modelos em <strong>Modelos de Planilhas</strong>.</li>
            <li>Preencha com os dados reais da fazenda.</li>
            <li>Importe aqui — o sistema valida colunas obrigatórias.</li>
            <li>Os dados passam a alimentar todos os módulos via <code className="rounded bg-slate-100 px-1 text-xs">dataService</code>.</li>
          </ol>
        </div>
      </div>

      <div className="mt-5 card card-pad">
        <h3 className="section-title mb-3">Status por conjunto de dados</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modelos.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5">
              <span className="min-w-0 truncate text-sm text-texto-principal">{m.nome}</span>
              <Badge tone={m.status === 'importada' ? 'verde' : m.status === 'disponivel' ? 'azul' : 'cinza'}>
                {m.status === 'importada' ? 'Importado' : m.status === 'disponivel' ? 'Aguardando' : 'Pendente'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
