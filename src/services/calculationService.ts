/**
 * Cálculos zootécnicos básicos da piscicultura.
 * Funções puras — entram dados, saem números. Prontas para serem
 * alimentadas por planilhas/JSON reais no futuro (ver dataService).
 */

/** Biomassa (kg) = nº de peixes x peso médio (g) / 1000 */
export function calcBiomassaKg(numeroPeixes: number, pesoMedioG: number): number {
  return (numeroPeixes * pesoMedioG) / 1000
}

/** Ração diária (kg) = biomassa (kg) x taxa de arraçoamento (%) */
export function calcRacaoDiariaKg(biomassaKg: number, taxaPct: number): number {
  return biomassaKg * (taxaPct / 100)
}

/** Custo diário de ração (R$) = ração diária (kg) x preço (R$/kg) */
export function calcCustoDiarioRacao(racaoDiariaKg: number, precoKg: number): number {
  return racaoDiariaKg * precoKg
}

/** Conversão alimentar aparente = ração consumida / ganho de biomassa */
export function calcConversaoAlimentar(racaoConsumidaKg: number, ganhoBiomassaKg: number): number {
  if (ganhoBiomassaKg <= 0) return 0
  return racaoConsumidaKg / ganhoBiomassaKg
}

/** Mortalidade acumulada (%) = mortos acumulados / povoados * 100 */
export function calcMortalidadeAcumuladaPct(mortosAcumulados: number, povoados: number): number {
  if (povoados <= 0) return 0
  return (mortosAcumulados / povoados) * 100
}

/** Sobrevivência estimada (%) = 100 - mortalidade acumulada */
export function calcSobrevivenciaPct(mortalidadeAcumuladaPct: number): number {
  return Math.max(0, 100 - mortalidadeAcumuladaPct)
}

/** Número de peixes vivos estimado */
export function calcPeixesVivos(povoados: number, sobrevivenciaPct: number): number {
  return Math.round(povoados * (sobrevivenciaPct / 100))
}

/** Ganho médio diário (g/dia) */
export function calcGanhoMedioDiario(pesoFinalG: number, pesoInicialG: number, dias: number): number {
  if (dias <= 0) return 0
  return (pesoFinalG - pesoInicialG) / dias
}
