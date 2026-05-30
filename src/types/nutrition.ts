export interface Racao {
  id: string
  nomeComercial: string
  fabricante: string
  proteinaBrutaPct: number
  granulometriaMm: string
  energiaKcalKg?: number
  precoKg: number
  faseIndicada: string
  conversaoEsperada: number
  observacoes?: string
}

export interface LinhaArracoamento {
  lote: string
  viveiro: string
  pesoMedioG: number
  biomassaEstimadaKg: number
  taxaArracoamentoPct: number
  racaoDiariaKg: number
  tratosPorDia: number
  tipoRacao: string
  granulometriaMm: string
  proteinaBrutaPct: number
  custoDiario: number
  custoAcumulado: number
}

export interface ItemEstoqueRacao {
  id: string
  tipoRacao: string
  fabricante: string
  estoqueAtualKg: number
  consumoDiarioKg: number
  diasAutonomia: number
  pedidoMinimoKg: number
  dataRuptura: string
  fornecedor: string
  proximaEntrega?: string
  status: 'ok' | 'baixo' | 'critico'
}

export interface DesempenhoLote {
  lote: string
  viveiro: string
  conversaoAlimentar: number
  ganhoPesoG: number
  sobrevivenciaPct: number
  biomassaFinalKg: number
  custoAlimentarKg: number
  eficienciaAlimentarPct: number
}
