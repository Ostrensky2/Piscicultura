import { PageContainer } from '@/components/layout/PageContainer'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { Badge } from '@/components/ui/Badge'
import { dataService } from '@/services/dataService'
import { formatBRL2 } from '@/services/financialService'
import type { Racao } from '@/types'

export default function Feeds() {
  const racoes = dataService.getRacoes()

  const colunas: Coluna<Racao>[] = [
    { chave: 'nomeComercial', titulo: 'Ração', render: (r) => <span className="font-semibold">{r.nomeComercial}</span> },
    { chave: 'fabricante', titulo: 'Fabricante' },
    { chave: 'faseIndicada', titulo: 'Fase', render: (r) => <Badge tone="azul">{r.faseIndicada}</Badge> },
    { chave: 'proteinaBrutaPct', titulo: 'PB', alinhar: 'right', render: (r) => `${r.proteinaBrutaPct}%` },
    { chave: 'granulometriaMm', titulo: 'Granul.', render: (r) => `${r.granulometriaMm} mm` },
    { chave: 'energiaKcalKg', titulo: 'Energia', alinhar: 'right', render: (r) => (r.energiaKcalKg ? `${r.energiaKcalKg} kcal/kg` : '—') },
    { chave: 'conversaoEsperada', titulo: 'CA esperada', alinhar: 'right', render: (r) => r.conversaoEsperada.toFixed(2) },
    { chave: 'precoKg', titulo: 'Preço/kg', alinhar: 'right', render: (r) => <span className="font-semibold">{formatBRL2(r.precoKg)}</span> },
    { chave: 'observacoes', titulo: 'Observações', render: (r) => r.observacoes ?? '—' },
  ]

  return (
    <PageContainer
      titulo="Rações"
      descricao="Catálogo de rações por fase produtiva, com proteína, granulometria, conversão esperada e preço."
    >
      <div className="card card-pad">
        <TechnicalTable colunas={colunas} dados={racoes} />
      </div>
    </PageContainer>
  )
}
