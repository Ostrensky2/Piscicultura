import type { TooltipProps } from 'recharts'

export const CORES = {
  verdeEscuro: '#006B2E',
  verdePositivo: '#1F9D3A',
  verdeClaro: '#A3D94D',
  azulEscuro: '#062B63',
  azulMedio: '#0455A7',
  azulClaro: '#308BA8',
  alerta: '#FF9800',
  critico: '#D32F2F',
  grade: '#E2E8F0',
  eixo: '#5A6B7A',
}

export const PALETA = [
  CORES.verdeEscuro,
  CORES.azulMedio,
  CORES.verdeClaro,
  CORES.azulClaro,
  CORES.alerta,
  CORES.critico,
  CORES.verdePositivo,
]

export const eixoStyle = { fontSize: 11, fill: CORES.eixo }

export function TooltipBox({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-card">
      {label !== undefined && <p className="mb-1 font-semibold text-texto-principal">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2 text-texto-secundario">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span>{p.name}:</span>
          <span className="font-semibold text-texto-principal">
            {typeof p.value === 'number' ? p.value.toLocaleString('pt-BR') : p.value}
          </span>
        </p>
      ))}
    </div>
  )
}
