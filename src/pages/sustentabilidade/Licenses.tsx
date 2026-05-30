import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { Badge } from '@/components/ui/Badge'
import { dataService } from '@/services/dataService'
import type { Licenca, StatusDocumento } from '@/types'
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react'

const docTone: Record<StatusDocumento, 'verde' | 'amarelo' | 'vermelho' | 'cinza'> = {
  valido: 'verde', vencendo: 'amarelo', vencido: 'vermelho', pendente: 'cinza',
}
const docRotulo: Record<StatusDocumento, string> = {
  valido: 'Válido', vencendo: 'Vencendo', vencido: 'Vencido', pendente: 'Pendente',
}

export default function Licenses() {
  const licencas = dataService.getLicencas()
  const validas = licencas.filter((l) => l.status === 'valido').length
  const vencendo = licencas.filter((l) => l.status === 'vencendo').length
  const vencidas = licencas.filter((l) => l.status === 'vencido' || l.status === 'pendente').length

  const colunas: Coluna<Licenca>[] = [
    { chave: 'nome', titulo: 'Documento', render: (l) => <span className="font-semibold">{l.nome}</span> },
    { chave: 'orgao', titulo: 'Órgão' },
    { chave: 'numero', titulo: 'Número', render: (l) => l.numero ?? '—' },
    { chave: 'emissao', titulo: 'Emissão', render: (l) => (l.emissao ? new Date(l.emissao).toLocaleDateString('pt-BR') : '—') },
    { chave: 'validade', titulo: 'Validade', render: (l) => (l.validade ? new Date(l.validade).toLocaleDateString('pt-BR') : '—') },
    { chave: 'diasParaVencer', titulo: 'Dias p/ vencer', alinhar: 'right', render: (l) => (l.diasParaVencer === undefined ? '—' : <span className={l.diasParaVencer < 0 ? 'font-semibold text-critico' : l.diasParaVencer < 60 ? 'font-semibold text-alerta' : ''}>{l.diasParaVencer}</span>) },
    { chave: 'status', titulo: 'Status', alinhar: 'center', render: (l) => <Badge tone={docTone[l.status]}>{docRotulo[l.status]}</Badge> },
  ]

  return (
    <PageContainer
      titulo="Licenças"
      descricao="Situação das licenças e registros ambientais e sanitários do empreendimento."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <KPICard rotulo="Válidas" valor={`${validas}`} icon={<ShieldCheck size={20} />} corIcone="bg-verde-positivo" />
        <KPICard rotulo="Vencendo (60 dias)" valor={`${vencendo}`} icon={<ShieldAlert size={20} />} corIcone={vencendo > 0 ? 'bg-alerta' : 'bg-verde-escuro'} />
        <KPICard rotulo="Vencidas / pendentes" valor={`${vencidas}`} descricao="Requerem regularização" icon={<ShieldX size={20} />} corIcone={vencidas > 0 ? 'bg-critico' : 'bg-verde-escuro'} />
      </div>

      <div className="mt-5 card card-pad">
        <h3 className="section-title mb-3">Documentos</h3>
        <TechnicalTable colunas={colunas} dados={licencas} />
      </div>
    </PageContainer>
  )
}
