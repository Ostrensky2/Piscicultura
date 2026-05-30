import { useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { ChartCard } from '@/components/charts/ChartCard'
import { BarChartGeneric } from '@/components/charts/GenericCharts'
import { Slider } from '@/components/ui/Slider'
import { Button } from '@/components/ui/Button'
import { dataService } from '@/services/dataService'
import { formatMilhoes } from '@/services/financialService'
import { RotateCcw, Activity } from 'lucide-react'

export default function Sensitivity() {
  const variaveis = dataService.getVariaveisSensibilidade()
  const ind = dataService.getIndicadores()
  const lucroBase = ind.lucroOperacionalAnual

  const valoresIniciais = useMemo(() => Object.fromEntries(variaveis.map((v) => [v.id, v.valorBase])), [variaveis])
  const [valores, setValores] = useState<Record<string, number>>(valoresIniciais)

  const impactos = variaveis.map((v) => ({
    rotulo: v.rotulo.split(' ').slice(0, 2).join(' '),
    impacto: (valores[v.id] - v.valorBase) * v.impactoPorUnidade,
  }))

  const impactoTotal = impactos.reduce((s, i) => s + i.impacto, 0)
  const lucroProjetado = lucroBase + impactoTotal

  const serie = impactos.map((i) => ({ variavel: i.rotulo, Impacto: Math.round(i.impacto / 1000) }))

  return (
    <PageContainer
      titulo="Análise de Sensibilidade"
      descricao="Simule como variáveis-chave afetam o lucro operacional anual — identifique os maiores riscos e alavancas."
      acoes={<Button variant="outline" icon={<RotateCcw size={16} />} onClick={() => setValores(valoresIniciais)}>Restaurar base</Button>}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <KPICard rotulo="Lucro operacional base" valor={formatMilhoes(lucroBase)} icon={<Activity size={20} />} corIcone="bg-azul-escuro" />
        <KPICard rotulo="Impacto total simulado" valor={formatMilhoes(impactoTotal)} icon={<Activity size={20} />} corIcone={impactoTotal >= 0 ? 'bg-verde-positivo' : 'bg-critico'} />
        <KPICard rotulo="Lucro projetado" valor={formatMilhoes(lucroProjetado)} icon={<Activity size={20} />} corIcone={lucroProjetado >= lucroBase ? 'bg-verde-escuro' : 'bg-alerta'} destaque />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="card card-pad">
          <h3 className="section-title mb-4">Variáveis de entrada</h3>
          <div className="space-y-4">
            {variaveis.map((v) => (
              <Slider
                key={v.id}
                label={v.rotulo}
                value={valores[v.id]}
                min={v.min}
                max={v.max}
                step={v.passo}
                unidade={v.unidade}
                onChange={(val) => setValores((s) => ({ ...s, [v.id]: val }))}
              />
            ))}
          </div>
        </div>

        <ChartCard titulo="Impacto no lucro (R$ mil)" subtitulo="Variação vs. cenário base">
          <BarChartGeneric dados={serie} xKey="variavel" series={[{ dataKey: 'Impacto', nome: 'Impacto (R$ mil)' }]} height={420} />
        </ChartCard>
      </div>
    </PageContainer>
  )
}
