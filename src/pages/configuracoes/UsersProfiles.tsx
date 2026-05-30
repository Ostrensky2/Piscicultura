import { PageContainer } from '@/components/layout/PageContainer'
import { TechnicalTable, type Coluna } from '@/components/tables/TechnicalTable'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { dataService } from '@/services/dataService'
import type { Usuario } from '@/types'
import { UserPlus } from 'lucide-react'

export default function UsersProfiles() {
  const usuarios = dataService.getUsuarios()
  const perfis = dataService.getPerfisPermissoes()

  const colunas: Coluna<Usuario>[] = [
    { chave: 'nome', titulo: 'Nome', render: (u) => <span className="font-semibold">{u.nome}</span> },
    { chave: 'email', titulo: 'E-mail' },
    { chave: 'perfil', titulo: 'Perfil', render: (u) => <Badge tone="azul">{u.perfil}</Badge> },
    { chave: 'permissoes', titulo: 'Permissões' },
    { chave: 'ativo', titulo: 'Situação', alinhar: 'center', render: (u) => <Badge tone={u.ativo ? 'verde' : 'cinza'}>{u.ativo ? 'Ativo' : 'Inativo'}</Badge> },
  ]

  return (
    <PageContainer
      titulo="Usuários e Perfis"
      descricao="Controle de acesso por perfil — define o que cada tipo de usuário pode visualizar e editar."
      acoes={<Button icon={<UserPlus size={16} />}>Novo usuário</Button>}
    >
      <div className="card card-pad">
        <h3 className="section-title mb-3">Usuários</h3>
        <TechnicalTable colunas={colunas} dados={usuarios} />
      </div>

      <div className="mt-5 card card-pad">
        <h3 className="section-title mb-3">Perfis de acesso</h3>
        <dl className="divide-y divide-slate-100">
          {perfis.map((p) => (
            <div key={p.perfil} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-4">
              <dt className="w-40 shrink-0"><Badge tone="cinza">{p.perfil}</Badge></dt>
              <dd className="text-sm text-texto-secundario">{p.permissoes}</dd>
            </div>
          ))}
        </dl>
      </div>
    </PageContainer>
  )
}
