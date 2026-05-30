import type { Status } from './index'

export interface ParametroAgua {
  id: string
  nome: string
  unidade: string
  valorAtual: number
  faixaIdealMin: number
  faixaIdealMax: number
  status: Status
  tendencia: 'subindo' | 'estavel' | 'caindo'
  recomendacao: string
  historico: { data: string; valor: number }[]
}

export interface Aerador {
  viveiro: string
  quantidade: number
  potenciaHp: number
  hpPorHa: number
  horasUsoDia: number
  consumoKwhDia: number
  riscoHipoxia: Status
  recomendacao: string
}

export interface FaixaQualidadeAgua {
  parametro: string
  unidade: string
  min: number
  max: number
  critico: string
}
