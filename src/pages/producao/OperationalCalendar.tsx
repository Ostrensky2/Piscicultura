import { PageContainer } from '@/components/layout/PageContainer'
import { Badge } from '@/components/ui/Badge'
import { dataService } from '@/services/dataService'
import { CalendarDays } from 'lucide-react'

const tipoTone: Record<string, 'verde' | 'azul' | 'amarelo' | 'lima' | 'vermelho' | 'cinza'> = {
  Povoamento: 'verde',
  Biometria: 'azul',
  'Recebimento de ração': 'lima',
  'Qualidade da água': 'azul',
  Despesca: 'verde',
  Manutenção: 'cinza',
  'Renovação de licença': 'vermelho',
  'Ajuste de arraçoamento': 'amarelo',
}

export default function OperationalCalendar() {
  const eventos = dataService.getEventosCalendario()
  const porData = eventos.reduce<Record<string, typeof eventos>>((acc, e) => {
    ;(acc[e.data] ??= []).push(e)
    return acc
  }, {})

  return (
    <PageContainer
      titulo="Calendário Operacional"
      descricao="Agenda de povoamentos, biometrias, manejos, entregas, manutenções e renovações."
    >
      <div className="card card-pad">
        <div className="space-y-4">
          {Object.entries(porData).map(([data, evts]) => (
            <div key={data} className="flex gap-4">
              <div className="flex w-20 shrink-0 flex-col items-center rounded-xl bg-primary-50 py-2 text-verde-escuro">
                <span className="text-xs font-semibold uppercase">{new Date(data).toLocaleDateString('pt-BR', { month: 'short' })}</span>
                <span className="text-2xl font-extrabold leading-none">{new Date(data).getDate()}</span>
                <span className="text-[10px]">{new Date(data).toLocaleDateString('pt-BR', { weekday: 'short' })}</span>
              </div>
              <div className="flex-1 space-y-2 border-l border-slate-100 pl-4">
                {evts.map((e) => (
                  <div key={e.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={15} className="text-texto-secundario" />
                      <div>
                        <p className="text-sm font-semibold text-texto-principal">{e.titulo}</p>
                        {(e.viveiro || e.lote) && <p className="text-xs text-texto-secundario">{[e.viveiro, e.lote].filter(Boolean).join(' · ')}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={tipoTone[e.tipo] ?? 'cinza'}>{e.tipo}</Badge>
                      {e.status === 'atrasado' && <Badge tone="vermelho">Atrasado</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
