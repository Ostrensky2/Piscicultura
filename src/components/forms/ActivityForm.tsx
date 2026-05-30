import { useState } from 'react'
import { Field, Input, Select, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { RegistroDiario, TipoAtividade } from '@/types'

const tipos: TipoAtividade[] = [
  'Povoamento', 'Arraçoamento', 'Biometria', 'Qualidade da água', 'Limpeza', 'Manutenção',
  'Mortalidade', 'Aplicação de corretivos', 'Uso de aeradores', 'Despesca', 'Recebimento de ração',
  'Visita técnica', 'Ocorrência sanitária',
]

interface Props {
  viveiros: string[]
  onSalvar: (r: Omit<RegistroDiario, 'id'>) => void
  onCancelar: () => void
}

export function ActivityForm({ viveiros, onSalvar, onCancelar }: Props) {
  const hoje = new Date().toISOString().slice(0, 10)
  const [form, setForm] = useState<Omit<RegistroDiario, 'id'>>({
    data: hoje,
    horario: '08:00',
    responsavel: '',
    viveiro: viveiros[0] ?? '',
    lote: '',
    tipo: 'Arraçoamento',
    atividade: '',
    observacoes: '',
    problemas: '',
    medidasCorretivas: '',
    status: 'concluida',
  })

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSalvar(form) }}
      className="space-y-3"
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="Data"><Input type="date" value={form.data} onChange={(e) => set('data', e.target.value)} required /></Field>
        <Field label="Horário"><Input type="time" value={form.horario} onChange={(e) => set('horario', e.target.value)} required /></Field>
      </div>
      <Field label="Responsável"><Input value={form.responsavel} onChange={(e) => set('responsavel', e.target.value)} placeholder="Nome do responsável" required /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Viveiro">
          <Select value={form.viveiro} onChange={(e) => set('viveiro', e.target.value)}>
            <option value="—">—</option>
            {viveiros.map((v) => <option key={v} value={v}>{v}</option>)}
          </Select>
        </Field>
        <Field label="Lote"><Input value={form.lote} onChange={(e) => set('lote', e.target.value)} placeholder="L-2025-00" /></Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Tipo de atividade">
          <Select value={form.tipo} onChange={(e) => set('tipo', e.target.value as TipoAtividade)}>
            {tipos.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
        <Field label="Status">
          <Select value={form.status} onChange={(e) => set('status', e.target.value as RegistroDiario['status'])}>
            <option value="concluida">Concluída</option>
            <option value="em_andamento">Em andamento</option>
            <option value="pendente">Pendente</option>
          </Select>
        </Field>
      </div>
      <Field label="Atividade realizada"><Input value={form.atividade} onChange={(e) => set('atividade', e.target.value)} placeholder="Descreva a atividade" required /></Field>
      <Field label="Observações"><Textarea rows={2} value={form.observacoes} onChange={(e) => set('observacoes', e.target.value)} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Problemas encontrados"><Input value={form.problemas} onChange={(e) => set('problemas', e.target.value)} /></Field>
        <Field label="Medidas corretivas"><Input value={form.medidasCorretivas} onChange={(e) => set('medidasCorretivas', e.target.value)} /></Field>
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={onCancelar}>Cancelar</Button>
        <Button type="submit">Salvar registro</Button>
      </div>
    </form>
  )
}
