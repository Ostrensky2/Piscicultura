# configuracoes/

Esta pasta concentra todo o conteúdo "externo" que alimenta o PISCIS Expertise.
Hoje o app roda com **dados demonstrativos (mock)**; quando os dados reais
estiverem prontos, eles entram aqui e o `src/services/dataService.ts` passa a
lê-los — **sem precisar mexer na interface**.

## Estrutura

| Pasta | Conteúdo | Formato |
| --- | --- | --- |
| `modelos_planilhas/` | Modelos padronizados para coleta de dados | `.xlsx` (14 modelos) |
| `dados/` | Dados reais já preenchidos/exportados das planilhas | `.json` (14 arquivos) |
| `manuais/` | Manuais técnicos e operacionais | `.pdf` |
| `documentos/` | Licenças, contratos, relatórios, mapas | `.pdf` / `.xlsx` |
| `parametros/` | Parâmetros técnicos e premissas de cálculo | `.json` (4 arquivos) |

## modelos_planilhas/ (14)

1. `modelo_dados_gerais_projeto.xlsx`
2. `modelo_viveiros.xlsx`
3. `modelo_lotes.xlsx`
4. `modelo_fases_produtivas.xlsx`
5. `modelo_curva_crescimento.xlsx`
6. `modelo_qualidade_agua.xlsx`
7. `modelo_arracoamento.xlsx`
8. `modelo_racoes.xlsx`
9. `modelo_estoque_racao.xlsx`
10. `modelo_financeiro.xlsx`
11. `modelo_fluxo_caixa.xlsx`
12. `modelo_licencas.xlsx`
13. `modelo_pops.xlsx`
14. `modelo_registro_diario.xlsx`

## dados/ (14)

Mesmo recorte dos modelos, em JSON, na ordem em que o `dataService` os consumirá:
`dados_gerais.json`, `viveiros.json`, `lotes.json`, `fases_produtivas.json`,
`curva_crescimento.json`, `qualidade_agua.json`, `arracoamento.json`,
`racoes.json`, `estoque_racao.json`, `financeiro.json`, `fluxo_caixa.json`,
`licencas.json`, `pops.json`, `registro_diario.json`.

## parametros/ (4)

- `qualidade_agua.json` — faixas ideais (temperatura, OD, pH, etc.)
- `zootecnia.json` — conversão alimentar alvo, sobrevivência, mortalidade máxima
- `financeiro.json` — TMA, preços padrão de ração e venda
- `unidades.json` — unidades e formatações padrão

## Como ligar os dados reais

1. Preencha os modelos em `modelos_planilhas/`.
2. Exporte/converta para JSON em `dados/`.
3. Em `src/services/dataService.ts`, altere `FONTE_DADOS` de `'mock'` para
   `'json'` (ou `'api'` / `'supabase'`) e ajuste os getters para ler destes
   arquivos. Nenhuma página precisa ser alterada.
