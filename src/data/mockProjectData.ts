import type { DadosGeraisProjeto, Viveiro, ProximoPasso } from '@/types'

export const dadosGeraisProjeto: DadosGeraisProjeto = {
  nomeProjeto: 'Fazenda Santa Esperança',
  produtor: 'João Produtor',
  perfilUsuario: 'Produtor Rural',
  especie: 'Tilápia',
  sistema: 'Viveiros Escavados',
  regiao: 'Oeste do PR',
  ultimaAtualizacao: '20/05/2025',
  areaTotalHa: 85,
  areaLaminaDaguaHa: 45,
  numeroViveiros: 12,
  volumeAguaM3: 675000,
  capacidadeInstaladaTonAno: 1500,
  producaoAnualEstimadaTon: 1200,
  cicloProdutivoMeses: 7,
  inicioOperacaoMes: 8,
}

export const viveiros: Viveiro[] = Array.from({ length: 12 }).map((_, i) => {
  const n = i + 1
  const areaHa = 3.75
  const profundidade = 1.5
  const status: Viveiro['status'] =
    n <= 8 ? 'ativo' : n <= 10 ? 'preparacao' : n === 11 ? 'vazio' : 'manutencao'
  return {
    id: `V${String(n).padStart(2, '0')}`,
    nome: `Viveiro ${String(n).padStart(2, '0')}`,
    areaHa,
    profundidadeMediaM: profundidade,
    volumeM3: Math.round(areaHa * 10000 * profundidade),
    tipo: 'Escavado',
    status,
    loteAtual: n <= 8 ? `L-2025-${String(n).padStart(2, '0')}` : undefined,
  }
})

export const proximosPassos: ProximoPasso[] = [
  {
    ordem: 1,
    titulo: 'Regularizar licenciamento ambiental',
    descricao: 'Iniciar o processo de LP e LI junto ao IAT.',
    status: 'pendente',
  },
  {
    ordem: 2,
    titulo: 'Definir sistema produtivo e layout',
    descricao: 'Escolha final dos viveiros e equipamentos.',
    status: 'pendente',
  },
  {
    ordem: 3,
    titulo: 'Iniciar obras de implantação',
    descricao: 'Terraplanagem e construção dos viveiros.',
    status: 'aguardando',
  },
  {
    ordem: 4,
    titulo: 'Contratar e treinar equipe técnica',
    descricao: 'Estruturar a equipe operacional da fazenda.',
    status: 'aguardando',
  },
]
