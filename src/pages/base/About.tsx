import { PageContainer } from '@/components/layout/PageContainer'
import { dataService } from '@/services/dataService'
import { formatNumero } from '@/services/financialService'
import { Fish, Target, Compass, ShieldCheck } from 'lucide-react'

export default function About() {
  const p = dataService.getDadosProjeto()

  const ficha: { rotulo: string; valor: string }[] = [
    { rotulo: 'Projeto', valor: p.nomeProjeto },
    { rotulo: 'Produtor', valor: p.produtor },
    { rotulo: 'Espécie', valor: p.especie },
    { rotulo: 'Sistema', valor: p.sistema },
    { rotulo: 'Região', valor: p.regiao },
    { rotulo: 'Área total', valor: `${p.areaTotalHa} ha` },
    { rotulo: 'Lâmina d’água', valor: `${p.areaLaminaDaguaHa} ha` },
    { rotulo: 'Viveiros', valor: `${p.numeroViveiros}` },
    { rotulo: 'Volume de água', valor: `${formatNumero(p.volumeAguaM3)} m³` },
    { rotulo: 'Capacidade instalada', valor: `${formatNumero(p.capacidadeInstaladaTonAno)} t/ano` },
    { rotulo: 'Produção estimada', valor: `${formatNumero(p.producaoAnualEstimadaTon)} t/ano` },
    { rotulo: 'Ciclo produtivo', valor: `${p.cicloProdutivoMeses} meses` },
  ]

  const pilares = [
    { icon: <Target size={22} />, titulo: 'Viabilidade', texto: 'Decisões de investimento baseadas em indicadores econômico-financeiros sólidos.' },
    { icon: <Compass size={22} />, titulo: 'Planejamento', texto: 'Do croqui da fazenda ao calendário operacional, com capacidade produtiva dimensionada.' },
    { icon: <Fish size={22} />, titulo: 'Operação', texto: 'Registro diário, qualidade da água, arraçoamento, biometria e despesca em um só lugar.' },
    { icon: <ShieldCheck size={22} />, titulo: 'Conformidade', texto: 'Licenças, condicionantes e POPs para uma operação regular e sustentável.' },
  ]

  return (
    <PageContainer
      titulo="Quem Somos"
      descricao="PISCIS Expertise — plataforma de gestão e viabilidade para piscicultura de tilápia em escala comercial."
    >
      <div className="card card-pad bg-azul-profundo text-white">
        <h2 className="text-lg font-extrabold">PISCIS Expertise</h2>
        <p className="mt-2 max-w-3xl text-sm text-blue-100">
          Unimos engenharia de aquicultura, gestão de fazenda e análise financeira em uma plataforma única —
          do estudo de viabilidade para investidores à operação diária da fazenda. Este ambiente apresenta o
          projeto <strong>{p.nomeProjeto}</strong> e serve de base para o acompanhamento técnico e econômico do empreendimento.
        </p>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pilares.map((pi) => (
          <div key={pi.titulo} className="card card-pad">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-verde-escuro">{pi.icon}</span>
            <p className="mt-3 text-sm font-semibold text-texto-principal">{pi.titulo}</p>
            <p className="mt-1 text-xs text-texto-secundario">{pi.texto}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 card card-pad">
        <h3 className="section-title mb-3">Ficha técnica do projeto</h3>
        <dl className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {ficha.map((f) => (
            <div key={f.rotulo} className="flex items-center justify-between border-b border-slate-100 py-2.5">
              <dt className="text-sm text-texto-secundario">{f.rotulo}</dt>
              <dd className="text-sm font-semibold text-texto-principal">{f.valor}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-texto-secundario">Última atualização: {p.ultimaAtualizacao}</p>
      </div>
    </PageContainer>
  )
}
