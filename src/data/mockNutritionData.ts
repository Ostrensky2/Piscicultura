import type { Racao, LinhaArracoamento, ItemEstoqueRacao, DesempenhoLote } from '@/types'

export const racoes: Racao[] = [
  { id: 'r1', nomeComercial: 'AquaStart 45', fabricante: 'NutriPeixe', proteinaBrutaPct: 45, granulometriaMm: '0,8–1,2', energiaKcalKg: 3200, precoKg: 6.4, faseIndicada: 'Alevinagem', conversaoEsperada: 0.9, observacoes: 'Farelado/triturado, alta digestibilidade' },
  { id: 'r2', nomeComercial: 'AquaGrow 40', fabricante: 'NutriPeixe', proteinaBrutaPct: 40, granulometriaMm: '2–3', energiaKcalKg: 3100, precoKg: 5.1, faseIndicada: 'Recria', conversaoEsperada: 1.2 },
  { id: 'r3', nomeComercial: 'AquaGrow 36', fabricante: 'NutriPeixe', proteinaBrutaPct: 36, granulometriaMm: '4–6', energiaKcalKg: 3000, precoKg: 4.6, faseIndicada: 'Engorda inicial', conversaoEsperada: 1.4 },
  { id: 'r4', nomeComercial: 'AquaFinish 32', fabricante: 'NutriPeixe', proteinaBrutaPct: 32, granulometriaMm: '6–8', energiaKcalKg: 2950, precoKg: 4.2, faseIndicada: 'Engorda final', conversaoEsperada: 1.7, observacoes: 'Extrusada flutuante' },
  { id: 'r5', nomeComercial: 'TilápiaMax 28', fabricante: 'ProRural', proteinaBrutaPct: 28, granulometriaMm: '8–10', energiaKcalKg: 2900, precoKg: 3.9, faseIndicada: 'Engorda final', conversaoEsperada: 1.85, observacoes: 'Alternativa econômica' },
]

export const tabelaArracoamento: LinhaArracoamento[] = [
  { lote: 'L-2025-01', viveiro: 'V01', pesoMedioG: 620, biomassaEstimadaKg: 34_875, taxaArracoamentoPct: 1.5, racaoDiariaKg: 523, tratosPorDia: 4, tipoRacao: 'AquaFinish 32', granulometriaMm: '6–8', proteinaBrutaPct: 32, custoDiario: 2197, custoAcumulado: 162_500 },
  { lote: 'L-2025-02', viveiro: 'V02', pesoMedioG: 540, biomassaEstimadaKg: 30_375, taxaArracoamentoPct: 1.7, racaoDiariaKg: 516, tratosPorDia: 4, tipoRacao: 'AquaFinish 32', granulometriaMm: '6–8', proteinaBrutaPct: 32, custoDiario: 2169, custoAcumulado: 138_900 },
  { lote: 'L-2025-03', viveiro: 'V03', pesoMedioG: 430, biomassaEstimadaKg: 24_188, taxaArracoamentoPct: 2.0, racaoDiariaKg: 484, tratosPorDia: 4, tipoRacao: 'AquaGrow 36', granulometriaMm: '4–6', proteinaBrutaPct: 36, custoDiario: 2225, custoAcumulado: 101_200 },
  { lote: 'L-2025-04', viveiro: 'V04', pesoMedioG: 360, biomassaEstimadaKg: 20_250, taxaArracoamentoPct: 2.2, racaoDiariaKg: 446, tratosPorDia: 4, tipoRacao: 'AquaGrow 36', granulometriaMm: '4–6', proteinaBrutaPct: 36, custoDiario: 2050, custoAcumulado: 88_700 },
  { lote: 'L-2025-05', viveiro: 'V05', pesoMedioG: 240, biomassaEstimadaKg: 13_500, taxaArracoamentoPct: 2.8, racaoDiariaKg: 378, tratosPorDia: 5, tipoRacao: 'AquaGrow 40', granulometriaMm: '2–3', proteinaBrutaPct: 40, custoDiario: 1928, custoAcumulado: 61_400 },
  { lote: 'L-2025-06', viveiro: 'V06', pesoMedioG: 120, biomassaEstimadaKg: 6_750, taxaArracoamentoPct: 3.5, racaoDiariaKg: 236, tratosPorDia: 5, tipoRacao: 'AquaGrow 40', granulometriaMm: '2–3', proteinaBrutaPct: 40, custoDiario: 1204, custoAcumulado: 34_800 },
  { lote: 'L-2025-07', viveiro: 'V07', pesoMedioG: 70, biomassaEstimadaKg: 3_938, taxaArracoamentoPct: 4.5, racaoDiariaKg: 177, tratosPorDia: 6, tipoRacao: 'AquaStart 45', granulometriaMm: '0,8–1,2', proteinaBrutaPct: 45, custoDiario: 1133, custoAcumulado: 18_900 },
  { lote: 'L-2025-08', viveiro: 'V08', pesoMedioG: 18, biomassaEstimadaKg: 1_080, taxaArracoamentoPct: 6.0, racaoDiariaKg: 65, tratosPorDia: 6, tipoRacao: 'AquaStart 45', granulometriaMm: '0,8–1,2', proteinaBrutaPct: 45, custoDiario: 416, custoAcumulado: 5_200 },
]

