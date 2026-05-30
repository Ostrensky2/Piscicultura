import { useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { DocumentCard } from '@/components/cards/DocumentCard'
import { Tabs } from '@/components/ui/Tabs'
import { dataService } from '@/services/dataService'

export default function Documents() {
  const documentos = dataService.getDocumentos()
  const categorias = useMemo(() => ['Todas', ...Array.from(new Set(documentos.map((d) => d.categoria)))], [documentos])
  const [cat, setCat] = useState('Todas')

  const filtrados = cat === 'Todas' ? documentos : documentos.filter((d) => d.categoria === cat)

  return (
    <PageContainer
      titulo="Documentos"
      descricao="Repositório de documentos do projeto. Os arquivos serão disponibilizados na pasta configuracoes/documentos."
    >
      <div className="card card-pad">
        <Tabs tabs={categorias.map((c) => ({ id: c, label: c }))} active={cat} onChange={setCat} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((d) => <DocumentCard key={d.id} doc={d} />)}
        </div>
      </div>
    </PageContainer>
  )
}
