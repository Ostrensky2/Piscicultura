-- PISCIS Expertise — schema do banco (Supabase / Postgres)
-- Tabelas e colunas em camelCase (entre aspas) espelhando os tipos em src/types/*,
-- para mapeamento 1:1 com os objetos retornados pelo supabase-js (select *).
-- Campos aninhados (arrays/objetos) usam jsonb.
-- Reexecutável: dropa e recria tudo. NÃO contém segredos.

-- ============================ Projeto ============================
drop table if exists "dadosProjeto" cascade;
create table "dadosProjeto" (
  "_ord" bigint generated always as identity primary key,
  "nomeProjeto" text,
  "produtor" text,
  "perfilUsuario" text,
  "especie" text,
  "sistema" text,
  "regiao" text,
  "ultimaAtualizacao" text,
  "areaTotalHa" numeric,
  "areaLaminaDaguaHa" numeric,
  "numeroViveiros" integer,
  "volumeAguaM3" numeric,
  "capacidadeInstaladaTonAno" numeric,
  "producaoAnualEstimadaTon" numeric,
  "cicloProdutivoMeses" numeric,
  "inicioOperacaoMes" integer
);

drop table if exists "viveiros" cascade;
create table "viveiros" (
  "id" text primary key,
  "nome" text,
  "areaHa" numeric,
  "profundidadeMediaM" numeric,
  "volumeM3" numeric,
  "tipo" text,
  "status" text,
  "loteAtual" text
);

drop table if exists "proximosPassos" cascade;
create table "proximosPassos" (
  "_ord" bigint generated always as identity primary key,
  "ordem" integer,
  "titulo" text,
  "descricao" text,
  "status" text
);

-- ============================ Produção ============================
drop table if exists "lotes" cascade;
create table "lotes" (
  "id" text primary key,
  "codigo" text,
  "viveiro" text,
  "dataPovoamento" text,
  "dataPrevistaDespesca" text,
  "faseAtual" text,
  "numeroPeixes" integer,
  "pesoMedioG" numeric,
  "status" text,
  "progressoPct" numeric
);

drop table if exists "fasesProdutivas" cascade;
create table "fasesProdutivas" (
  "_ord" bigint generated always as identity primary key,
  "fase" text,
  "duracaoDias" integer,
  "pesoInicialG" numeric,
  "pesoFinalG" numeric,
  "densidadePeixesM3" numeric,
  "biomassaEsperadaKg" numeric,
  "sobrevivenciaPct" numeric,
  "consumoRacaoKg" numeric,
  "conversaoAlimentar" numeric,
  "manejos" text,
  "riscos" text
);

drop table if exists "curvaCrescimento" cascade;
create table "curvaCrescimento" (
  "_ord" bigint generated always as identity primary key,
  "semana" integer,
  "dia" integer,
  "pesoEsperadoG" numeric,
  "pesoObservadoG" numeric,
  "biomassaKg" numeric,
  "ganhoMedioDiarioG" numeric
);

drop table if exists "eventosCalendario" cascade;
create table "eventosCalendario" (
  "id" text primary key,
  "data" text,
  "tipo" text,
  "titulo" text,
  "viveiro" text,
  "lote" text,
  "status" text
);

drop table if exists "biometrias" cascade;
create table "biometrias" (
  "id" text primary key,
  "data" text,
  "viveiro" text,
  "lote" text,
  "numeroAmostrados" integer,
  "pesoMedioG" numeric,
  "comprimentoMedioCm" numeric,
  "biomassaEstimadaKg" numeric,
  "ganhoPesoG" numeric,
  "conversaoEstimada" numeric,
  "observacoes" text
);

drop table if exists "mortalidade" cascade;
create table "mortalidade" (
  "id" text primary key,
  "data" text,
  "viveiro" text,
  "lote" text,
  "peixesMortos" integer,
  "mortalidadeAcumuladaPct" numeric,
  "causaProvavel" text,
  "acaoCorretiva" text,
  "observacoes" text
);

drop table if exists "despescas" cascade;
create table "despescas" (
  "id" text primary key,
  "viveiro" text,
  "lote" text,
  "dataPrevista" text,
  "dataRealizada" text,
  "biomassaEstimadaKg" numeric,
  "biomassaDespescadaKg" numeric,
  "pesoMedioFinalG" numeric,
  "destino" text,
  "receitaEstimada" numeric,
  "receitaRealizada" numeric
);

-- ============================ Financeiro ============================
drop table if exists "indicadores" cascade;
create table "indicadores" (
  "_ord" bigint generated always as identity primary key,
  "capex" numeric,
  "opexAnual" numeric,
  "receitaBrutaAnual" numeric,
  "receitaLiquidaAnual" numeric,
  "lucroOperacionalAnual" numeric,
  "margemLiquidaPct" numeric,
  "margemOperacionalPct" numeric,
  "pontoEquilibrioKg" numeric,
  "paybackAnos" numeric,
  "tirPct" numeric,
  "vpl10anos" numeric,
  "custoProducaoKg" numeric,
  "precoMinimoVendaKg" numeric,
  "precoMedioVendaKg" numeric,
  "producaoAnualKg" numeric,
  "receitaPorHectare" numeric,
  "producaoPorHectare" numeric,
  "roiPct" numeric
);

drop table if exists "cenarios" cascade;
create table "cenarios" (
  "_ord" bigint generated always as identity primary key,
  "tipo" text,
  "rotulo" text,
  "paybackAnos" numeric,
  "tirPct" numeric,
  "vpl10anos" numeric,
  "margemLiquidaPct" numeric,
  "lucroAnual" numeric
);

drop table if exists "fluxoCaixaAcumulado" cascade;
create table "fluxoCaixaAcumulado" (
  "_ord" bigint generated always as identity primary key,
  "ano" integer,
  "entradas" numeric,
  "saidas" numeric,
  "saldoAnual" numeric,
  "saldoAcumulado" numeric
);

drop table if exists "fluxoCaixaMensal" cascade;
create table "fluxoCaixaMensal" (
  "_ord" bigint generated always as identity primary key,
  "mes" text,
  "entradas" numeric,
  "saidas" numeric,
  "saldo" numeric,
  "saldoAcumulado" numeric
);

drop table if exists "composicaoCustos" cascade;
create table "composicaoCustos" (
  "_ord" bigint generated always as identity primary key,
  "categoria" text,
  "valor" numeric,
  "percentual" numeric
);

drop table if exists "variaveisSensibilidade" cascade;
create table "variaveisSensibilidade" (
  "id" text primary key,
  "rotulo" text,
  "unidade" text,
  "valorBase" numeric,
  "min" numeric,
  "max" numeric,
  "passo" numeric,
  "impactoPorUnidade" numeric
);

-- ============================ Nutrição ============================
drop table if exists "racoes" cascade;
create table "racoes" (
  "id" text primary key,
  "nomeComercial" text,
  "fabricante" text,
  "proteinaBrutaPct" numeric,
  "granulometriaMm" text,
  "energiaKcalKg" numeric,
  "precoKg" numeric,
  "faseIndicada" text,
  "conversaoEsperada" numeric,
  "observacoes" text
);

drop table if exists "tabelaArracoamento" cascade;
create table "tabelaArracoamento" (
  "_ord" bigint generated always as identity primary key,
  "lote" text,
  "viveiro" text,
  "pesoMedioG" numeric,
  "biomassaEstimadaKg" numeric,
  "taxaArracoamentoPct" numeric,
  "racaoDiariaKg" numeric,
  "tratosPorDia" integer,
  "tipoRacao" text,
  "granulometriaMm" text,
  "proteinaBrutaPct" numeric,
  "custoDiario" numeric,
  "custoAcumulado" numeric
);

drop table if exists "estoqueRacao" cascade;
create table "estoqueRacao" (
  "id" text primary key,
  "tipoRacao" text,
  "fabricante" text,
  "estoqueAtualKg" numeric,
  "consumoDiarioKg" numeric,
  "diasAutonomia" numeric,
  "pedidoMinimoKg" numeric,
  "dataRuptura" text,
  "fornecedor" text,
  "proximaEntrega" text,
  "status" text
);

drop table if exists "desempenhoLotes" cascade;
create table "desempenhoLotes" (
  "_ord" bigint generated always as identity primary key,
  "lote" text,
  "viveiro" text,
  "conversaoAlimentar" numeric,
  "ganhoPesoG" numeric,
  "sobrevivenciaPct" numeric,
  "biomassaFinalKg" numeric,
  "custoAlimentarKg" numeric,
  "eficienciaAlimentarPct" numeric
);

-- ============================ Água / aeração ============================
drop table if exists "parametrosAgua" cascade;
create table "parametrosAgua" (
  "id" text primary key,
  "nome" text,
  "unidade" text,
  "valorAtual" numeric,
  "faixaIdealMin" numeric,
  "faixaIdealMax" numeric,
  "status" text,
  "tendencia" text,
  "recomendacao" text,
  "historico" jsonb
);

drop table if exists "aeradores" cascade;
create table "aeradores" (
  "_ord" bigint generated always as identity primary key,
  "viveiro" text,
  "quantidade" integer,
  "potenciaHp" numeric,
  "hpPorHa" numeric,
  "horasUsoDia" numeric,
  "consumoKwhDia" numeric,
  "riscoHipoxia" text,
  "recomendacao" text
);

-- ============================ Sustentabilidade ============================
drop table if exists "licencas" cascade;
create table "licencas" (
  "id" text primary key,
  "nome" text,
  "orgao" text,
  "numero" text,
  "emissao" text,
  "validade" text,
  "status" text,
  "diasParaVencer" integer
);

drop table if exists "condicionantes" cascade;
create table "condicionantes" (
  "id" text primary key,
  "descricao" text,
  "orgao" text,
  "prazo" text,
  "status" text,
  "evidencia" text,
  "responsavel" text,
  "observacoes" text
);

drop table if exists "documentos" cascade;
create table "documentos" (
  "id" text primary key,
  "nome" text,
  "categoria" text,
  "tipo" text,
  "tamanho" text,
  "data" text,
  "disponivel" boolean
);

drop table if exists "pops" cascade;
create table "pops" (
  "id" text primary key,
  "codigo" text,
  "titulo" text,
  "objetivo" text,
  "responsavel" text,
  "frequencia" text,
  "materiais" jsonb,
  "procedimento" jsonb,
  "registros" jsonb,
  "pontosCriticos" jsonb,
  "medidasCorretivas" jsonb
);

-- ============================ Operação ============================
drop table if exists "alertas" cascade;
create table "alertas" (
  "id" text primary key,
  "titulo" text,
  "severidade" text,
  "modulo" text
);

drop table if exists "registrosDiarios" cascade;
create table "registrosDiarios" (
  "id" text primary key,
  "data" text,
  "horario" text,
  "responsavel" text,
  "viveiro" text,
  "lote" text,
  "tipo" text,
  "atividade" text,
  "observacoes" text,
  "problemas" text,
  "medidasCorretivas" text,
  "status" text
);

-- ============================ Configurações ============================
drop table if exists "modelosPlanilhas" cascade;
create table "modelosPlanilhas" (
  "id" text primary key,
  "arquivo" text,
  "nome" text,
  "descricao" text,
  "colunasObrigatorias" jsonb,
  "status" text
);

drop table if exists "parametrosTecnicos" cascade;
create table "parametrosTecnicos" (
  "id" text primary key,
  "grupo" text,
  "rotulo" text,
  "valor" numeric,
  "unidade" text
);

drop table if exists "usuarios" cascade;
create table "usuarios" (
  "id" text primary key,
  "nome" text,
  "email" text,
  "perfil" text,
  "permissoes" text,
  "ativo" boolean
);

drop table if exists "perfisPermissoes" cascade;
create table "perfisPermissoes" (
  "_ord" bigint generated always as identity primary key,
  "perfil" text,
  "permissoes" text
);

-- ============================ RLS + grants (leitura pública) ============================
-- App é só leitura via chave publicável (anon). Habilita RLS em tudo e
-- permite SELECT para anon/authenticated. Escrita fica restrita (sem policy).
do $$
declare t text;
begin
  for t in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "leitura publica" on public.%I', t);
    execute format('create policy "leitura publica" on public.%I for select to anon, authenticated using (true)', t);
  end loop;
end $$;

grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
