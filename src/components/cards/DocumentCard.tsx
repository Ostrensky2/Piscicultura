import { FileText, Download, Upload } from 'lucide-react'
import type { Documento } from '@/types'
import { Badge } from '@/components/ui/Badge'

export function DocumentCard({ doc }: { doc: Documento }) {
  return (
    <div className="card card-pad flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-azul-medio/10 text-azul-medio">
        <FileText size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-texto-principal">{doc.nome}</p>
        <p className="text-xs text-texto-secundario">
          {doc.categoria} · {doc.tipo}
          {doc.tamanho ? ` · ${doc.tamanho}` : ''}
        </p>
        <div className="mt-2">
          {doc.disponivel ? (
            <button className="inline-flex items-center gap-1 text-xs font-semibold text-verde-escuro hover:underline">
              <Download size={14} /> Baixar
            </button>
          ) : (
            <Badge tone="cinza">
              <Upload size={12} /> Aguardando upload
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
