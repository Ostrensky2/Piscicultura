/**
 * dataService — camada central de acesso a dados do PISCIS Expertise.
 *
 * Estratégia: um cache em memória é inicializado com os dados mock (fallback)
 * e, quando FONTE_DADOS === 'supabase', é sobrescrito por `carregarDados()`
 * (chamado uma vez na inicialização do app). Os getters permanecem SÍNCRONOS,
 * lendo do cache — assim nenhuma página precisa mudar.
 *
 * As páginas NUNCA importam src/data diretamente — sempre passam por aqui.
 */
import { supabase } from '@/lib/supabaseClient'
import type { Cenario } from '@/types'

import { dadosGeraisProjeto, viveiros, proximosPassos } from '@/data/mockProjectData'
import { lotes, fasesProdutivas, curvaCrescimento, eventosCalendario, biometrias, mortalidade, despescas } from '@/data/mockProductionData'
import { indicadores, cenarios, fluxoCaixaAcumulado, fluxoCaixaMensal, composicaoCustos, variaveisSensibilidade } from '@/data/mockFinancialData'
import { racoes, tabelaArracoamento, estoqueRacao, desempenhoLotes } from '@/data/mockNutritionData'
import { parametrosAgua, aeradores } from '@/data/mockWaterData'
import { licencas, condicionantes, documentos } from '@/data/mockLicensesData'
import { pops } from '@/data/mockPopsData'
import { alertas } from '@/data/mockAlertsData'
import { registrosDiarios } from '@/data/mockActivityLog'
import { modelosPlanilhas, parametrosTecnicos, usuarios, perfisPermissoes } from '@/data/mockConfigData'

/** Origem de dados ativa. 'mock' usa src/data; 'supabase' lê do banco. */
export const FONTE_DADOS: 'mock' | 'json' | 'api' | 'supabase' = 'supabase'

/** Cache em memória. Inicia com os dados mock e é sobrescrito por carregarDados(). */
const cache = {
  dadosProjeto: dadosGeraisProjeto,
  viveiros,
  proximosPassos,
  lotes,
  fasesProdutivas,
  curvaCrescimento,
  eventosCalendario,
  biometrias,
  mortalidade,
  despescas,
  indicadores,
  cenarios,
  fluxoCaixaAcumulado,
  fluxoCaixaMensal,
  composicaoCustos,
  variaveisSensibilidade,
  racoes,
  tabelaArracoamento,
  estoqueRacao,
  desempenhoLotes,
  parametrosAgua,
  aeradores,
  licencas,
  condicionantes,
  documentos,
  pops,
  alertas,
  registrosDiarios,
  modelosPlanilhas,
  parametrosTecnicos,
  usuarios,
  perfisPermissoes,
}

// Tabelas que retornam listas: [chave no cache, nome da tabela, coluna de ordenação]
const TABELAS_LISTA: [keyof typeof cache, string, string][] = [
  ['viveiros', 'viveiros', 'id'],
  ['proximosPassos', 'proximosPassos', '_ord'],
  ['lotes', 'lotes', 'id'],
  ['fasesProdutivas', 'fasesProdutivas', '_ord'],
  ['curvaCrescimento', 'curvaCrescimento', '_ord'],
  ['eventosCalendario', 'eventosCalendario', 'id'],
  ['biometrias', 'biometrias', 'id'],
  ['mortalidade', 'mortalidade', 'id'],
  ['despescas', 'despescas', 'id'],
  ['fluxoCaixaAcumulado', 'fluxoCaixaAcumulado', '_ord'],
  ['fluxoCaixaMensal', 'fluxoCaixaMensal', '_ord'],
  ['composicaoCustos', 'composicaoCustos', '_ord'],
  ['variaveisSensibilidade', 'variaveisSensibilidade', 'id'],
  ['racoes', 'racoes', 'id'],
  ['tabelaArracoamento', 'tabelaArracoamento', '_ord'],
  ['estoqueRacao', 'estoqueRacao', 'id'],
  ['desempenhoLotes', 'desempenhoLotes', '_ord'],
  ['parametrosAgua', 'parametrosAgua', 'id'],
  ['aeradores', 'aeradores', '_ord'],
  ['licencas', 'licencas', 'id'],
  ['condicionantes', 'condicionantes', 'id'],
  ['documentos', 'documentos', 'id'],
  ['pops', 'pops', 'id'],
  ['alertas', 'alertas', 'id'],
  ['registrosDiarios', 'registrosDiarios', 'id'],
  ['modelosPlanilhas', 'modelosPlanilhas', 'id'],
  ['parametrosTecnicos', 'parametrosTecnicos', 'id'],
  ['usuarios', 'usuarios', 'id'],
  ['perfisPermissoes', 'perfisPermissoes', '_ord'],
]

