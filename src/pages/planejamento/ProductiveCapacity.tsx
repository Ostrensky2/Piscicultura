import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { ChartCard } from '@/components/charts/ChartCard'
import { BarChartGeneric } from '@/components/charts/GenericCharts'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { dataService } from '@/services/dataService'
import { formatNumero } from '@/services/financialService'
import { Gauge, Repeat, Fish, Activity } from 'lucide-react'

interface LinhaCap { indicador: string; valor: string }

export default function ProductiveCapacity() {
  const proj = dataService.getDadosProjeto()

  const comparativo = [
    { cenario: 'Conservador', producao: 1000, capacidade: 1500 },
    { cenario: 'Realista', producao: 1200, capacidade: 1500 },
    { cenario: 'Otimista', producao: 1380, capacidade: 1500 },
  ]

  const params: LinhaCap[] = [
    { indicador: 'Capacidade instalada', valor: `${formatNumero(proj.capacidadeInstaladaTonAno)} t/ano` },
    { indicador: 'Produção realista', valor: '1.200 t/ano' },
    { indicador: 'Produção conservadora', valor: '1.000 t/ano' },
    { indicador: 'Produção otimista', valor: '1.380 t/ano' },
    { indicador: 'Número de ciclos por ano', valor: '1,7 (escalonado)' },
    { indicador: 'Densidade de estocagem', valor: '15 peixes/m³' },
    { indicador: 'Sobrevivência estimada', valor: '90%' },
    { indicador: 'Peso médio final', valor: '850 g' },
    { indicador: 'Biomassa por viveiro', valor: '≈ 47,7 t' },
    { indicador: 'Produção por hectare', valor: `${formatNumero(1200 / proj.areaLaminaDaguaHa, 1)} t/ha (lâmina d'água)` },
  ]

  const colunas: Coluna<LinhaCap>[] = [
    { chave: 'indicador', titulo: 'Indicador' },
    { chave: 'valor', titulo: 'Valor', alinhar: 'right' },
  ]

  return (
    <PageContainer
      titulo="Capacidade Produtiva"
      descricao="Capacidade instalada x produção projetada e principais parâmetros de cultivo."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard rotulo="Capacidade instalada" valor="1.500 t/ano" icon={<Gauge size={20} />} corIcone="bg-azul-escuro" />
        <KPICard rotulo="Produção realista" valor="1.200 t/ano" icon={<Fish size={20} />} corIcone="bg-verde-escuro" destaque />
        <KPICard rotulo="Ciclos por ano" valor="1,7" descricao="Povoamento escalonado" icon={<Repeat size={20} />} corIcone="bg-azul-medio" />
        <KPICard rotulo="Densidade" valor="15 peixes/m³" icon={<Activity size={20} />} corIcone="bg-azul-claro" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChartCard titulo="Capacidade instalada x produção projetada" subtitulo="Toneladas por ano">
          <BarChartGeneric
            dados={comparativo}
            xKey="cenario"
            series={[
              { dataKey: 'producao', nome: 'Produção projetada', cor: '#1F9D3A' },
              { dataKey: 'capacidade', nome: 'Capacidade instalada', cor: '#062B63' },
            ]}
          />
        </ChartCard>

        <div className="card card-pad">
          <h3 className="section-title mb-3">Parâmetros de capacidade</h3>
          <TechnicalTable colunas={colunas} dados={params} compacto />
        </div>
      </div>
    </PageContainer>
  )
}
