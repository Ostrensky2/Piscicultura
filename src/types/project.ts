export interface DadosGeraisProjeto {
  nomeProjeto: string
  produtor: string
  perfilUsuario: string
  especie: string
  sistema: string
  regiao: string
  ultimaAtualizacao: string
  areaTotalHa: number
  areaLaminaDaguaHa: number
  numeroViveiros: number
  volumeAguaM3: number
  capacidadeInstaladaTonAno: number
  producaoAnualEstimadaTon: number
  cicloProdutivoMeses: number
  inicioOperacaoMes: number
}

export interface Viveiro {
  id: string
  nome: string
  areaHa: number
  profundidadeMediaM: number
  volumeM3: number
  tipo: string
  status: 'ativo' | 'vazio' | 'manutencao' | 'preparacao'
  loteAtual?: string
}

export interface KPI {
  id: string
  rotulo: string
  valor: string
  descricao?: string
  icone?: string
  cor?: string
}

export interface ProximoPasso {
  ordem: number
  titulo: string
  descricao: string
  status: 'pendente' | 'aguardando' | 'em_andamento' | 'concluido'
}
