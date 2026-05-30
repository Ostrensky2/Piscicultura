import { PageContainer } from '@/components/layout/PageContainer'
import { dataService } from '@/services/dataService'
import { formatMilhoes, formatBRL, formatBRL2, formatPct, formatNumero } from '@/services/financialService'

export default function FinancialIndicators() {
  const ind = dataService.getIndicadores()

  const grupos: { titulo: string; itens: { rotulo: string; valor: string }[] }[] = [
    {
      titulo: 'Investimento e custos',
      itens: [
        { rotulo: 'CAPEX (investimento total)', valor: formatMilhoes(ind.capex) },
        { rotulo: 'OPEX anual', valor: formatMilhoes(ind.opexAnual) },
        { rotulo: 'Custo de produção', valor: `${formatBRL2(ind.custoProducaoKg)}/kg` },
        { rotulo: 'Ponto de equilíbrio', valor: `${formatNumero(ind.pontoEquilibrioKg / 1000)} t` },
      ],
    },
    {
      titulo: 'Receita e margens',
      itens: [
        { rotulo: 'Receita bruta anual', valor: formatMilhoes(ind.receitaBrutaAnual) },
        { rotulo: 'Receita líquida anual', valor: formatMilhoes(ind.receitaLiquidaAnual) },
        { rotulo: 'Lucro operacional anual', valor: formatMilhoes(ind.lucroOperacionalAnual) },
        { rotulo: 'Margem líquida', valor: formatPct(ind.margemLiquidaPct) },
        { rotulo: 'Margem operacional', valor: formatPct(ind.margemOperacionalPct) },
      ],
    },
    {
      titulo: 'Retorno do investimento',
      itens: [
        { rotulo: 'Payback', valor: `${ind.paybackAnos} anos` },
        { rotulo: 'TIR', valor: formatPct(ind.tirPct) },
        { rotulo: 'VPL (10 anos)', valor: formatMilhoes(ind.vpl10anos) },
        { rotulo: 'ROI', valor: formatPct(ind.roiPct) },
      ],
    },
    {
      titulo: 'Produção e preços',
      itens: [
        { rotulo: 'Produção anual', valor: `${formatNumero(ind.producaoAnualKg / 1000)} t` },
        { rotulo: 'Produção por hectare', valor: `${formatNumero(ind.producaoPorHectare)} kg/ha` },
        { rotulo: 'Receita por hectare', valor: formatBRL(ind.receitaPorHectare) },
        { rotulo: 'Preço médio de venda', valor: `${formatBRL2(ind.precoMedioVendaKg)}/kg` },
        { rotulo: 'Preço mínimo de venda', valor: `${formatBRL2(ind.precoMinimoVendaKg)}/kg` },
      ],
    },
  ]

  return (
    <PageContainer
      titulo="Indicadores Financeiros"
      descricao="Painel completo dos indicadores econômico-financeiros do projeto, agrupados por dimensão."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {grupos.map((g) => (
          <div key={g.titulo} className="card card-pad">
            <h3 className="section-title mb-3">{g.titulo}</h3>
            <dl className="divide-y divide-slate-100">
              {g.itens.map((i) => (
                <div key={i.rotulo} className="flex items-center justify-between py-2.5">
                  <dt className="text-sm text-texto-secundario">{i.rotulo}</dt>
                  <dd className="text-sm font-bold text-texto-principal">{i.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}
