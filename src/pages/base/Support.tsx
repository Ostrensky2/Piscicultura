import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/Button'
import { Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react'

const canais = [
  { icon: <Mail size={20} />, titulo: 'E-mail', valor: 'suporte@piscis.com.br', acao: 'Enviar e-mail' },
  { icon: <Phone size={20} />, titulo: 'Telefone', valor: '(45) 3000-0000', acao: 'Ligar' },
  { icon: <MessageCircle size={20} />, titulo: 'WhatsApp', valor: '(45) 99999-0000', acao: 'Abrir conversa' },
]

const faq = [
  { p: 'Como troco entre o Modo Investidor e o Modo Gestão da Fazenda?', r: 'Use o seletor no topo da barra lateral. O Modo Investidor foca em viabilidade e retorno; o Modo Gestão foca na operação.' },
  { p: 'De onde vêm os dados exibidos?', r: 'Nesta versão os dados são demonstrativos. Na área de Configurações é possível importar planilhas e, futuramente, conectar a uma base de dados.' },
  { p: 'Os indicadores financeiros são definitivos?', r: 'Não. São estimativas baseadas em premissas. Use a Análise de Sensibilidade para simular diferentes cenários.' },
  { p: 'Como registro atividades da fazenda?', r: 'No módulo Operação > Registro Diário da Fazenda, use o botão "Novo registro".' },
]

export default function Support() {
  return (
    <PageContainer
      titulo="Suporte"
      descricao="Canais de atendimento e perguntas frequentes sobre o uso da plataforma."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {canais.map((c) => (
          <div key={c.titulo} className="card card-pad">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-verde-escuro">{c.icon}</span>
            <p className="mt-3 text-sm font-semibold text-texto-principal">{c.titulo}</p>
            <p className="text-sm text-texto-secundario">{c.valor}</p>
            <Button variant="outline" size="sm" className="mt-3">{c.acao}</Button>
          </div>
        ))}
      </div>

      <div className="mt-5 card card-pad">
        <h3 className="section-title mb-4 flex items-center gap-2"><HelpCircle size={18} className="text-verde-escuro" /> Perguntas frequentes</h3>
        <div className="divide-y divide-slate-100">
          {faq.map((f, i) => (
            <div key={i} className="py-3">
              <p className="text-sm font-semibold text-texto-principal">{f.p}</p>
              <p className="mt-1 text-sm text-texto-secundario">{f.r}</p>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
