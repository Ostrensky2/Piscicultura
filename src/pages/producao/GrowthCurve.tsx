import { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { ChartCard } from '@/components/charts/ChartCard'
import { GrowthCurveChart } from '@/components/charts/GrowthCurveChart'
import { KPICard } from '@/components/cards/KPICard'
import { AlertCard } from '@/components/cards/AlertCard'
import { Select, Field } from '@/components/ui/Input'
import { dataService } from '@/services/dataService'
import { TrendingUp, Scale, Activity } from 'lucide-react'

export default function GrowthCurve() {
  const curva = dataService.getCurvaCrescimento()
  const lotes = dataService.getLotes()
  const [lote, setLote] = useState('L-2025-01')

  const ultimo = curva.filter((c) => c.pesoObservadoG !== undefined).at(-1)
  const esperadoNoPonto = ultimo ? curva.find((c) => c.semana === ultimo.semana)?.pesoEsperadoG ?? 0 : 0
  const desvio = ultimo && esperadoNoPonto ? ((ultimo.pesoObservadoG! - esperadoNoPonto) / esperadoNoPonto) * 100 : 0
  const abaixo = desvio < -3

  return (
    <PageContainer
      titulo="Curva de Crescimento"
      descricao="Peso médio e biomassa ao longo do tempo — curva esperada x observada."
      acoes={
        <div className="flex gap-2">
          <Field label="Lote">
            <Select value={lote} onChange={(e) => setLote(e.target.value)}>
              {lotes.map((l) => (
                <option key={l.id} value={l.codigo}>{l.codigo} ({l.viveiro})</option>
              ))}
            </Select>
          </Field>
        </div>
      }
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <KPICard rotulo="Peso médio atual" valor={`${ultimo?.pesoObservadoG ?? '—'} g`} icon={<Scale size={20} />} corIcone="bg-verde-escuro" />
        <KPICard rotulo="Ganho médio diário" valor={`${ultimo?.ganhoMedioDiarioG ?? '—'} g/dia`} icon={<Activity size={20} />} corIcone="bg-azul-medio" />
        <KPICard rotulo="Desvio vs. esperado" valor={`${desvio.toFixed(1)}%`} descricao={abaixo ? 'Abaixo do planejado' : 'Dentro do planejado'} icon={<TrendingUp size={20} />} corIcone={abaixo ? 'bg-alerta' : 'bg-verde-positivo'} />
      </div>

      {abaixo && (
        <div className="mt-4">
          <AlertCard alerta={{ id: 'gc1', titulo: `Crescimento ${Math.abs(desvio).toFixed(1)}% abaixo do esperado no lote ${lote}. Revisar arraçoamento e qualidade da água.`, severidade: 'atencao', modulo: 'Produção' }} />
        </div>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChartCard titulo="Peso médio (g)" subtitulo="Esperado x observado">
          <GrowthCurveChart dados={curva} dataKey="pesoEsperadoG" />
        </ChartCard>
        <ChartCard titulo="Biomassa acumulada (kg)" subtitulo="Projeção do lote">
          <GrowthCurveChart dados={curva} dataKey="biomassaKg" />
        </ChartCard>
      </div>
    </PageContainer>
  )
}
