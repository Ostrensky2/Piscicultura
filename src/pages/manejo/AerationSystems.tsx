import { PageContainer } from '@/components/layout/PageContainer'
import { KPICard } from '@/components/cards/KPICard'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { dataService } from '@/services/dataService'
import { formatNumero } from '@/services/financialService'
import type { Aerador } from '@/types'
import { Wind, Zap, Gauge } from 'lucide-react'

export default function AerationSystems() {
  const aeradores = dataService.getAeradores()
  const totalHp = aeradores.reduce((s, a) => s + a.quantidade * a.potenciaHp, 0)
  const consumoDia = aeradores.reduce((s, a) => s + a.consumoKwhDia, 0)

  const colunas: Coluna<Aerador>[] = [
    { chave: 'viveiro', titulo: 'Viveiro', render: (a) => <span className="font-semibold">{a.viveiro}</span> },
    { chave: 'quantidade', titulo: 'Aeradores', alinhar: 'right' },
    { chave: 'potenciaHp', titulo: 'Potência', alinhar: 'right', render: (a) => `${a.potenciaHp} HP` },
    { chave: 'hpPorHa', titulo: 'HP/ha', alinhar: 'right', render: (a) => a.hpPorHa.toFixed(1) },
    { chave: 'horasUsoDia', titulo: 'Horas/dia', alinhar: 'right', render: (a) => `${a.horasUsoDia} h` },
    { chave: 'consumoKwhDia', titulo: 'Consumo', alinhar: 'right', render: (a) => `${a.consumoKwhDia} kWh` },
    { chave: 'riscoHipoxia', titulo: 'Risco hipóxia', alinhar: 'center', render: (a) => <StatusBadge status={a.riscoHipoxia} /> },
    { chave: 'recomendacao', titulo: 'Recomendação' },
  ]

  return (
    <PageContainer
      titulo="Sistemas de Aeração"
      descricao="Controle de aeradores por viveiro, potência instalada, consumo de energia e risco de hipóxia."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <KPICard rotulo="Potência instalada" valor={`${totalHp} HP`} icon={<Gauge size={20} />} corIcone="bg-azul-escuro" />
        <KPICard rotulo="Consumo diário" valor={`${formatNumero(consumoDia)} kWh`} icon={<Zap size={20} />} corIcone="bg-alerta" />
        <KPICard rotulo="Viveiros monitorados" valor={`${aeradores.length}`} icon={<Wind size={20} />} corIcone="bg-azul-claro" />
      </div>

      <div className="mt-5 card card-pad">
        <h3 className="section-title mb-3">Aeração por viveiro</h3>
        <TechnicalTable colunas={colunas} dados={aeradores} />
      </div>
    </PageContainer>
  )
}
