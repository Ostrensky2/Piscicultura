import {
  LayoutDashboard, Map, Gauge, Truck, CalendarDays, Table2, LineChart, GanttChartSquare,
  Droplets, Wind, ClipboardList, Scale, Skull, Fish, Utensils, Package, Boxes, TrendingUp,
  DollarSign, BarChart3, Wallet, SlidersHorizontal, FileCheck2, ListChecks, BookOpen,
  Users, FileSpreadsheet, Upload, Settings2, ShieldCheck, LifeBuoy, FolderOpen, Building2,
} from 'lucide-react'
import type { ReactNode } from 'react'

export interface NavItem {
  rotulo: string
  to: string
  icon: ReactNode
}
export interface NavGroup {
  titulo?: string
  itens: NavItem[]
}

const sz = 18

export const navegacao: NavGroup[] = [
  {
    itens: [{ rotulo: 'Dashboard', to: '/', icon: <LayoutDashboard size={sz} /> }],
  },
  {
    titulo: 'Estratégia e Planejamento',
    itens: [
      { rotulo: 'Mapa do Empreendimento', to: '/planejamento/mapa', icon: <Map size={sz} /> },
      { rotulo: 'Capacidade Produtiva', to: '/planejamento/capacidade', icon: <Gauge size={sz} /> },
      { rotulo: 'Logística', to: '/planejamento/logistica', icon: <Truck size={sz} /> },
    ],
  },
  {
    titulo: 'Produção',
    itens: [
      { rotulo: 'Timeline de Lotes', to: '/producao/timeline', icon: <GanttChartSquare size={sz} /> },
      { rotulo: 'Tabela por Fase', to: '/producao/fases', icon: <Table2 size={sz} /> },
      { rotulo: 'Curva de Crescimento', to: '/producao/crescimento', icon: <LineChart size={sz} /> },
      { rotulo: 'Calendário Operacional', to: '/producao/calendario', icon: <CalendarDays size={sz} /> },
    ],
  },
  {
    titulo: 'Manejo',
    itens: [
      { rotulo: 'Parâmetros da Água', to: '/manejo/agua', icon: <Droplets size={sz} /> },
      { rotulo: 'Sistemas de Aeração', to: '/manejo/aeracao', icon: <Wind size={sz} /> },
      { rotulo: 'Registro Diário da Fazenda', to: '/manejo/registro-diario', icon: <ClipboardList size={sz} /> },
      { rotulo: 'Biometrias', to: '/manejo/biometrias', icon: <Scale size={sz} /> },
      { rotulo: 'Mortalidade', to: '/manejo/mortalidade', icon: <Skull size={sz} /> },
      { rotulo: 'Despesca', to: '/manejo/despesca', icon: <Fish size={sz} /> },
    ],
  },
  {
    titulo: 'Nutrição',
    itens: [
      { rotulo: 'Tabela de Arraçoamento', to: '/nutricao/arracoamento', icon: <Utensils size={sz} /> },
      { rotulo: 'Rações', to: '/nutricao/racoes', icon: <Package size={sz} /> },
      { rotulo: 'Estoque e Logística', to: '/nutricao/estoque', icon: <Boxes size={sz} /> },
      { rotulo: 'Desempenho', to: '/nutricao/desempenho', icon: <TrendingUp size={sz} /> },
    ],
  },
  {
    titulo: 'Financeiro',
    itens: [
      { rotulo: 'Análise Financeira', to: '/financeiro/analise', icon: <DollarSign size={sz} /> },
      { rotulo: 'Indicadores', to: '/financeiro/indicadores', icon: <BarChart3 size={sz} /> },
      { rotulo: 'Fluxo de Caixa', to: '/financeiro/fluxo-caixa', icon: <Wallet size={sz} /> },
      { rotulo: 'Sensibilidade', to: '/financeiro/sensibilidade', icon: <SlidersHorizontal size={sz} /> },
    ],
  },
  {
    titulo: 'Sustentabilidade e Licenciamento',
    itens: [
      { rotulo: 'Licenças', to: '/sustentabilidade/licencas', icon: <FileCheck2 size={sz} /> },
      { rotulo: 'Condicionantes', to: '/sustentabilidade/condicionantes', icon: <ListChecks size={sz} /> },
      { rotulo: 'POPs', to: '/sustentabilidade/pops', icon: <BookOpen size={sz} /> },
    ],
  },
  {
    titulo: 'Base de Informações',
    itens: [
      { rotulo: 'Quem Somos', to: '/base/quem-somos', icon: <Building2 size={sz} /> },
      { rotulo: 'Manuais', to: '/base/manuais', icon: <BookOpen size={sz} /> },
      { rotulo: 'Suporte', to: '/base/suporte', icon: <LifeBuoy size={sz} /> },
      { rotulo: 'Documentos', to: '/base/documentos', icon: <FolderOpen size={sz} /> },
    ],
  },
  {
    titulo: 'Configurações',
    itens: [
      { rotulo: 'Modelos de Planilhas', to: '/configuracoes/modelos', icon: <FileSpreadsheet size={sz} /> },
      { rotulo: 'Importação de Dados', to: '/configuracoes/importacao', icon: <Upload size={sz} /> },
      { rotulo: 'Parâmetros Técnicos', to: '/configuracoes/parametros', icon: <Settings2 size={sz} /> },
      { rotulo: 'Usuários e Perfis', to: '/configuracoes/usuarios', icon: <Users size={sz} /> },
      { rotulo: 'Backup e Exportação', to: '/configuracoes/backup', icon: <ShieldCheck size={sz} /> },
    ],
  },
]
