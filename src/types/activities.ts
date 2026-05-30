export type TipoAtividade =
  | 'Povoamento'
  | 'Arraçoamento'
  | 'Biometria'
  | 'Qualidade da água'
  | 'Limpeza'
  | 'Manutenção'
  | 'Mortalidade'
  | 'Aplicação de corretivos'
  | 'Uso de aeradores'
  | 'Despesca'
  | 'Recebimento de ração'
  | 'Visita técnica'
  | 'Ocorrência sanitária'

export type StatusAtividade = 'concluida' | 'pendente' | 'em_andamento'

export interface RegistroDiario {
  id: string
  data: string
  horario: string
  responsavel: string
  viveiro: string
  lote: string
  tipo: TipoAtividade
  atividade: string
  observacoes?: string
  problemas?: string
  medidasCorretivas?: string
  status: StatusAtividade
}

export interface Alerta {
  id: string
  titulo: string
  severidade: 'info' | 'atencao' | 'critico'
  modulo?: string
}
