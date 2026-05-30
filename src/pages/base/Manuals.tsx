import { PageContainer } from '@/components/layout/PageContainer'
import { ManualCard } from '@/components/cards/ManualCard'
import { BookOpen, Droplets, Utensils, Activity, Scale, ClipboardList, ShieldCheck, Wrench } from 'lucide-react'

const manuais = [
  { titulo: 'Guia de início rápido', descricao: 'Como navegar pelos módulos e modos Investidor e Gestão.', icon: <BookOpen size={20} /> },
  { titulo: 'Manejo da qualidade da água', descricao: 'Parâmetros ideais, monitoramento e correções.', icon: <Droplets size={20} /> },
  { titulo: 'Arraçoamento e nutrição', descricao: 'Taxas por fase, granulometria e cálculo de ração.', icon: <Utensils size={20} /> },
  { titulo: 'Biometria e curva de crescimento', descricao: 'Coleta, amostragem e ajuste do plano alimentar.', icon: <Scale size={20} /> },
  { titulo: 'Controle de mortalidade', descricao: 'Registro, causas prováveis e ações corretivas.', icon: <Activity size={20} /> },
  { titulo: 'Registro diário da fazenda', descricao: 'Boas práticas de registro operacional.', icon: <ClipboardList size={20} /> },
  { titulo: 'Conformidade ambiental', descricao: 'Licenças, condicionantes e obrigações legais.', icon: <ShieldCheck size={20} /> },
  { titulo: 'Manutenção de equipamentos', descricao: 'Aeradores, bombas e rotina preventiva.', icon: <Wrench size={20} /> },
]

export default function Manuals() {
  return (
    <PageContainer
      titulo="Manuais"
      descricao="Material de apoio técnico e operacional. Os PDFs serão disponibilizados na pasta configuracoes/manuais."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {manuais.map((m) => (
          <ManualCard key={m.titulo} titulo={m.titulo} descricao={m.descricao} icon={m.icon} />
        ))}
      </div>
    </PageContainer>
  )
}
