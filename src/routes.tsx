import type { ComponentType } from 'react'
import { Routes, Route } from 'react-router-dom'

import Dashboard from '@/pages/Dashboard'
import MapPage from '@/pages/planejamento/MapPage'
import ProductiveCapacity from '@/pages/planejamento/ProductiveCapacity'
import Logistics from '@/pages/planejamento/Logistics'
import BatchTimeline from '@/pages/producao/BatchTimeline'
import PhaseTable from '@/pages/producao/PhaseTable'
import GrowthCurve from '@/pages/producao/GrowthCurve'
import OperationalCalendar from '@/pages/producao/OperationalCalendar'
import WaterParameters from '@/pages/manejo/WaterParameters'
import AerationSystems from '@/pages/manejo/AerationSystems'
import DailyActivityLog from '@/pages/manejo/DailyActivityLog'
import Biometry from '@/pages/manejo/Biometry'
import Mortality from '@/pages/manejo/Mortality'
import Harvest from '@/pages/manejo/Harvest'
import FeedingTable from '@/pages/nutricao/FeedingTable'
import Feeds from '@/pages/nutricao/Feeds'
import FeedStock from '@/pages/nutricao/FeedStock'
import Performance from '@/pages/nutricao/Performance'
import FinancialAnalysis from '@/pages/financeiro/FinancialAnalysis'
import FinancialIndicators from '@/pages/financeiro/FinancialIndicators'
import CashFlow from '@/pages/financeiro/CashFlow'
import Sensitivity from '@/pages/financeiro/Sensitivity'
import Licenses from '@/pages/sustentabilidade/Licenses'
import Conditions from '@/pages/sustentabilidade/Conditions'
import POPs from '@/pages/sustentabilidade/POPs'
import About from '@/pages/base/About'
import Manuals from '@/pages/base/Manuals'
import Support from '@/pages/base/Support'
import Documents from '@/pages/base/Documents'
import SpreadsheetModels from '@/pages/configuracoes/SpreadsheetModels'
import DataImport from '@/pages/configuracoes/DataImport'
import TechnicalParameters from '@/pages/configuracoes/TechnicalParameters'
import UsersProfiles from '@/pages/configuracoes/UsersProfiles'
import BackupExport from '@/pages/configuracoes/BackupExport'
import NotFound from '@/pages/NotFound'

export function AppRoutes({ Layout }: { Layout: ComponentType }) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="planejamento/mapa" element={<MapPage />} />
        <Route path="planejamento/capacidade" element={<ProductiveCapacity />} />
        <Route path="planejamento/logistica" element={<Logistics />} />

        <Route path="producao/timeline" element={<BatchTimeline />} />
        <Route path="producao/fases" element={<PhaseTable />} />
        <Route path="producao/crescimento" element={<GrowthCurve />} />
        <Route path="producao/calendario" element={<OperationalCalendar />} />

        <Route path="manejo/agua" element={<WaterParameters />} />
        <Route path="manejo/aeracao" element={<AerationSystems />} />
        <Route path="manejo/registro-diario" element={<DailyActivityLog />} />
        <Route path="manejo/biometrias" element={<Biometry />} />
        <Route path="manejo/mortalidade" element={<Mortality />} />
        <Route path="manejo/despesca" element={<Harvest />} />

        <Route path="nutricao/arracoamento" element={<FeedingTable />} />
        <Route path="nutricao/racoes" element={<Feeds />} />
        <Route path="nutricao/estoque" element={<FeedStock />} />
        <Route path="nutricao/desempenho" element={<Performance />} />

        <Route path="financeiro/analise" element={<FinancialAnalysis />} />
        <Route path="financeiro/indicadores" element={<FinancialIndicators />} />
        <Route path="financeiro/fluxo-caixa" element={<CashFlow />} />
        <Route path="financeiro/sensibilidade" element={<Sensitivity />} />

        <Route path="sustentabilidade/licencas" element={<Licenses />} />
        <Route path="sustentabilidade/condicionantes" element={<Conditions />} />
        <Route path="sustentabilidade/pops" element={<POPs />} />

        <Route path="base/quem-somos" element={<About />} />
        <Route path="base/manuais" element={<Manuals />} />
        <Route path="base/suporte" element={<Support />} />
        <Route path="base/documentos" element={<Documents />} />

        <Route path="configuracoes/modelos" element={<SpreadsheetModels />} />
        <Route path="configuracoes/importacao" element={<DataImport />} />
        <Route path="configuracoes/parametros" element={<TechnicalParameters />} />
        <Route path="configuracoes/usuarios" element={<UsersProfiles />} />
        <Route path="configuracoes/backup" element={<BackupExport />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
