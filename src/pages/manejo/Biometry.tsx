import { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select } from '@/components/ui/Input'
import { AlertCard } from '@/components/cards/AlertCard'
import { dataService } from '@/services/dataService'
import { calcBiomassaKg } from '@/services/calculationService'
import { formatNumero } from '@/services/financialService'
import type { RegistroBiometria } from '@/types'
import { Plus } from 'lucide-react'

export default function Biometry() {
  const [registros, setRegistros] = useState<RegistroBiometria[]>(dataService.getBiometrias())
  const [modal, setModal] = useState(false)
  const lotes = dataService.getLotes()

  const [novo, setNovo] = useState({ data: '2025-05-30', viveiro: 'V01', lote: 'L-2025-01', numeroAmostrados: 60, pesoMedioG: 0 })

  function salvar() {
    const lote = lotes.find((l) => l.codigo === novo.lote)
    const peixes = lote?.numeroPeixes ?? 50_000
    setRegistros((r) => [
      {
        id: `b${Date.now()}`,
        ...novo,
        biomassaEstimadaKg: Math.round(calcBiomassaKg(peixes * 0.95, novo.pesoMedioG)),
        ganhoPesoG: 0,
        conversaoEstimada: 0,
      },
      ...r,
    ])
    setModal(false)
  }

  const colunas: Coluna<RegistroBiometria>[] = [
    { chave: 'data', titulo: 'Data', render: (b) => new Date(b.data).toLocaleDateString('pt-BR') },
    { chave: 'viveiro', titulo: 'Viveiro' },
    { chave: 'lote', titulo: 'Lote' },
    { chave: 'numeroAmostrados', titulo: 'Amostra', alinhar: 'right' },
    { chave: 'pesoMedioG', titulo: 'Peso médio', alinhar: 'right', render: (b) => <span className="font-semibold">{b.pesoMedioG} g</span> },
    { chave: 'biomassaEstimadaKg', titulo: 'Biomassa', alinhar: 'right', render: (b) => `${formatNumero(b.biomassaEstimadaKg)} kg` },
    { chave: 'ganhoPesoG', titulo: 'Ganho', alinhar: 'right', render: (b) => (b.ganhoPesoG ? `${b.ganhoPesoG} g` : '—') },
    { chave: 'conversaoEstimada', titulo: 'CA est.', alinhar: 'right', render: (b) => (b.conversaoEstimada ? b.conversaoEstimada.toFixed(2) : '—') },
  ]

  return (
    <PageContainer
      titulo="Biometrias"
      descricao="Registro e acompanhamento das biometrias — atualiza a curva de crescimento e o arraçoamento."
      acoes={<Button icon={<Plus size={16} />} onClick={() => setModal(true)}>Nova biometria</Button>}
    >
      <div className="mb-4">
        <AlertCard alerta={{ id: 'bio1', titulo: 'V04 com ganho de peso abaixo do esperado — recomenda-se revisar taxa de arraçoamento.', severidade: 'atencao', modulo: 'Biometria' }} />
      </div>
      <div className="card card-pad">
        <TechnicalTable colunas={colunas} dados={registros} />
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Nova biometria"
        footer={<><Button variant="outline" onClick={() => setModal(false)}>Cancelar</Button><Button onClick={salvar}>Salvar</Button></>}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Data"><Input type="date" value={novo.data} onChange={(e) => setNovo({ ...novo, data: e.target.value })} /></Field>
            <Field label="Lote">
              <Select value={novo.lote} onChange={(e) => setNovo({ ...novo, lote: e.target.value })}>
                {lotes.map((l) => <option key={l.id} value={l.codigo}>{l.codigo}</option>)}
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nº amostrados"><Input type="number" value={novo.numeroAmostrados} onChange={(e) => setNovo({ ...novo, numeroAmostrados: Number(e.target.value) })} /></Field>
            <Field label="Peso médio (g)"><Input type="number" value={novo.pesoMedioG} onChange={(e) => setNovo({ ...novo, pesoMedioG: Number(e.target.value) })} /></Field>
          </div>
          <p className="text-xs text-texto-secundario">A biomassa estimada é calculada automaticamente a partir do peso médio e da sobrevivência do lote.</p>
        </div>
      </Modal>
    </PageContainer>
  )
}
