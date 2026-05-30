interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unidade?: string
  onChange: (v: number) => void
  format?: (v: number) => string
}

export function Slider({ label, value, min, max, step, unidade, onChange, format }: SliderProps) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-semibold text-texto-secundario">{label}</span>
        <span className="text-sm font-bold text-texto-principal">
          {format ? format(value) : value}
          {unidade ? ` ${unidade}` : ''}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="mt-1 flex justify-between text-[10px] text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
