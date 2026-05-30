import type { CenarioTipo } from './index'

export interface IndicadoresFinanceiros {
  capex: number
  opexAnual: number
  receitaBrutaAnual: number
  receitaLiquidaAnual: number
  lucroOperacionalAnual: number
  margemLiquidaPct: number
  margemOperacionalPct: number
  pontoEquilibrioKg: number
  paybackAnos: number
  tirPct: number
  vpl10anos: number
  custoProducaoKg: number
  precoMinimoVendaKg: number
  precoMedioVendaKg: number
  producaoAnualKg: number
  receitaPorHectare: number
  producaoPorHectare: number
  roiPct: number
}

export interface Cenario {
  tipo: CenarioTipo
  rotulo: string
  paybackAnos: number
  tirPct: number
  vpl10anos: number
  margemLiquidaPct: number
  lucroAnual: number
}

export interface PontoFluxoCaixa {
  ano: number
  entradas: number
  saidas: number
  saldoAnual: number
  saldoAcumulado: number
}

export interface FluxoCaixaMensal {
  mes: string
  entradas: number
  saidas: number
  saldo: number
  saldoAcumulado: number
}

export interface ComposicaoCusto {
  categoria: string
  valor: number
  percentual: number
}

export interface VariavelSensibilidade {
  id: string
  rotulo: string
  unidade: string
  valorBase: number
  min: number
  max: number
  passo: number
  impactoPorUnidade: number
}
