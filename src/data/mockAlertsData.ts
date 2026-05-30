import type { Alerta } from '@/types'

export const alertas: Alerta[] = [
  { id: 'a1', titulo: 'Ração representa 65% do custo variável. Alta sensibilidade a variações de preço.', severidade: 'atencao', modulo: 'Financeiro' },
  { id: 'a2', titulo: 'No cenário pessimista, a margem líquida cai para 8%.', severidade: 'atencao', modulo: 'Sensibilidade' },
  { id: 'a3', titulo: 'Dependência de preço regional de venda. Acompanhe o mercado.', severidade: 'atencao', modulo: 'Financeiro' },
  { id: 'a4', titulo: 'Licença ambiental (LO) vence em 45 dias.', severidade: 'critico', modulo: 'Licenças' },
  { id: 'a5', titulo: 'Estoque de ração AquaFinish 32 suficiente para apenas 7 dias.', severidade: 'critico', modulo: 'Estoque' },
  { id: 'a6', titulo: 'O2 dissolvido no V04 em nível crítico ao amanhecer.', severidade: 'critico', modulo: 'Qualidade da água' },
]
