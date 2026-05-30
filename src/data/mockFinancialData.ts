import type {
  IndicadoresFinanceiros,
  Cenario,
  PontoFluxoCaixa,
  FluxoCaixaMensal,
  ComposicaoCusto,
  VariavelSensibilidade,
} from '@/types'

export const indicadores: IndicadoresFinanceiros = {
  capex: 18_700_000,
  opexAnual: 17_200_000,
  receitaBrutaAnual: 23_400_000,
  receitaLiquidaAnual: 21_800_000,
  lucroOperacionalAnual: 6_200_000,
  margemLiquidaPct: 26.5,
  margemOperacionalPct: 28.4,
  pontoEquilibrioKg: 980_000,
  paybackAnos: 3.2,
  tirPct: 22.8,
  vpl10anos: 14_600_000,
  custoProducaoKg: 10.42,
  precoMinimoVendaKg: 9.1,
  precoMedioVendaKg: 10.5,
  producaoAnualKg: 1_200_000,
  receitaPorHectare: 520_000,
  producaoPorHectare: 26_667,
  roiPct: 33.1,
}

export const cenarios: Record<string, Cenario> = {
  pessimista: {
    tipo: 'pessimista',
    rotulo: 'Pessimista',
    paybackAnos: 5.8,
    tirPct: 11.4,
    vpl10anos: 4_200_000,
    margemLiquidaPct: 8,
    lucroAnual: 1_900_000,
  },
  realista: {
    tipo: 'realista',
    rotulo: 'Realista',
    paybackAnos: 3.2,
    tirPct: 22.8,
    vpl10anos: 14_600_000,
    margemLiquidaPct: 26.5,
    lucroAnual: 6_200_000,
  },
  otimista: {
    tipo: 'otimista',
    rotulo: 'Otimista',
    paybackAnos: 2.4,
    tirPct: 31.6,
    vpl10anos: 22_900_000,
    margemLiquidaPct: 33.2,
    lucroAnual: 9_100_000,
  },
}

export const fluxoCaixaAcumulado: PontoFluxoCaixa[] = [
  { ano: 0, entradas: 0, saidas: 18_700_000, saldoAnual: -18_700_000, saldoAcumulado: -18_700_000 },
  { ano: 1, entradas: 14_000_000, saidas: 12_500_000, saldoAnual: 1_500_000, saldoAcumulado: -17_200_000 },
  { ano: 2, entradas: 21_000_000, saidas: 16_100_000, saldoAnual: 4_900_000, saldoAcumulado: -12_300_000 },
  { ano: 3, entradas: 23_400_000, saidas: 17_200_000, saldoAnual: 6_200_000, saldoAcumulado: -6_100_000 },
  { ano: 4, entradas: 23_900_000, saidas: 17_400_000, saldoAnual: 6_500_000, saldoAcumulado: 400_000 },
  { ano: 5, entradas: 24_300_000, saidas: 17_600_000, saldoAnual: 6_700_000, saldoAcumulado: 7_100_000 },
  { ano: 6, entradas: 24_800_000, saidas: 17_800_000, saldoAnual: 7_000_000, saldoAcumulado: 14_100_000 },
  { ano: 7, entradas: 25_200_000, saidas: 18_000_000, saldoAnual: 7_200_000, saldoAcumulado: 21_300_000 },
  { ano: 8, entradas: 25_700_000, saidas: 18_200_000, saldoAnual: 7_500_000, saldoAcumulado: 28_800_000 },
  { ano: 9, entradas: 26_100_000, saidas: 18_400_000, saldoAnual: 7_700_000, saldoAcumulado: 36_500_000 },
  { ano: 10, entradas: 26_600_000, saidas: 18_600_000, saldoAnual: 8_000_000, saldoAcumulado: 44_500_000 },
]

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
let acc = 0
export const fluxoCaixaMensal: FluxoCaixaMensal[] = meses.map((mes, i) => {
  // Receita concentra-se nos meses de despesca; saídas mais constantes
  const entradas = [0, 0, 1_950_000, 0, 1_950_000, 0, 1_950_000, 0, 1_950_000, 0, 1_950_000, 1_950_000][i]
  const saidas = 1_433_000 + (i % 3 === 0 ? 250_000 : 0)
  const saldo = entradas - saidas
  acc += saldo
  return { mes, entradas, saidas, saldo, saldoAcumulado: acc }
})

export const composicaoCustos: ComposicaoCusto[] = [
  { categoria: 'Ração', valor: 11_180_000, percentual: 65 },
  { categoria: 'Alevinos', valor: 1_720_000, percentual: 10 },
  { categoria: 'Mão de obra', valor: 1_550_000, percentual: 9 },
  { categoria: 'Energia (aeração)', valor: 1_380_000, percentual: 8 },
  { categoria: 'Manutenção', valor: 690_000, percentual: 4 },
  { categoria: 'Outros', valor: 680_000, percentual: 4 },
]

export const variaveisSensibilidade: VariavelSensibilidade[] = [
  { id: 'precoVenda', rotulo: 'Preço de venda do peixe', unidade: 'R$/kg', valorBase: 10.5, min: 8, max: 13, passo: 0.1, impactoPorUnidade: 1_200_000 },
  { id: 'precoRacao', rotulo: 'Preço da ração', unidade: 'R$/kg', valorBase: 4.2, min: 3, max: 6, passo: 0.1, impactoPorUnidade: -2_400_000 },
  { id: 'mortalidade', rotulo: 'Taxa de mortalidade', unidade: '%', valorBase: 10, min: 5, max: 25, passo: 1, impactoPorUnidade: -180_000 },
  { id: 'conversao', rotulo: 'Conversão alimentar', unidade: ':1', valorBase: 1.55, min: 1.2, max: 2.2, passo: 0.05, impactoPorUnidade: -3_100_000 },
  { id: 'energia', rotulo: 'Custo de energia', unidade: 'R$/kWh', valorBase: 0.62, min: 0.4, max: 1.0, passo: 0.02, impactoPorUnidade: -1_100_000 },
  { id: 'producao', rotulo: 'Produção anual', unidade: 't', valorBase: 1200, min: 800, max: 1500, passo: 25, impactoPorUnidade: 9_300 },
]
