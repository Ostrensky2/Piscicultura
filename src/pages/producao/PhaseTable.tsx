import { PageContainer } from '@/components/layout/PageContainer'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { dataService } from '@/services/dataService'
import { formatNumero } from '@/services/financialService'
import type { FaseProdutiva } from '@/types'

export default function PhaseTable() {
  const fases = dataService.getFasesProdutivas()

  const colunas: Coluna<FaseProdutiva>[] = [
    { chave: 'fase', titulo: 'Fase', render: (f) => <span className="font-semibold text-texto-principal">{f.fase}</span> },
    { chave: 'duracaoDias', titulo: 'Duração', alinhar: 'right', render: (f) => `${f.duracaoDias} d` },
    { chave: 'pesoInicialG', titulo: 'Peso inicial', alinhar: 'right', render: (f) => `${f.pesoInicialG} g` },
    { chave: 'pesoFinalG', titulo: 'Peso final', alinhar: 'right', render: (f) => `${f.pesoFinalG} g` },
    { chave: 'densidadePeixesM3', titulo: 'Densidade', alinhar: 'right', render: (f) => `${f.densidadePeixesM3}/m³` },
    { chave: 'biomassaEsperadaKg', titulo: 'Biomassa', alinhar: 'right', render: (f) => `${formatNumero(f.biomassaEsperadaKg)} kg` },
    { chave: 'sobrevivenciaPct', titulo: 'Sobrev.', alinhar: 'right', render: (f) => `${f.sobrevivenciaPct}%` },
    { chave: 'conversaoAlimentar', titulo: 'CA', alinhar: 'right', render: (f) => (f.conversaoAlimentar ? f.conversaoAlimentar.toFixed(2) : '—') },
  ]

  return (
    <PageContainer
      titulo="Tabela por Fase"
      descricao="Parâmetros zootécnicos de cada fase do cultivo de tilápia, da alevinagem à despesca."
    >
      <div className="card card-pad">
        <TechnicalTable colunas={colunas} dados={fases} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fases.map((f) => (
          <div key={f.fase} className="card card-pad">
            <h3 className="font-bold text-verde-escuro">{f.fase}</h3>
            <p className="mt-2 text-xs"><span className="font-semibold text-texto-principal">Manejos:</span> <span className="text-texto-secundario">{f.manejos}</span></p>
            <p className="mt-1.5 text-xs"><span className="font-semibold text-critico">Riscos:</span> <span className="text-texto-secundario">{f.riscos}</span></p>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}
