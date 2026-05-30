export type StatusLote = 'planejado' | 'em_andamento' | 'atrasado' | 'concluido'

export interface Lote {
  id: string
  codigo: string
  viveiro: string
  dataPovoamento: string
  dataPrevistaDespesca: string
  faseAtual: string
  numeroPeixes: number
  pesoMedioG: number
  status: StatusLote
  progressoPct: number
}

export interface FaseProdutiva {
  fase: string
  duracaoDias: number
  pesoInicialG: number
  pesoFinalG: number
  densidadePeixesM3: number
  biomassaEsperadaKg: number
  sobrevivenciaPct: number
  consumoRacaoKg: number
  conversaoAlimentar: number
  manejos: string
  riscos: string
}

export interface PontoCurva {
  semana: number
  dia: number
  pesoEsperadoG: number
  pesoObservadoG?: number
  biomassaKg: number
  ganhoMedioDiarioG: number
}

export interface EventoCalendario {
  id: string
  data: string
  tipo: string
  titulo: string
  viveiro?: string
  lote?: string
  status: 'previsto' | 'realizado' | 'atrasado'
}

export interface RegistroBiometria {
  id: string
  data: string
  viveiro: string
  lote: string
  numeroAmostrados: number
  pesoMedioG: number
  comprimentoMedioCm?: number
  biomassaEstimadaKg: number
  ganhoPesoG: number
  conversaoEstimada: number
  observacoes?: string
}

export interface RegistroMortalidade {
  id: string
  data: string
  viveiro: string
  lote: string
  peixesMortos: number
  mortalidadeAcumuladaPct: number
  causaProvavel: string
  acaoCorretiva: string
  observacoes?: string
}

export interface RegistroDespesca {
  id: string
  viveiro: string
  lote: string
  dataPrevista: string
  dataRealizada?: string
  biomassaEstimadaKg: number
  biomassaDespescadaKg?: number
  pesoMedioFinalG: number
  destino: string
  receitaEstimada: number
  receitaRealizada?: number
}