export const estoqueRacao: ItemEstoqueRacao[] = [
  { id: 's1', tipoRacao: 'AquaFinish 32', fabricante: 'NutriPeixe', estoqueAtualKg: 7_200, consumoDiarioKg: 1_039, diasAutonomia: 7, pedidoMinimoKg: 20_000, dataRuptura: '2025-06-04', fornecedor: 'NutriPeixe', proximaEntrega: '2025-06-05', status: 'critico' },
  { id: 's2', tipoRacao: 'AquaGrow 36', fabricante: 'NutriPeixe', estoqueAtualKg: 18_400, consumoDiarioKg: 930, diasAutonomia: 20, pedidoMinimoKg: 15_000, dataRuptura: '2025-06-17', fornecedor: 'NutriPeixe', proximaEntrega: '2025-06-12', status: 'ok' },
  { id: 's3', tipoRacao: 'AquaGrow 40', fabricante: 'NutriPeixe', estoqueAtualKg: 9_100, consumoDiarioKg: 614, diasAutonomia: 15, pedidoMinimoKg: 12_000, dataRuptura: '2025-06-12', fornecedor: 'NutriPeixe', status: 'baixo' },
  { id: 's4', tipoRacao: 'AquaStart 45', fabricante: 'NutriPeixe', estoqueAtualKg: 4_300, consumoDiarioKg: 242, diasAutonomia: 18, pedidoMinimoKg: 6_000, dataRuptura: '2025-06-15', fornecedor: 'NutriPeixe', status: 'ok' },
]

export const desempenhoLotes: DesempenhoLote[] = [
  { lote: 'L-2025-01', viveiro: 'V01', conversaoAlimentar: 1.62, ganhoPesoG: 620, sobrevivenciaPct: 95, biomassaFinalKg: 34_875, custoAlimentarKg: 7.45, eficienciaAlimentarPct: 61.7 },
  { lote: 'L-2025-02', viveiro: 'V02', conversaoAlimentar: 1.58, ganhoPesoG: 540, sobrevivenciaPct: 96, biomassaFinalKg: 30_375, custoAlimentarKg: 7.21, eficienciaAlimentarPct: 63.3 },
  { lote: 'L-2025-03', viveiro: 'V03', conversaoAlimentar: 1.48, ganhoPesoG: 430, sobrevivenciaPct: 97, biomassaFinalKg: 24_188, custoAlimentarKg: 6.95, eficienciaAlimentarPct: 67.6 },
  { lote: 'L-2025-04', viveiro: 'V04', conversaoAlimentar: 1.71, ganhoPesoG: 360, sobrevivenciaPct: 93, biomassaFinalKg: 20_250, custoAlimentarKg: 7.92, eficienciaAlimentarPct: 58.5 },
]
