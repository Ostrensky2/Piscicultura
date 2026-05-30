/**
 * dataService — camada central de acesso a dados do PISCIS Expertise.
 *
 * HOJE: retorna dados mockados (src/data/*).
 * FUTURO: esta é a única camada que precisa mudar para que o app passe a
 * ler dados reais. Basta trocar a implementação das funções abaixo por:
 *   - leitura dos JSON gerados a partir das planilhas (configuracoes/dados/*.json);
 *   - chamadas a uma API REST;
 *   - consultas ao Supabase / banco de dados.
 *
 * Os componentes e páginas NUNCA importam src/data diretamente — sempre
 * passam por aqui. Assim a fonte de dados pode ser trocada sem tocar na UI.
 */
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

/**
 * Origem de dados ativa. No futuro: 'json' | 'api' | 'supabase'.
 * Mantido aqui para deixar explícita a camada de importação futura.
 */
export const FONTE_DADOS: 'mock' | 'json' | 'api' | 'supabase' = 'mock'

export const dataService = {
  // Projeto
  getDadosProjeto: () => dadosGeraisProjeto,
  getViveiros: () => viveiros,
  getProximosPassos: () => proximosPassos,

  // Produção
  getLotes: () => lotes,
  getFasesProdutivas: () => fasesProdutivas,
  getCurvaCrescimento: () => curvaCrescimento,
  getEventosCalendario: () => eventosCalendario,
  getBiometrias: () => biometrias,
  getMortalidade: () => mortalidade,
  getDespescas: () => despescas,

  // Financeiro
  getIndicadores: () => indicadores,
  getCenarios: () => cenarios,
  getFluxoCaixaAcumulado: () => fluxoCaixaAcumulado,
  getFluxoCaixaMensal: () => fluxoCaixaMensal,
  getComposicaoCustos: () => composicaoCustos,
  getVariaveisSensibilidade: () => variaveisSensibilidade,

  // Nutrição
  getRacoes: () => racoes,
  getTabelaArracoamento: () => tabelaArracoamento,
  getEstoqueRacao: () => estoqueRacao,
  getDesempenhoLotes: () => desempenhoLotes,

  // Água / aeração
  getParametrosAgua: () => parametrosAgua,
  getAeradores: () => aeradores,

  // Sustentabilidade
  getLicencas: () => licencas,
  getCondicionantes: () => condicionantes,
  getDocumentos: () => documentos,
  getPops: () => pops,

  // Operação
  getAlertas: () => alertas,
  getRegistrosDiarios: () => registrosDiarios,

  // Configurações
  getModelosPlanilhas: () => modelosPlanilhas,
  getParametrosTecnicos: () => parametrosTecnicos,
  getUsuarios: () => usuarios,
  getPerfisPermissoes: () => perfisPermissoes,
}

export type DataService = typeof dataService
