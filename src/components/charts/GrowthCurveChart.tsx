import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { PontoCurva } from '@/types'
import { CORES, eixoStyle, TooltipBox } from './chartTheme'

export function GrowthCurveChart({ dados, dataKey = 'pesoEsperadoG', height = 280 }: { dados: PontoCurva[]; dataKey?: keyof PontoCurva; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={dados} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CORES.grade} vertical={false} />
        <XAxis dataKey="semana" tick={eixoStyle} tickLine={false} axisLine={false} label={{ value: 'Semana', position: 'insideBottom', offset: -2, fontSize: 10, fill: CORES.eixo }} />
        <YAxis tick={eixoStyle} tickLine={false} axisLine={false} width={40} />
        <Tooltip content={<TooltipBox />} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {dataKey === 'biomassaKg' ? (
          <Line type="monotone" dataKey="biomassaKg" name="Biomassa (kg)" stroke={CORES.azulMedio} strokeWidth={2.5} dot={false} />
        ) : (
          <>
            <Line type="monotone" dataKey="pesoEsperadoG" name="Peso esperado (g)" stroke={CORES.verdeEscuro} strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="pesoObservadoG" name="Peso observado (g)" stroke={CORES.alerta} strokeWidth={2.5} strokeDasharray="5 4" dot={false} connectNulls />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
