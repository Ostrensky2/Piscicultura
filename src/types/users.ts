export type PerfilUsuario =
  | 'Administrador'
  | 'Consultor'
  | 'Produtor'
  | 'Técnico de campo'
  | 'Investidor'

export interface Usuario {
  id: string
  nome: string
  email: string
  perfil: PerfilUsuario
  permissoes: string
  ativo: boolean
}

export interface ModeloPlanilha {
  id: string
  arquivo: string
  nome: string
  descricao: string
  colunasObrigatorias: string[]
  status: 'disponivel' | 'pendente' | 'importada'
}

export interface ParametroTecnico {
  id: string
  grupo: string
  rotulo: string
  valor: number
  unidade: string
}
