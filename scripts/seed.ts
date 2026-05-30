/**
 * Seed do Supabase a partir dos dados mock (fonte única de verdade).
 * Uso: definir a env SUPABASE_DB_URL com a connection string do projeto e rodar:
 *   npx tsx scripts/seed.ts
 * A connection string (com a senha) NUNCA fica neste arquivo — vem da env.
 */
import pg from 'pg'

import { dadosGeraisProjeto, viveiros, proximosPassos } from '../src/data/mockProjectData'
import {
  lotes, fasesProdutivas, curvaCrescimento, eventosCalendario,
  biometrias, mortalidade, despescas,
} from '../src/data/mockProductionData'
import {
  indicadores, cenarios, fluxoCaixaAcumulado, fluxoCaixaMensal,
  composicaoCustos, variaveisSensibilidade,
} from '../src/data/mockFinancialData'
import { racoes, tabelaArracoamento, estoqueRacao, desempenhoLotes } from '../src/data/mockNutritionData'
import { parametrosAgua, aeradores } from '../src/data/mockWaterData'
import { licencas, condicionantes, documentos } from '../src/data/mockLicensesData'
import { pops } from '../src/data/mockPopsData'
import { alertas } from '../src/data/mockAlertsData'
import { registrosDiarios } from '../src/data/mockActivityLog'
import { modelosPlanilhas, parametrosTecnicos, usuarios, perfisPermissoes } from '../src/data/mockConfigData'

const connectionString = process.env.SUPABASE_DB_URL
if (!connectionString) {
  console.error('Defina SUPABASE_DB_URL (connection string do Postgres) antes de rodar.')
  process.exit(1)
}

// tabela -> linhas (objetos únicos viram lista de 1)
const datasets: [string, Record<string, unknown>[]][] = [
  ['dadosProjeto', [dadosGeraisProjeto as Record<string, unknown>]],
  ['viveiros', viveiros as unknown as Record<string, unknown>[]],
  ['proximosPassos', proximosPassos as unknown as Record<string, unknown>[]],
  ['lotes', lotes as unknown as Record<string, unknown>[]],
  ['fasesProdutivas', fasesProdutivas as unknown as Record<string, unknown>[]],
  ['curvaCrescimento', curvaCrescimento as unknown as Record<string, unknown>[]],
  ['eventosCalendario', eventosCalendario as unknown as Record<string, unknown>[]],
  ['biometrias', biometrias as unknown as Record<string, unknown>[]],
  ['mortalidade', mortalidade as unknown as Record<string, unknown>[]],
  ['despescas', despescas as unknown as Record<string, unknown>[]],
  ['indicadores', [indicadores as Record<string, unknown>]],
  ['cenarios', Object.values(cenarios) as unknown as Record<string, unknown>[]],
  ['fluxoCaixaAcumulado', fluxoCaixaAcumulado as unknown as Record<string, unknown>[]],
  ['fluxoCaixaMensal', fluxoCaixaMensal as unknown as Record<string, unknown>[]],
  ['composicaoCustos', composicaoCustos as unknown as Record<string, unknown>[]],
  ['variaveisSensibilidade', variaveisSensibilidade as unknown as Record<string, unknown>[]],
  ['racoes', racoes as unknown as Record<string, unknown>[]],
  ['tabelaArracoamento', tabelaArracoamento as unknown as Record<string, unknown>[]],
  ['estoqueRacao', estoqueRacao as unknown as Record<string, unknown>[]],
  ['desempenhoLotes', desempenhoLotes as unknown as Record<string, unknown>[]],
  ['parametrosAgua', parametrosAgua as unknown as Record<string, unknown>[]],
  ['aeradores', aeradores as unknown as Record<string, unknown>[]],
  ['licencas', licencas as unknown as Record<string, unknown>[]],
  ['condicionantes', condicionantes as unknown as Record<string, unknown>[]],
  ['documentos', documentos as unknown as Record<string, unknown>[]],
  ['pops', pops as unknown as Record<string, unknown>[]],
  ['alertas', alertas as unknown as Record<string, unknown>[]],
  ['registrosDiarios', registrosDiarios as unknown as Record<string, unknown>[]],
  ['modelosPlanilhas', modelosPlanilhas as unknown as Record<string, unknown>[]],
  ['parametrosTecnicos', parametrosTecnicos as unknown as Record<string, unknown>[]],
  ['usuarios', usuarios as unknown as Record<string, unknown>[]],
  ['perfisPermissoes', perfisPermissoes as unknown as Record<string, unknown>[]],
]

async function inserir(client: pg.Client, tabela: string, linhas: Record<string, unknown>[]) {
  if (linhas.length === 0) return 0
  await client.query(`truncate table "${tabela}" restart identity cascade`)
  for (const linha of linhas) {
    const cols = Object.keys(linha).filter((c) => linha[c] !== undefined)
    const valores = cols.map((c) => {
      const v = linha[c]
      return v !== null && typeof v === 'object' ? JSON.stringify(v) : v
    })
    const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ')
    const colSql = cols.map((c) => `"${c}"`).join(', ')
    await client.query(`insert into "${tabela}" (${colSql}) values (${placeholders})`, valores)
  }
  return linhas.length
}

async function main() {
  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })
  await client.connect()
  try {
    for (const [tabela, linhas] of datasets) {
      const n = await inserir(client, tabela, linhas)
      console.log(`${tabela}: ${n} linha(s)`)
    }
    console.log('Seed concluído.')
  } finally {
    await client.end()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
