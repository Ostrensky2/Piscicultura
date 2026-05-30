import { PageContainer } from '@/components/layout/PageContainer'
import { Badge } from '@/components/ui/Badge'
import { dataService } from '@/services/dataService'
import { formatNumero } from '@/services/financialService'
import type { StatusLote } from '@/types'

const statusInfo: Record<StatusLote, { tone: 'verde' | 'azul' | 'amarelo' | 'cinza'; rotulo: string; barra: string }> = {
  planejado: { tone: 'cinza', rotulo: 'Planejado', barra: 'bg-slate-300' },
  em_andamento: { tone: 'azul', rotulo: 'Em andamento', barra: 'bg-azul-medio' },
  atrasado: { tone: 'amarelo', rotulo: 'Atrasado', barra: 'bg-alerta' },
  concluido: { tone: 'verde', rotulo: 'Concluído', barra: 'bg-verde-positivo' },
}

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function mesIndex(dataISO: string) {
  return new Date(dataISO).getMonth()
}

export default function BatchTimeline() {
  const lotes = dataService.getLotes()

  return (
    <PageContainer
      titulo="Timeline de Lotes"
      descricao="Acompanhamento tipo Gantt do povoamento, fase atual e despesca prevista de cada lote."
      acoes={
        <div className="flex flex-wrap gap-2">
          {Object.entries(statusInfo).map(([k, v]) => (
            <Badge key={k} tone={v.tone}>{v.rotulo}</Badge>
          ))}
        </div>
      }
    >
      <div className="card card-pad overflow-x-auto">
        {/* Cabeçalho de meses */}
        <div className="min-w-[760px]">
          <div className="flex border-b border-slate-200 pb-2">
            <div className="w-48 shrink-0 text-xs font-semibold uppercase tracking-wide text-texto-secundario">Lote / Viveiro</div>
            <div className="grid flex-1 grid-cols-12">
              {meses.map((m) => (
                <div key={m} className="text-center text-[11px] font-medium text-texto-secundario">{m}</div>
              ))}
            </div>
          </div>

          {lotes.map((l) => {
            const inicio = mesIndex(l.dataPovoamento)
            const fim = mesIndex(l.dataPrevistaDespesca)
            const span = Math.max(1, fim - inicio + 1)
            const info = statusInfo[l.status]
            return (
              <div key={l.id} className="flex items-center border-b border-slate-100 py-2.5 last:border-0">
                <div className="w-48 shrink-0">
                  <p className="text-sm font-semibold text-texto-principal">{l.codigo}</p>
                  <p className="text-xs text-texto-secundario">{l.viveiro} · {l.faseAtual}</p>
                </div>
                <div className="relative grid flex-1 grid-cols-12 items-center">
                  <div
                    className={`relative h-6 rounded-full ${info.barra}`}
                    style={{ gridColumn: `${inicio + 1} / span ${span}` }}
                    title={`${l.codigo}: ${l.dataPovoamento} → ${l.dataPrevistaDespesca}`}
                  >
                    <div className="absolute inset-y-0 left-0 rounded-full bg-black/15" style={{ width: `${l.progressoPct}%` }} />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                      {l.progressoPct > 0 ? `${l.progressoPct}%` : 'Planejado'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lotes.slice(0, 6).map((l) => (
          <div key={l.id} className="card card-pad">
            <div className="flex items-center justify-between">
              <p className="font-bold text-texto-principal">{l.codigo}</p>
              <Badge tone={statusInfo[l.status].tone}>{statusInfo[l.status].rotulo}</Badge>
            </div>
            <p className="mt-1 text-xs text-texto-secundario">Viveiro {l.viveiro} · {l.faseAtual}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div><dt className="text-xs text-texto-secundario">Povoamento</dt><dd className="font-semibold">{new Date(l.dataPovoamento).toLocaleDateString('pt-BR')}</dd></div>
              <div><dt className="text-xs text-texto-secundario">Despesca prev.</dt><dd className="font-semibold">{new Date(l.dataPrevistaDespesca).toLocaleDateString('pt-BR')}</dd></div>
              <div><dt className="text-xs text-texto-secundario">Peixes</dt><dd className="font-semibold">{formatNumero(l.numeroPeixes)}</dd></div>
              <div><dt className="text-xs text-texto-secundario">Peso médio</dt><dd className="font-semibold">{l.pesoMedioG} g</dd></div>
            </dl>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}
