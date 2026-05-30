import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2, ArrowRight, DollarSign, BarChart3, Fish, Coins, RefreshCw, Bell,
  Map, GanttChartSquare, Table2, Droplets, Utensils, BookOpen, Headphones,
  CalendarClock, Sprout, Building2, MapPin, Clock,
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { AlertCard } from '@/components/cards/AlertCard'
import { ModuleCard } from '@/components/cards/ModuleCard'
import { ManualCard } from '@/components/cards/ManualCard'
import { ChartCard } from '@/components/charts/ChartCard'
import { CashFlowChart } from '@/components/charts/CashFlowChart'
import { Slider } from '@/components/ui/Slider'
import { Badge } from '@/components/ui/Badge'
import { dataService } from '@/services/dataService'
import { formatMilhoes, formatBRL2, formatNumero, formatPct } from '@/services/financialService'

export default function Dashboard() {
  const proj = dataService.getDadosProjeto()
  const ind = dataService.getIndicadores()
  const cenario = dataService.getCenarios().realista
  const fluxo = dataService.getFluxoCaixaAcumulado()
  const alertas = dataService.getAlertas()
  const passos = dataService.getProximosPassos()

  // Simulador rápido
  const [precoRacao, setPrecoRacao] = useState(4.2)
  const [precoVenda, setPrecoVenda] = useState(10.5)
  const [mortalidade, setMortalidade] = useState(10)

  const impacto = useMemo(() => {
    const baseLucro = cenario.lucroAnual
    const dRacao = (precoRacao - 4.2) * -2_400_000
    const dVenda = (precoVenda - 10.5) * 1_200_000
    const dMort = (mortalidade - 10) * -180_000
    const lucro = baseLucro + dRacao + dVenda + dMort
    const margem = (lucro / ind.receitaBrutaAnual) * 100
    return { lucro, margem }
  }, [precoRacao, precoVenda, mortalidade, cenario.lucroAnual, ind.receitaBrutaAnual])

  return (
    <PageContainer titulo="Dashboard" descricao="Visão executiva do projeto — viabilidade, produção, retorno e pontos de atenção.">
      {/* Linha 1: Banner + Cenário */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-azul-profundo p-7 text-white lg:col-span-2">
          <div className="absolute -right-6 -top-8 opacity-10">
            <Fish size={220} className="text-verde-claro" />
          </div>
          <div className="relative">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-verde-positivo">
              <CheckCircle2 size={28} />
            </span>
            <h2 className="text-2xl font-extrabold lg:text-3xl">Projeto viável e lucrativo!</h2>
            <p className="mt-2 max-w-lg text-sm text-slate-200">
              Com base no cenário realista, o projeto apresenta excelentes indicadores de retorno.
            </p>
            <Link
              to="/financeiro/analise"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-verde-positivo px-4 py-2 text-sm font-semibold hover:bg-verde-escuro"
            >
              Ver análise completa <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="card card-pad">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-texto-secundario">Cenário atual</p>
            <Badge tone="verde">{cenario.rotulo}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Indicador rotulo="Payback" valor={`${formatNumero(cenario.paybackAnos, 1)} anos`} />
            <Indicador rotulo="TIR" valor={formatPct(cenario.tirPct)} destaque />
            <Indicador rotulo="VPL (10 anos)" valor={formatMilhoes(cenario.vpl10anos)} destaque />
            <Indicador rotulo="Margem líquida anual" valor={formatPct(cenario.margemLiquidaPct)} />
          </div>
        </div>
      </div>

      {/* Linha 2: KPIs + Alertas */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
          <KPICard rotulo="Investimento inicial (CAPEX)" valor={formatMilhoes(ind.capex)} descricao="Total do investimento" icon={<DollarSign size={20} />} corIcone="bg-verde-escuro" />
          <KPICard rotulo="Receita anual estimada" valor={formatMilhoes(ind.receitaBrutaAnual)} descricao="Média anual" icon={<BarChart3 size={20} />} corIcone="bg-azul-medio" />
          <KPICard rotulo="Produção anual" valor={`${formatNumero(proj.producaoAnualEstimadaTon)} ton`} descricao="Peso vivo" icon={<Fish size={20} />} corIcone="bg-azul-claro" />
          <KPICard rotulo="Custo de produção" valor={`${formatBRL2(ind.custoProducaoKg)}/kg`} descricao="Custo unitário" icon={<Coins size={20} />} corIcone="bg-alerta" />
        </div>

        <div className="card card-pad">
          <div className="mb-3 flex items-center gap-2">
            <Bell size={16} className="text-alerta" />
            <h3 className="text-sm font-bold text-texto-principal">Alertas importantes</h3>
          </div>
          <div className="space-y-2">
            {alertas.slice(0, 4).map((a) => (
              <AlertCard key={a.id} alerta={a} />
            ))}
          </div>
          <Link to="/financeiro/sensibilidade" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-verde-escuro hover:underline">
            Ver matriz de riscos <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Linha 3: Fluxo de caixa + Simulador */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <ChartCard
          titulo="Fluxo de caixa acumulado (10 anos)"
          className="lg:col-span-2"
          acao={
            <Link to="/financeiro/fluxo-caixa" className="text-xs font-semibold text-verde-escuro hover:underline">
              Ver detalhado
            </Link>
          }
        >
          <CashFlowChart dados={fluxo} paybackAno={cenario.paybackAnos} />
        </ChartCard>

        <ChartCard titulo="Simulador rápido" subtitulo="Altere os parâmetros e veja o impacto">
          <div className="space-y-4">
            <Slider label="Preço da ração" value={precoRacao} min={3} max={6} step={0.1} unidade="R$/kg" onChange={setPrecoRacao} format={(v) => `R$ ${v.toFixed(2)}`} />
            <Slider label="Preço de venda do peixe" value={precoVenda} min={8} max={13} step={0.1} unidade="R$/kg" onChange={setPrecoVenda} format={(v) => `R$ ${v.toFixed(2)}`} />
            <Slider label="Taxa de mortalidade" value={mortalidade} min={5} max={25} step={1} unidade="%" onChange={setMortalidade} />
          </div>
          <div className="mt-4 rounded-xl bg-primary-50 p-4 text-center">
            <p className="text-xs font-semibold text-texto-secundario">Impacto no lucro anual (cenário realista)</p>
            <p className="mt-1 text-3xl font-extrabold text-verde-escuro">{formatMilhoes(impacto.lucro)}</p>
            <p className="mt-1 text-sm font-semibold text-texto-principal">Margem líquida: {formatPct(impacto.margem)}</p>
            <button
              onClick={() => { setPrecoRacao(4.2); setPrecoVenda(10.5); setMortalidade(10) }}
              className="mt-3 inline-flex items-center gap-1 rounded-lg border border-verde-escuro px-3 py-1.5 text-xs font-semibold text-verde-escuro hover:bg-verde-escuro hover:text-white"
            >
              <RefreshCw size={13} /> Recalcular cenário
            </button>
          </div>
        </ChartCard>
      </div>

      {/* Linha 4: Acesso rápido */}
      <div className="mt-5">
        <h3 className="section-title mb-3">Acesso rápido</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <ModuleCard to="/planejamento/mapa" titulo="Mapa do Empreendimento" icon={<Map size={20} />} />
          <ModuleCard to="/producao/timeline" titulo="Timeline de Lotes" icon={<GanttChartSquare size={20} />} />
          <ModuleCard to="/producao/fases" titulo="Tabela por Fase" icon={<Table2 size={20} />} />
          <ModuleCard to="/manejo/agua" titulo="Parâmetros da Água" icon={<Droplets size={20} />} />
          <ModuleCard to="/nutricao/arracoamento" titulo="Tabela de Arraçoamento" icon={<Utensils size={20} />} />
          <ModuleCard to="/financeiro/analise" titulo="Análise Financeira" icon={<DollarSign size={20} />} />
        </div>
      </div>

      {/* Linha 5: Próximos passos + Resumo + Manuais */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="card card-pad lg:col-span-2">
          <h3 className="section-title mb-4">Próximos passos</h3>
          <div className="space-y-3">
            {passos.map((p) => (
              <div key={p.ordem} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verde-escuro text-xs font-bold text-white">
                  {p.ordem}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-texto-principal">{p.titulo}</p>
                  <p className="text-xs text-texto-secundario">{p.descricao}</p>
                </div>
                <Badge tone={p.status === 'pendente' ? 'amarelo' : p.status === 'aguardando' ? 'cinza' : 'verde'}>
                  {p.status === 'pendente' ? 'Pendente' : p.status === 'aguardando' ? 'Aguardando' : p.status === 'em_andamento' ? 'Em andamento' : 'Concluído'}
                </Badge>
              </div>
            ))}
          </div>
          <Link to="/planejamento/capacidade" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-verde-escuro py-2.5 text-sm font-semibold text-white hover:bg-verde-positivo">
            Ver plano de implantação completo <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-5">
          <div className="card card-pad">
            <h3 className="section-title mb-3">Resumo do projeto</h3>
            <ul className="space-y-2.5 text-sm">
              <ResumoItem icon={<Fish size={16} />} rotulo="Espécie" valor={proj.especie} />
              <ResumoItem icon={<Building2 size={16} />} rotulo="Sistema" valor={proj.sistema} />
              <ResumoItem icon={<MapPin size={16} />} rotulo="Região" valor={proj.regiao} />
              <ResumoItem icon={<Clock size={16} />} rotulo="Ciclo produtivo" valor={`${proj.cicloProdutivoMeses} meses`} />
              <ResumoItem icon={<Sprout size={16} />} rotulo="Produção anual" valor={`${formatNumero(proj.producaoAnualEstimadaTon)} t`} />
              <ResumoItem icon={<CalendarClock size={16} />} rotulo="Início da operação" valor={`Mês ${proj.inicioOperacaoMes}`} />
            </ul>
            <Link to="/planejamento/mapa" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-verde-escuro hover:underline">
              Ver todos os detalhes <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Manuais e suporte */}
      <div className="mt-5">
        <h3 className="section-title mb-3">Manuais e suporte</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ManualCard titulo="Manual do Usuário do App" descricao="Aprenda a navegar e usar todas as funcionalidades." icon={<BookOpen size={20} />} />
          <ManualCard titulo="Suporte Técnico" descricao="Fale com nossos especialistas quando precisar." icon={<Headphones size={20} />} acao="Falar" />
        </div>
      </div>
    </PageContainer>
  )
}

function Indicador({ rotulo, valor, destaque }: { rotulo: string; valor: string; destaque?: boolean }) {
  return (
    <div>
      <p className="text-xs text-texto-secundario">{rotulo}</p>
      <p className={`mt-0.5 text-lg font-extrabold ${destaque ? 'text-verde-escuro' : 'text-texto-principal'}`}>{valor}</p>
    </div>
  )
}

function ResumoItem({ icon, rotulo, valor }: { icon: React.ReactNode; rotulo: string; valor: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className="text-azul-claro">{icon}</span>
      <span className="text-texto-secundario">{rotulo}:</span>
      <span className="ml-auto font-semibold text-texto-principal">{valor}</span>
    </li>
  )
}
