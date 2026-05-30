import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { Badge } from '@/components/ui/Badge'
import { dataService } from '@/services/dataService'
import { formatNumero } from '@/services/financialService'
import { Maximize, Droplets, Waves, Layers } from 'lucide-react'

const legenda = [
  { cor: 'bg-azul-claro', rotulo: 'Viveiro ativo' },
  { cor: 'bg-verde-claro', rotulo: 'Em preparação' },
  { cor: 'bg-slate-300', rotulo: 'Vazio' },
  { cor: 'bg-alerta', rotulo: 'Manutenção' },
]

const corViveiro: Record<string, string> = {
  ativo: 'bg-azul-claro text-white',
  preparacao: 'bg-verde-claro text-azul-profundo',
  vazio: 'bg-slate-200 text-slate-500',
  manutencao: 'bg-alerta text-white',
}

export default function MapPage() {
  const proj = dataService.getDadosProjeto()
  const viveiros = dataService.getViveiros()

  return (
    <PageContainer
      titulo="Mapa do Empreendimento"
      descricao="Layout esquemático da fazenda — viveiros, canais, captação, áreas de apoio e logística."
    >
      <div className="grid gap-5 lg:grid-cols-4">
        <KPICard rotulo="Área total" valor={`${proj.areaTotalHa} ha`} icon={<Maximize size={20} />} corIcone="bg-azul-escuro" />
        <KPICard rotulo="Lâmina d'água" valor={`${proj.areaLaminaDaguaHa} ha`} icon={<Waves size={20} />} corIcone="bg-azul-claro" />
        <KPICard rotulo="Nº de viveiros" valor={`${proj.numeroViveiros}`} icon={<Layers size={20} />} corIcone="bg-verde-escuro" />
        <KPICard rotulo="Volume de água" valor={`${formatNumero(proj.volumeAguaM3 / 1000)} mil m³`} icon={<Droplets size={20} />} corIcone="bg-azul-medio" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="card card-pad lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="section-title">Croqui da fazenda</h3>
            <div className="flex flex-wrap gap-3">
              {legenda.map((l) => (
                <span key={l.rotulo} className="flex items-center gap-1.5 text-xs text-texto-secundario">
                  <span className={`h-3 w-3 rounded ${l.cor}`} /> {l.rotulo}
                </span>
              ))}
            </div>
          </div>

          {/* Croqui esquemático */}
          <div className="rounded-xl bg-gradient-to-br from-sky-50 to-emerald-50 p-4">
            {/* Captação + canal de abastecimento */}
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-md bg-azul-medio px-2 py-1 text-xs font-semibold text-white">💧 Captação de água</span>
              <span className="h-1 flex-1 rounded bg-azul-claro/50" />
              <span className="text-[10px] font-semibold text-azul-medio">Canal de abastecimento</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {viveiros.map((v) => (
                <div key={v.id} className={`flex flex-col items-center justify-center rounded-lg p-3 text-center shadow-sm ${corViveiro[v.status]}`}>
                  <span className="text-sm font-bold">{v.nome.replace('Viveiro ', 'V')}</span>
                  <span className="text-[10px] opacity-90">{v.areaHa} ha</span>
                </div>
              ))}
            </div>

            {/* Canal de drenagem + área de despesca */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] font-semibold text-emerald-700">Canal de drenagem</span>
              <span className="h-1 flex-1 rounded bg-emerald-400/50" />
              <span className="rounded-md bg-verde-escuro px-2 py-1 text-xs font-semibold text-white">🎣 Área de despesca</span>
            </div>

            {/* Áreas de apoio */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {['🏢 Escritório', '🏭 Depósito de ração', '🚚 Carregamento', '🛠️ Apoio/Manutenção'].map((a) => (
                <div key={a} className="rounded-lg border border-dashed border-slate-300 bg-white px-2 py-2 text-center text-xs font-medium text-texto-secundario">
                  {a}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-texto-secundario">
            Croqui ilustrativo. Na versão final, será substituído por imagem georreferenciada / planta da fazenda (ver Configurações → Importação de Dados).
          </p>
        </div>

        <div className="card card-pad">
          <h3 className="section-title mb-3">Viveiros</h3>
          <div className="space-y-2">
            {viveiros.map((v) => (
              <div key={v.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-texto-principal">{v.nome}</p>
                  <p className="text-xs text-texto-secundario">{v.areaHa} ha · {formatNumero(v.volumeM3)} m³</p>
                </div>
                <Badge tone={v.status === 'ativo' ? 'azul' : v.status === 'preparacao' ? 'lima' : v.status === 'manutencao' ? 'amarelo' : 'cinza'}>
                  {v.status === 'ativo' ? 'Ativo' : v.status === 'preparacao' ? 'Preparação' : v.status === 'manutencao' ? 'Manutenção' : 'Vazio'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
