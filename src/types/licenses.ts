export type StatusDocumento = 'valido' | 'vencendo' | 'vencido' | 'pendente'

export interface Licenca {
  id: string
  nome: string
  orgao: string
  numero?: string
  emissao?: string
  validade?: string
  status: StatusDocumento
  diasParaVencer?: number
}

export interface Condicionante {
  id: string
  descricao: string
  orgao: string
  prazo: string
  status: StatusDocumento
  evidencia?: string
  responsavel: string
  observacoes?: string
}

export interface POP {
  id: string
  codigo: string
  titulo: string
  objetivo: string
  responsavel: string
  frequencia: string
  materiais: string[]
  procedimento: string[]
  registros: string[]
  pontosCriticos: string[]
  medidasCorretivas: string[]
}

export interface Documento {
  id: string
  nome: string
  categoria: string
  tipo: string
  tamanho?: string
  data?: string
  disponivel: boolean
}
