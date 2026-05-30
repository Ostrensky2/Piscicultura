/**
 * Cálculos financeiros do projeto.
 * Implementações simplificadas, suficientes para o protótipo e
 * estruturadas para evoluir para precisão contábil completa.
 */

/** Receita (R$) = produção (kg) x preço de venda (R$/kg) */
export function calcReceita(producaoKg: number, precoVendaKg: number): number {
  return producaoKg * precoVendaKg
}

/** Margem líquida (%) = lucro líquido / receita * 100 */
export function calcMargemLiquidaPct(lucroLiquido: number, receita: number): number {
  if (receita <= 0) return 0
  return (lucroLiquido / receita) * 100
}

/** Custo por kg produzido = custo total / produção (kg) */
export function calcCustoPorKg(custoTotal: number, producaoKg: number): number {
  if (producaoKg <= 0) return 0
  return custoTotal / producaoKg
}

/**
 * Payback simples (anos). Percorre os fluxos anuais até o acumulado
 * tornar-se positivo, interpolando dentro do ano.
 */
export function calcPaybackAnos(investimentoInicial: number, fluxosAnuais: number[]): number {
  let acumulado = -Math.abs(investimentoInicial)
  for (let ano = 0; ano < fluxosAnuais.length; ano++) {
    const anterior = acumulado
    acumulado += fluxosAnuais[ano]
    if (acumulado >= 0) {
      const fracao = anterior === acumulado ? 0 : -anterior / (acumulado - anterior)
      return Math.round((ano + fracao) * 10) / 10
    }
  }
  return NaN // não houve payback no horizonte
}

/** Valor Presente Líquido (VPL) */
export function calcVPL(taxaDesconto: number, fluxos: number[]): number {
  return fluxos.reduce((acc, fc, t) => acc + fc / Math.pow(1 + taxaDesconto, t), 0)
}

/**
 * TIR via bisseção sobre o VPL. Retorna a taxa (fração) que zera o VPL,
 * ou NaN se não convergir no intervalo testado.
 */
export function calcTIR(fluxos: number[], min = -0.9, max = 1.5, iteracoes = 100): number {
  const vpl = (taxa: number) => calcVPL(taxa, fluxos)
  let lo = min
  let hi = max
  if (vpl(lo) * vpl(hi) > 0) return NaN
  let meio = (lo + hi) / 2
  for (let i = 0; i < iteracoes; i++) {
    meio = (lo + hi) / 2
    const v = vpl(meio)
    if (Math.abs(v) < 1) break
    if (vpl(lo) * v < 0) hi = meio
    else lo = meio
  }
  return meio
}

/** Ponto de equilíbrio (kg) = custos fixos / (preço - custo variável unitário) */
export function calcPontoEquilibrioKg(custosFixos: number, precoKg: number, custoVariavelKg: number): number {
  const margemContribuicao = precoKg - custoVariavelKg
  if (margemContribuicao <= 0) return Infinity
  return custosFixos / margemContribuicao
}

// Formatadores de moeda/número usados nas telas
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const brl2 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num = new Intl.NumberFormat('pt-BR')

export function formatBRL(v: number): string {
  return brl.format(v)
}
export function formatBRL2(v: number): string {
  return brl2.format(v)
}
export function formatNumero(v: number, casas = 0): string {
  return num.format(Number(v.toFixed(casas)))
}
/** Formata grandes valores em milhões/mil para cards executivos. */
export function formatMilhoes(v: number): string {
  const abs = Math.abs(v)
  if (abs >= 1_000_000) return `R$ ${(v / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mi`
  if (abs >= 1_000) return `R$ ${(v / 1_000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} mil`
  return brl.format(v)
}
export function formatPct(v: number, casas = 1): string {
  return `${v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas })}%`
}
