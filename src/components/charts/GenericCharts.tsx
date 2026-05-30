import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { CORES, PALETA, eixoStyle, TooltipBox } from './chartTheme'

type Datum = Record<string, string | number | undefined>

interface SerieBar {
  dataKey: string
  nome: string
  cor?: string
}

export function BarChartGeneric({
  dados, xKey, series, height = 260, stacked = false,
}: { dados: Datum[]; xKey: string; series: SerieBar[]; height?: number; stacked?: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={dados} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CORES.grade} vertical={false} />
        <XAxis dataKey={xKey} tick={eixoStyle} tickLine={false} axisLine={false} />
        <YAxis tick={eixoStyle} tickLine={false} axisLine={false} width={44} />
        <Tooltip content={<TooltipBox />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
        {series.length > 1 && <Legend wrapperStyle={{ fontSize: 11 }} />}
        {series.map((s, i) => (
          <Bar key={s.dataKey} dataKey={s.dataKey} name={s.nome} fill={s.cor ?? PALETA[i % PALETA.length]} radius={[4, 4, 0, 0]} stackId={stacked ? 'a' : undefined} maxBarSize={48} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export function LineChartGeneric({
  dados, xKey, series, height = 260,
}: { dados: Datum[]; xKey: string; series: { dataKey: string; nome: string; cor?: string; dashed?: boolean }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={dados} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CORES.grade} vertical={false} />
        <XAxis dataKey={xKey} tick={eixoStyle} tickLine={false} axisLine={false} />
        <YAxis tick={eixoStyle} tickLine={false} axisLine={false} width={44} />
        <Tooltip content={<TooltipBox />} />
        {series.length > 1 && <Legend wrapperStyle={{ fontSize: 11 }} />}
        {series.map((s, i) => (
          <Line key={s.dataKey} type="monotone" dataKey={s.dataKey} name={s.nome} stroke={s.cor ?? PALETA[i % PALETA.length]} strokeWidth={2.5} strokeDasharray={s.dashed ? '5 4' : undefined} dot={false} connectNulls />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function AreaChartGeneric({
  dados, xKey, dataKey, nome, cor = CORES.azulMedio, height = 240,
}: { dados: Datum[]; xKey: string; dataKey: string; nome: string; cor?: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={dados} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id={`ag-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={cor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={cor} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={CORES.grade} vertical={false} />
        <XAxis dataKey={xKey} tick={eixoStyle} tickLine={false} axisLine={false} />
        <YAxis tick={eixoStyle} tickLine={false} axisLine={false} width={44} />
        <Tooltip content={<TooltipBox />} />
        <Area type="monotone" dataKey={dataKey} name={nome} stroke={cor} strokeWidth={2.5} fill={`url(#ag-${dataKey})`} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function DonutChart({
  dados, height = 240,
}: { dados: { categoria: string; valor: number }[]; height?: number }) {
  const total = dados.reduce((s, d) => s + d.valor, 0)
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={dados} dataKey="valor" nameKey="categoria" cx="50%" cy="50%" innerRadius={56} outerRadius={88} paddingAngle={2}>
          {dados.map((_, i) => (
            <Cell key={i} fill={PALETA[i % PALETA.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v: number) => `${((v / total) * 100).toFixed(1)}%`} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
