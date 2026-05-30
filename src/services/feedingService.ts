import { calcBiomassaKg, calcRacaoDiariaKg, calcCustoDiarioRacao, calcPeixesVivos } from './calculationService'

export interface EntradaCalculoArracoamento {
  pesoMedioG: number
  numeroPeixes: number
  sobrevivenciaPct: number
  taxaArracoamentoPct: number
  precoRacaoKg: number
}

export interface ResultadoArracoamento {
  peixesVivos: number
  biomassaKg: number
  racaoDiariaKg: number
  racaoSemanalKg: number
  custoDiario: number
  custoSemanal: number
}

/**
 * Calculadora de arraçoamento usada na Tabela de Arraçoamento.
 * Centraliza as fórmulas zootécnicas para uso na UI.
 */
export function calcularArracoamento(e: EntradaCalculoArracoamento): ResultadoArracoamento {
  const peixesVivos = calcPeixesVivos(e.numeroPeixes, e.sobrevivenciaPct)
  const biomassaKg = calcBiomassaKg(peixesVivos, e.pesoMedioG)
  const racaoDiariaKg = calcRacaoDiariaKg(biomassaKg, e.taxaArracoamentoPct)
  const custoDiario = calcCustoDiarioRacao(racaoDiariaKg, e.precoRacaoKg)
  return {
    peixesVivos,
    biomassaKg,
    racaoDiariaKg,
    racaoSemanalKg: racaoDiariaKg * 7,
    custoDiario,
    custoSemanal: custoDiario * 7,
  }
}

/**
 * Taxa de arraçoamento sugerida (% biomassa/dia) em função do peso médio,
 * típica para tilápia. Serve de referência na calculadora.
 */
export function taxaSugeridaPorPeso(pesoMedioG: number): number {
  if (pesoMedioG < 5) return 8
  if (pesoMedioG < 20) return 6
  if (pesoMedioG < 50) return 5
  if (pesoMedioG < 100) return 4
  if (pesoMedioG < 200) return 3
  if (pesoMedioG < 400) return 2.2
  if (pesoMedioG < 600) return 1.7
  return 1.4
}
