import { PageContainer } from '@/components/layout/PageContainer'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { AlertCard } from '@/components/cards/AlertCard'
import { Badge } from '@/components/ui/Badge'
import { ArrowDownToLine, ArrowUpFromLine, MapPin } from 'lucide-react'

interface Fluxo { item: string; frequencia: string; volume: string; fornecedor: string }

const entradas: Fluxo[] = [
  { item: 'Alevinos', frequencia: 'A cada povoamento (quinzenal)', volume: '60.000 un/lote', fornecedor: 'Larvicultura regional (120 km)' },
  { item: 'Ração', frequencia: 'Semanal', volume: '≈ 40 t/semana', fornecedor: 'NutriPeixe (85 km)' },
  { item: 'Insumos e corretivos', frequencia: 'Mensal', volume: 'Variável', fornecedor: 'Agropecuária local (15 km)' },
  { item: 'Energia elétrica', frequencia: 'Contínua', volume: '≈ 95 MWh/mês', fornecedor: 'Concessionária + gerador reserva' },
  { item: 'Mão de obra', frequencia: 'Diária', volume: '8 colaboradores', fornecedor: 'Equipe própria' },
]

const saidas: Fluxo[] = [
  { item: 'Peixe vivo', frequencia: 'Por despesca (quinzenal)', volume: '≈ 47 t/lote', fornecedor: 'Mercado vivo regional (60 km)' },
  { item: 'Peixe para abate', frequencia: 'Por despesca', volume: 'Conforme contrato', fornecedor: 'Frigorífico (140 km)' },
]

export default function Logistics() {
  const colunas: Coluna<Fluxo>[] = [
    { chave: 'item', titulo: 'Item', render: (l) => <span className="font-semibold">{l.item}</span> },
    { chave: 'frequencia', titulo: 'Frequência' },
    { chave: 'volume', titulo: 'Volume' },
    { chave: 'fornecedor', titulo: 'Origem / Destino' },
  ]

  return (
    <PageContainer
      titulo="Logística"
      descricao="Planejamento de entradas, saídas, fornecedores, distâncias e pontos críticos logísticos."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card card-pad lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <ArrowDownToLine size={18} className="text-azul-medio" />
            <h3 className="section-title">Entradas</h3>
          </div>
          <TechnicalTable colunas={colunas} dados={entradas} compacto />

          <div className="mb-3 mt-6 flex items-center gap-2">
            <ArrowUpFromLine size={18} className="text-verde-escuro" />
            <h3 className="section-title">Saídas</h3>
          </div>
          <TechnicalTable colunas={colunas} dados={saidas} compacto />
        </div>

        <div className="space-y-5">
          <div className="card card-pad">
            <div className="mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-azul-claro" />
              <h3 className="section-title">Distâncias-chave</h3>
            </div>
            <ul className="space-y-2 text-sm">
              {[
                ['Fábrica de ração', '85 km'],
                ['Larvicultura', '120 km'],
                ['Mercado vivo', '60 km'],
                ['Frigorífico', '140 km'],
                ['Agropecuária', '15 km'],
              ].map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span className="text-texto-secundario">{k}</span>
                  <span className="font-semibold text-texto-principal">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card card-pad">
            <h3 className="section-title mb-3">Pontos críticos</h3>
            <div className="space-y-2">
              <AlertCard alerta={{ id: 'log1', titulo: 'Dependência de fornecedor único de ração (65% do custo).', severidade: 'atencao', modulo: 'Suprimentos' }} />
              <AlertCard alerta={{ id: 'log2', titulo: 'Janela de despesca exige transporte vivo refrigerado.', severidade: 'atencao', modulo: 'Escoamento' }} />
              <AlertCard alerta={{ id: 'log3', titulo: 'Necessário gerador reserva para falhas de energia.', severidade: 'critico', modulo: 'Energia' }} />
            </div>
            <div className="mt-3">
              <Badge tone="verde">Cronograma de compras e entregas integrado ao Calendário Operacional</Badge>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
