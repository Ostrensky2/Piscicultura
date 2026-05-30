import { PageContainer } from '@/components/layout/PageContainer'
import { ChartCard } from '@/components/charts/ChartCard'
import { WaterQualityChart } from '@/components/charts/WaterQualityChart'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Select, Field } from '@/components/ui/Input'
import { dataService } from '@/services/dataService'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useState } from 'react'

const tendIcon = {
  subindo: <TrendingUp size={14} className="text-azul-medio" />,
  caindo: <TrendingDown size={14} className="text-alerta" />,
  estavel: <Minus size={14} className="text-texto-secundario" />,
}

export default function WaterParameters() {
  const params = dataService.getParametrosAgua()
  const viveiros = dataService.getViveiros()
  const [viveiro, setViveiro] = useState('V01')
  const [sel, setSel] = useState('od')
  const selecionado = params.find((p) => p.id === sel) ?? params[0]

  return (
    <PageContainer
      titulo="Parâmetros da Água"
      descricao="Monitoramento da qualidade da água com faixas ideais, status e recomendações operacionais."
      acoes={
        <Field label="Viveiro">
          <Select value={viveiro} onChange={(e) => setViveiro(e.target.value)}>
            {viveiros.filter((v) => v.status === 'ativo').map((v) => (
              <option key={v.id} value={v.id}>{v.nome}</option>
            ))}
          </Select>
        </Field>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {params.map((p) => (
          <button
            key={p.id}
            onClick={() => setSel(p.id)}
            className={`card card-pad text-left transition hover:shadow-card-hover ${sel === p.id ? 'ring-2 ring-verde-positivo' : ''}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-texto-secundario">{p.nome}</p>
              {tendIcon[p.tendencia]}
            </div>
            <p className="mt-1 text-2xl font-extrabold text-texto-principal">
              {p.valorAtual}<span className="ml-1 text-xs font-medium text-texto-secundario">{p.unidade}</span>
            </p>
            <p className="mt-0.5 text-[11px] text-texto-secundario">Ideal: {p.faixaIdealMin}–{p.faixaIdealMax} {p.unidade}</p>
            <div className="mt-2"><StatusBadge status={p.status} /></div>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <ChartCard titulo={`Histórico — ${selecionado.nome}`} subtitulo={`Faixa ideal destacada (${selecionado.faixaIdealMin}–${selecionado.faixaIdealMax} ${selecionado.unidade})`} className="lg:col-span-2">
          <WaterQualityChart historico={selecionado.historico} faixaMin={selecionado.faixaIdealMin} faixaMax={selecionado.faixaIdealMax} unidade={selecionado.unidade} height={260} />
        </ChartCard>
        <div className="card card-pad">
          <h3 className="section-title mb-2">Recomendação</h3>
          <div className="mb-3"><StatusBadge status={selecionado.status} /></div>
          <p className="text-sm leading-relaxed text-texto-secundario">{selecionado.recomendacao}</p>
        </div>
      </div>
    </PageContainer>
  )
}