let carregado = false

/**
 * Carrega todos os dados do Supabase para o cache. Idempotente.
 * Em caso de erro/ausência de Supabase, mantém os dados mock no cache.
 */
export async function carregarDados(): Promise<void> {
  if (carregado) return
  if (FONTE_DADOS !== 'supabase' || !supabase) {
    carregado = true
    return
  }
  const sb = supabase

  await Promise.all(
    TABELAS_LISTA.map(async ([chave, tabela, ordem]) => {
      const { data, error } = await sb.from(tabela).select('*').order(ordem)
      if (!error && data) {
        ;(cache as Record<string, unknown>)[chave as string] = data
      }
    }),
  )

  // Singletons (uma linha)
  const [proj, ind] = await Promise.all([
    sb.from('dadosProjeto').select('*').limit(1),
    sb.from('indicadores').select('*').limit(1),
  ])
  if (!proj.error && proj.data?.[0]) cache.dadosProjeto = proj.data[0]
  if (!ind.error && ind.data?.[0]) cache.indicadores = ind.data[0]

  // Cenários: objeto chaveado por tipo
  const cen = await sb.from('cenarios').select('*')
  if (!cen.error && cen.data) {
    cache.cenarios = Object.fromEntries(
      cen.data.map((c) => [(c as Cenario).tipo, c as Cenario]),
    ) as typeof cache.cenarios
  }

  carregado = true
}

export const dataService = {
  // Projeto
  getDadosProjeto: () => cache.dadosProjeto,
  getViveiros: () => cache.viveiros,
  getProximosPassos: () => cache.proximosPassos,

  // Produção
  getLotes: () => cache.lotes,
  getFasesProdutivas: () => cache.fasesProdutivas,
  getCurvaCrescimento: () => cache.curvaCrescimento,
  getEventosCalendario: () => cache.eventosCalendario,
  getBiometrias: () => cache.biometrias,
  getMortalidade: () => cache.mortalidade,
  getDespescas: () => cache.despescas,

  // Financeiro
  getIndicadores: () => cache.indicadores,
  getCenarios: () => cache.cenarios,
  getFluxoCaixaAcumulado: () => cache.fluxoCaixaAcumulado,
  getFluxoCaixaMensal: () => cache.fluxoCaixaMensal,
  getComposicaoCustos: () => cache.composicaoCustos,
  getVariaveisSensibilidade: () => cache.variaveisSensibilidade,

  // Nutrição
  getRacoes: () => cache.racoes,
  getTabelaArracoamento: () => cache.tabelaArracoamento,
  getEstoqueRacao: () => cache.estoqueRacao,
  getDesempenhoLotes: () => cache.desempenhoLotes,

  // Água / aeração
  getParametrosAgua: () => cache.parametrosAgua,
  getAeradores: () => cache.aeradores,

  // Sustentabilidade
  getLicencas: () => cache.licencas,
  getCondicionantes: () => cache.condicionantes,
  getDocumentos: () => cache.documentos,
  getPops: () => cache.pops,

  // Operação
  getAlertas: () => cache.alertas,
  getRegistrosDiarios: () => cache.registrosDiarios,

  // Configurações
  getModelosPlanilhas: () => cache.modelosPlanilhas,
  getParametrosTecnicos: () => cache.parametrosTecnicos,
  getUsuarios: () => cache.usuarios,
  getPerfisPermissoes: () => cache.perfisPermissoes,
}

export type DataService = typeof dataService
