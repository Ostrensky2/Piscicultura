import type { ModeloPlanilha, ParametroTecnico, Usuario } from '@/types'

export const modelosPlanilhas: ModeloPlanilha[] = [
  { id: 'mp1', arquivo: 'modelo_dados_gerais_projeto.xlsx', nome: 'Dados gerais do projeto', descricao: 'Identificação, espécie, sistema, áreas e capacidade.', colunasObrigatorias: ['campo', 'valor', 'unidade'], status: 'importada' },
  { id: 'mp2', arquivo: 'modelo_viveiros.xlsx', nome: 'Viveiros', descricao: 'Cadastro dos viveiros, área, profundidade e volume.', colunasObrigatorias: ['id', 'area_ha', 'profundidade_m', 'tipo'], status: 'importada' },
  { id: 'mp3', arquivo: 'modelo_lotes.xlsx', nome: 'Lotes', descricao: 'Lotes povoados, datas e quantidades.', colunasObrigatorias: ['codigo', 'viveiro', 'data_povoamento', 'numero_peixes'], status: 'importada' },
  { id: 'mp4', arquivo: 'modelo_fases_produtivas.xlsx', nome: 'Fases produtivas', descricao: 'Parâmetros zootécnicos por fase de cultivo.', colunasObrigatorias: ['fase', 'duracao_dias', 'peso_inicial', 'peso_final'], status: 'disponivel' },
  { id: 'mp5', arquivo: 'modelo_curva_crescimento.xlsx', nome: 'Curva de crescimento', descricao: 'Peso esperado x observado ao longo do tempo.', colunasObrigatorias: ['semana', 'peso_esperado', 'peso_observado'], status: 'pendente' },
  { id: 'mp6', arquivo: 'modelo_qualidade_agua.xlsx', nome: 'Qualidade da água', descricao: 'Leituras de parâmetros físico-químicos.', colunasObrigatorias: ['data', 'viveiro', 'parametro', 'valor'], status: 'disponivel' },
  { id: 'mp7', arquivo: 'modelo_arracoamento.xlsx', nome: 'Arraçoamento', descricao: 'Taxas e quantidades de ração por lote.', colunasObrigatorias: ['lote', 'peso_medio', 'taxa', 'racao_diaria'], status: 'disponivel' },
  { id: 'mp8', arquivo: 'modelo_racoes.xlsx', nome: 'Rações', descricao: 'Cadastro de rações e especificações.', colunasObrigatorias: ['nome', 'proteina', 'granulometria', 'preco_kg'], status: 'importada' },
  { id: 'mp9', arquivo: 'modelo_estoque_racao.xlsx', nome: 'Estoque de ração', descricao: 'Entradas, saídas e saldo de ração.', colunasObrigatorias: ['tipo_racao', 'estoque_kg', 'consumo_diario'], status: 'disponivel' },
  { id: 'mp10', arquivo: 'modelo_financeiro.xlsx', nome: 'Financeiro', descricao: 'CAPEX, OPEX, receitas e indicadores.', colunasObrigatorias: ['categoria', 'valor', 'periodo'], status: 'importada' },
  { id: 'mp11', arquivo: 'modelo_fluxo_caixa.xlsx', nome: 'Fluxo de caixa', descricao: 'Entradas e saídas por período.', colunasObrigatorias: ['periodo', 'entradas', 'saidas'], status: 'disponivel' },
  { id: 'mp12', arquivo: 'modelo_licencas.xlsx', nome: 'Licenças', descricao: 'Documentos, órgãos e validades.', colunasObrigatorias: ['nome', 'orgao', 'validade', 'status'], status: 'pendente' },
  { id: 'mp13', arquivo: 'modelo_pops.xlsx', nome: 'POPs', descricao: 'Procedimentos operacionais padrão.', colunasObrigatorias: ['codigo', 'titulo', 'procedimento'], status: 'pendente' },
  { id: 'mp14', arquivo: 'modelo_registro_diario.xlsx', nome: 'Registro diário', descricao: 'Atividades diárias da fazenda.', colunasObrigatorias: ['data', 'viveiro', 'tipo', 'atividade'], status: 'disponivel' },
]

export const parametrosTecnicos: ParametroTecnico[] = [
  { id: 'pt1', grupo: 'Qualidade da água', rotulo: 'Temperatura ideal (mín)', valor: 26, unidade: '°C' },
  { id: 'pt2', grupo: 'Qualidade da água', rotulo: 'Temperatura ideal (máx)', valor: 30, unidade: '°C' },
  { id: 'pt3', grupo: 'Qualidade da água', rotulo: 'Oxigênio dissolvido (mín)', valor: 5, unidade: 'mg/L' },
  { id: 'pt4', grupo: 'Qualidade da água', rotulo: 'pH ideal (mín)', valor: 6.5, unidade: '' },
  { id: 'pt5', grupo: 'Qualidade da água', rotulo: 'pH ideal (máx)', valor: 8.5, unidade: '' },
  { id: 'pt6', grupo: 'Zootecnia', rotulo: 'Conversão alimentar esperada', valor: 1.55, unidade: ':1' },
  { id: 'pt7', grupo: 'Zootecnia', rotulo: 'Mortalidade máxima aceitável', valor: 10, unidade: '%' },
  { id: 'pt8', grupo: 'Zootecnia', rotulo: 'Sobrevivência alvo', valor: 90, unidade: '%' },
  { id: 'pt9', grupo: 'Financeiro', rotulo: 'Taxa de desconto (TMA)', valor: 12, unidade: '% a.a.' },
  { id: 'pt10', grupo: 'Financeiro', rotulo: 'Preço padrão da ração', valor: 4.2, unidade: 'R$/kg' },
  { id: 'pt11', grupo: 'Financeiro', rotulo: 'Preço padrão de venda', valor: 10.5, unidade: 'R$/kg' },
]

export const usuarios: Usuario[] = [
  { id: 'u1', nome: 'PISCIS Expertise', email: 'consultoria@piscis.com.br', perfil: 'Administrador', permissoes: 'Acesso completo', ativo: true },
  { id: 'u2', nome: 'Eng. Marina Costa', email: 'marina@piscis.com.br', perfil: 'Consultor', permissoes: 'Edição técnica', ativo: true },
  { id: 'u3', nome: 'João Produtor', email: 'joao@santaesperanca.com.br', perfil: 'Produtor', permissoes: 'Visualização e registros', ativo: true },
  { id: 'u4', nome: 'Carlos Silva', email: 'carlos@santaesperanca.com.br', perfil: 'Técnico de campo', permissoes: 'Registros operacionais', ativo: true },
  { id: 'u5', nome: 'Fundo AgroInvest', email: 'contato@agroinvest.com.br', perfil: 'Investidor', permissoes: 'Visualização', ativo: true },
]

export const perfisPermissoes = [
  { perfil: 'Investidor', permissoes: 'Visualização de dashboards e relatórios executivos.' },
  { perfil: 'Produtor', permissoes: 'Visualização completa e registros operacionais.' },
  { perfil: 'Técnico de campo', permissoes: 'Registros operacionais (água, biometria, mortalidade, arraçoamento).' },
  { perfil: 'Consultor', permissoes: 'Edição técnica de parâmetros, fases e planejamento.' },
  { perfil: 'Administrador', permissoes: 'Acesso completo, incluindo usuários e configurações.' },
]
