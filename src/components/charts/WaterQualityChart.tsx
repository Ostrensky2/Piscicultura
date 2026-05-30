import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts'
import { CORES, eixoStyle } from './chartTheme'

interface Props {
  historico: { data: string; valor: number }[]
  faixaMin: number
  faixaMax: number
  unidade: string
  height?: number
}

export function WaterQualityChart({ historico, faixaMin, faixaMax, unidade, height = 200 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={historico} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CORES.grade} vertical={false} />
        <XAxis dataKey="data" tick={eixoStyle} tickLine={false} axisLine={false} minTickGap={20} />
        <YAxis tick={eixoStyle} tickLine={false} axisLine={false} width={38} domain={['auto', 'auto']} />
        <Tooltip formatter={(v: number) => `${v} ${unidade}`} />
        <ReferenceArea y1={faixaMin} y2={faixaMax} fill={CORES.verdePositivo} fillOpacity={0.08} />
        <Line type="monotone" dataKey="valor" name="Valor" stroke={CORES.azulClaro} strokeWidth={2.5} dot={{ r: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
