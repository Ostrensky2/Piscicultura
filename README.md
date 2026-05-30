# PISCIS Expertise

Plataforma desktop-first (React + TypeScript) para **gestão e viabilidade de
piscicultura de tilápia** em escala comercial. Reúne, num só lugar:

- **Apresentação executiva** para investidores (viabilidade, retorno, payback, riscos);
- **Planejamento** técnico, produtivo, operacional e financeiro;
- **Acompanhamento da operação** da fazenda (água, arraçoamento, biometria, mortalidade, despesca);
- **Base de conhecimento** (manuais, documentos, suporte);
- **Configurações** prontas para receber planilhas e dados reais.

Dois modos de uso: **Modo Investidor** (foco em viabilidade e retorno) e
**Modo Gestão da Fazenda** (foco na operação).

## Stack

- **Vite** + **React 18** + **TypeScript** (strict)
- **Tailwind CSS** com paleta de cores própria do projeto
- **React Router** para navegação
- **Recharts** para gráficos
- **lucide-react** para ícones

## Como rodar (localhost)

```bash
npm install      # instala as dependências
npm run dev      # inicia o servidor de desenvolvimento (http://localhost:5173)
```

### Variáveis de ambiente (Supabase)

Copie `.env.example` para `.env` e preencha com os dados do seu projeto Supabase:

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Use apenas a **URL** e a **chave publicável (anon)** — nunca a senha do banco.
O `.env` é ignorado pelo git. No Vercel, defina as duas variáveis em
*Project Settings → Environment Variables*. Sem essas variáveis o app continua
funcionando em modo mock.

Outros scripts:

```bash
npm run build     # build de produção (em dist/)
npm run preview   # serve o build localmente
npm run typecheck # checagem de tipos sem emitir arquivos
```

## Estrutura do projeto

```
src/
  components/   componentes reutilizáveis (ui, cards, charts, tables, forms, layout)
  config/       configuração de navegação (sidebar)
  data/         dados MOCK por domínio (mock*.ts)
  lib/          utilitários (cn)
  pages/        páginas por módulo (planejamento, producao, manejo, nutricao,
                financeiro, sustentabilidade, base, configuracoes)
  services/     dataService + cálculos (zootécnicos, financeiros, arraçoamento)
  types/        tipos TypeScript por domínio
configuracoes/  conteúdo externo: modelos de planilha, dados reais, manuais,
                documentos e parâmetros (ver configuracoes/README.md)
```

## Camada de dados: do mock ao real

Todas as telas leem dados **exclusivamente** pelo
[`src/services/dataService.ts`](src/services/dataService.ts) — nenhuma página
importa `src/data` diretamente. Isso torna a troca da fonte de dados um ponto
único:

1. Hoje: `FONTE_DADOS = 'mock'` (dados demonstrativos em `src/data/`).
2. Próxima fase: preencher os modelos de `configuracoes/modelos_planilhas/`,
   gerar os JSON em `configuracoes/dados/` e apontar os getters do `dataService`
   para eles (`FONTE_DADOS = 'json'`).
3. Futuro: API REST ou Supabase (`'api'` / `'supabase'`), trocando apenas a
   implementação dos getters. A interface não muda.

## Roadmap de deploy

- **Localhost + GitHub** desde o início.
- **Vercel** quando houver uma versão navegável (config em `vercel.json`).
- **Supabase** numa fase posterior, quando a estrutura de dados estiver
  consolidada.
