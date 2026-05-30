import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { PontoFluxoCaixa } from '@/types'
import { CORES, eixoStyle } from './chartTheme'

export function CashFlowChart({ dados, paybackAno }: { dados: PontoFluxoCaixa[]; paybackAno?: number }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={dados} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="grad-cash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CORES.verdePositivo} stopOpacity={0.35} />
            <stop offset="95%" stopColor={CORES.verdePositivo} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={CORES.grade} vertical={false} />
        <XAxis dataKey="ano" tick={eixoStyle} tickLine={false} axisLine={false} label={{ value: 'Anos', position: 'insideBottom', offset: -2, fontSize: 10, fill: CORES.eixo }} />
        <YAxis tick={eixoStyle} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}`} width={36} label={{ value: 'R$ mi', angle: -90, position: 'insideLeft', fontSize: 10, fill: CORES.eixo }} />
        <Tooltip formatter={(v: number) => `R$ ${(v / 1_000_000).toFixed(1)} mi`} labelFormatter={(l) => `Ano ${l}`} />
        <ReferenceLine y={0} stroke={CORES.eixo} strokeWidth={1} />
        {paybackAno !== undefined && (
          <ReferenceLine x={paybackAno} stroke={CORES.verdeEscuro} strokeDasharray="4 4" label={{ value: `Payback ${paybackAno} anos`, fontSize: 10, fill: CORES.verdeEscuro, position: 'top' }} />
        )}
        <Area type="monotone" dataKey="saldoAcumulado" name="Saldo acumulado" stroke={CORES.verdeEscuro} strokeWidth={2.5} fill="url(#grad-cash)" dot={{ r: 2.5, fill: CORES.verdeEscuro }} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
