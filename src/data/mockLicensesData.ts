import type { Licenca, Condicionante, Documento } from '@/types'

export const licencas: Licenca[] = [
  { id: 'l1', nome: 'Licença Ambiental de Operação (LO)', orgao: 'IAT — Instituto Água e Terra', numero: 'LO-1234/2023', emissao: '2023-07-15', validade: '2025-07-15', status: 'vencendo', diasParaVencer: 45 },
  { id: 'l2', nome: 'Outorga de uso da água', orgao: 'IAT / ANA', numero: 'OUT-0456/2022', emissao: '2022-03-10', validade: '2027-03-10', status: 'valido', diasParaVencer: 650 },
  { id: 'l3', nome: 'Cadastro Ambiental Rural (CAR)', orgao: 'SICAR/PR', numero: 'PR-4112-XYZ', emissao: '2021-01-20', status: 'valido' },
  { id: 'l4', nome: 'Registro de Aquicultor (RGP)', orgao: 'Ministério da Pesca', numero: 'RGP-99887', emissao: '2022-08-01', status: 'valido' },
  { id: 'l5', nome: 'Autorização sanitária (ADAPAR)', orgao: 'ADAPAR', numero: 'SAN-7788', emissao: '2024-02-01', validade: '2025-02-01', status: 'vencido', diasParaVencer: -118 },
  { id: 'l6', nome: 'Alvará de funcionamento', orgao: 'Prefeitura Municipal', status: 'pendente' },
]

export const condicionantes: Condicionante[] = [
  { id: 'c1', descricao: 'Monitoramento trimestral da qualidade do efluente', orgao: 'IAT', prazo: '2025-06-30', status: 'vencendo', evidencia: 'Laudo lab. pendente', responsavel: 'Consultoria ambiental', observacoes: 'Coletar amostras antes do prazo' },
  { id: 'c2', descricao: 'Manutenção da APP de 30 m no entorno do reservatório', orgao: 'IAT', prazo: 'Permanente', status: 'valido', evidencia: 'Relatório fotográfico 04/2025', responsavel: 'Gestor da fazenda' },
  { id: 'c3', descricao: 'Implantação de bacia de sedimentação na drenagem', orgao: 'IAT', prazo: '2025-09-30', status: 'pendente', responsavel: 'Engenharia', observacoes: 'Obra orçada, aguardando início' },
  { id: 'c4', descricao: 'Plano de contingência para mortandade de peixes', orgao: 'IAT', prazo: '2025-07-15', status: 'pendente', responsavel: 'Consultoria técnica' },
]

export const documentos: Documento[] = [
  { id: 'doc1', nome: 'Licença Ambiental de Operação', categoria: 'Licenças', tipo: 'PDF', tamanho: '1,2 MB', data: '2023-07-15', disponivel: false },
  { id: 'doc2', nome: 'Outorga de uso da água', categoria: 'Licenças', tipo: 'PDF', tamanho: '0,8 MB', data: '2022-03-10', disponivel: false },
  { id: 'doc3', nome: 'Cadastro Ambiental Rural', categoria: 'Documentos', tipo: 'PDF', disponivel: false },
  { id: 'doc4', nome: 'Mapa georreferenciado da fazenda', categoria: 'Mapas', tipo: 'PDF', disponivel: false },
  { id: 'doc5', nome: 'Relatório técnico de viabilidade', categoria: 'Relatórios', tipo: 'PDF', tamanho: '4,5 MB', data: '2025-05-20', disponivel: false },
  { id: 'doc6', nome: 'Planilha financeira do projeto', categoria: 'Planilhas', tipo: 'XLSX', disponivel: false },
  { id: 'doc7', nome: 'Contrato de fornecimento de alevinos', categoria: 'Contratos', tipo: 'PDF', disponivel: false },
]
