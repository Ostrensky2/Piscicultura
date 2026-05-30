import { useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { ActivityTable } from '@/components/tables/ActivityTable'
import { ActivityForm } from '@/components/forms/ActivityForm'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Select, Field, Input } from '@/components/ui/Input'
import { dataService } from '@/services/dataService'
import type { RegistroDiario } from '@/types'
import { Plus, ClipboardList, CircleCheck, Clock, FileDown } from 'lucide-react'

export default function DailyActivityLog() {
  const [registros, setRegistros] = useState<RegistroDiario[]>(dataService.getRegistrosDiarios())
  const [modal, setModal] = useState(false)
  const viveiros = dataService.getViveiros().map((v) => v.id)

  const [fData, setFData] = useState('')
  const [fViveiro, setFViveiro] = useState('todos')
  const [fTipo, setFTipo] = useState('todos')

  const tipos = useMemo(() => Array.from(new Set(registros.map((r) => r.tipo))), [registros])

  const filtrados = registros.filter(
    (r) =>
      (fData === '' || r.data === fData) &&
      (fViveiro === 'todos' || r.viveiro === fViveiro) &&
      (fTipo === 'todos' || r.tipo === fTipo),
  )

  const hoje = registros.filter((r) => r.data === '2025-05-30')
  const concluidas = hoje.filter((r) => r.status === 'concluida').length
  const pendentes = registros.filter((r) => r.status === 'pendente').length

  function salvar(novo: Omit<RegistroDiario, 'id'>) {
    setRegistros((rs) => [{ ...novo, id: `rd${Date.now()}` }, ...rs])
    setModal(false)
  }

  return (
    <PageContainer
      titulo="Registro Diário da Fazenda"
      descricao="Central de registro das atividades operacionais — povoamento, arraçoamento, manejos, ocorrências e mais."
      acoes={
        <>
          <Button variant="outline" icon={<FileDown size={16} />}>Exportar</Button>
          <Button icon={<Plus size={16} />} onClick={() => setModal(true)}>Novo registro</Button>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <KPICard rotulo="Atividades hoje" valor={`${hoje.length}`} icon={<ClipboardList size={20} />} corIcone="bg-azul-medio" />
        <KPICard rotulo="Concluídas hoje" valor={`${concluidas}`} icon={<CircleCheck size={20} />} corIcone="bg-verde-positivo" />
        <KPICard rotulo="Pendentes" valor={`${pendentes}`} descricao="Requerem atenção" icon={<Clock size={20} />} corIcone={pendentes > 0 ? 'bg-alerta' : 'bg-verde-escuro'} />
      </div>

      <div className="mt-5 card card-pad">
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <Field label="Data"><Input type="date" value={fData} onChange={(e) => setFData(e.target.value)} /></Field>
          <Field label="Viveiro">
            <Select value={fViveiro} onChange={(e) => setFViveiro(e.target.value)}>
              <option value="todos">Todos</option>
              {viveiros.map((v) => <option key={v} value={v}>{v}</option>)}
            </Select>
          </Field>
          <Field label="Tipo de atividade">
            <Select value={fTipo} onChange={(e) => setFTipo(e.target.value)}>
              <option value="todos">Todos</option>
              {tipos.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </Field>
        </div>
        <ActivityTable registros={filtrados} />
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Novo registro de atividade">
        <ActivityForm viveiros={viveiros} onSalvar={salvar} onCancelar={() => setModal(false)} />
      </Modal>
    </PageContainer>
  )
}
