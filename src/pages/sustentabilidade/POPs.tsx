import { useState, type ReactNode } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Badge } from '@/components/ui/Badge'
import { dataService } from '@/services/dataService'
import { cn } from '@/lib/cn'
import { FileCheck2, ChevronRight } from 'lucide-react'

export default function POPs() {
  const pops = dataService.getPops()
  const [ativo, setAtivo] = useState(pops[0]?.id ?? '')
  const pop = pops.find((p) => p.id === ativo) ?? pops[0]

  return (
    <PageContainer
      titulo="POPs — Procedimentos Operacionais Padrão"
      descricao="Procedimentos padronizados que orientam a operação da fazenda e garantem qualidade e rastreabilidade."
    >
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <div className="card card-pad self-start">
          <h3 className="section-title mb-3">Procedimentos</h3>
          <ul className="space-y-1">
            {pops.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => setAtivo(p.id)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    p.id === ativo ? 'bg-primary-50 font-semibold text-verde-escuro' : 'text-texto-secundario hover:bg-slate-50',
                  )}
                >
                  <FileCheck2 size={16} className="shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{p.codigo} · {p.titulo}</span>
                  <ChevronRight size={14} className="shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {pop && (
          <div className="card card-pad">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge tone="verde">{pop.codigo}</Badge>
              <h2 className="text-lg font-extrabold text-texto-principal">{pop.titulo}</h2>
            </div>
            <p className="text-sm text-texto-secundario">{pop.objetivo}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <InfoBox rotulo="Responsável" valor={pop.responsavel} />
              <InfoBox rotulo="Frequência" valor={pop.frequencia} />
            </div>

            <Secao titulo="Materiais necessários">
              <div className="flex flex-wrap gap-2">
                {pop.materiais.map((m, i) => <Badge key={i} tone="cinza">{m}</Badge>)}
              </div>
            </Secao>

            <Secao titulo="Procedimento">
              <ol className="list-decimal space-y-1.5 pl-5 text-sm text-texto-principal">
                {pop.procedimento.map((p, i) => <li key={i}>{p}</li>)}
              </ol>
            </Secao>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Secao titulo="Registros" semMargem>
                <ul className="list-disc space-y-1 pl-5 text-sm text-texto-principal">
                  {pop.registros.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </Secao>
              <Secao titulo="Pontos críticos" semMargem>
                <ul className="list-disc space-y-1 pl-5 text-sm text-texto-principal">
                  {pop.pontosCriticos.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </Secao>
            </div>

            <Secao titulo="Medidas corretivas">
              <ul className="list-disc space-y-1 pl-5 text-sm text-texto-principal">
                {pop.medidasCorretivas.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </Secao>
          </div>
        )}
      </div>
    </PageContainer>
  )
}

function InfoBox({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl bg-fundo p-3">
      <p className="text-xs text-texto-secundario">{rotulo}</p>
      <p className="mt-0.5 text-sm font-semibold text-texto-principal">{valor}</p>
    </div>
  )
}

function Secao({ titulo, children, semMargem }: { titulo: string; children: ReactNode; semMargem?: boolean }) {
  return (
    <div className={semMargem ? '' : 'mt-4'}>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-texto-secundario">{titulo}</h4>
      {children}
    </div>
  )
}
