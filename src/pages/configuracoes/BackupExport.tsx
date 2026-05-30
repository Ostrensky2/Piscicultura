import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/Button'
import { AlertCard } from '@/components/cards/AlertCard'
import { FONTE_DADOS } from '@/services/dataService'
import { Download, Upload, DatabaseBackup, FileJson, FileSpreadsheet, FileText } from 'lucide-react'

const exportacoes = [
  { icon: <FileJson size={18} />, titulo: 'Exportar JSON', descricao: 'Todos os dados em formato estruturado, prontos para reimportação.' },
  { icon: <FileSpreadsheet size={18} />, titulo: 'Exportar Excel', descricao: 'Planilhas por módulo, no mesmo padrão dos modelos.' },
  { icon: <FileText size={18} />, titulo: 'Relatório PDF', descricao: 'Relatório executivo consolidado do projeto.' },
]

export default function BackupExport() {
  return (
    <PageContainer
      titulo="Backup e Exportação"
      descricao="Exporte os dados do projeto para backup ou compartilhamento e restaure a partir de um arquivo."
    >
      <div className="mb-4">
        <AlertCard alerta={{ id: 'bkp1', titulo: `Fonte de dados atual: ${FONTE_DADOS}. As ações de backup serão habilitadas quando a base de dados real estiver conectada.`, severidade: 'info', modulo: 'Configurações' }} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {exportacoes.map((e) => (
          <div key={e.titulo} className="card card-pad">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-verde-escuro">{e.icon}</span>
            <p className="mt-3 text-sm font-semibold text-texto-principal">{e.titulo}</p>
            <p className="mt-1 text-xs text-texto-secundario">{e.descricao}</p>
            <Button variant="outline" size="sm" className="mt-3" icon={<Download size={14} />} disabled>Exportar</Button>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="card card-pad">
          <h3 className="section-title mb-3 flex items-center gap-2"><DatabaseBackup size={18} className="text-verde-escuro" /> Backup completo</h3>
          <p className="text-sm text-texto-secundario">Gera um único arquivo com todos os módulos, configurações e parâmetros técnicos.</p>
          <Button className="mt-4" icon={<Download size={16} />} disabled>Gerar backup</Button>
        </div>
        <div className="card card-pad">
          <h3 className="section-title mb-3 flex items-center gap-2"><Upload size={18} className="text-verde-escuro" /> Restaurar</h3>
          <p className="text-sm text-texto-secundario">Carregue um arquivo de backup para restaurar os dados. Esta ação substitui os dados atuais.</p>
          <Button variant="outline" className="mt-4" icon={<Upload size={16} />} disabled>Selecionar arquivo</Button>
        </div>
      </div>
    </PageContainer>
  )
}
