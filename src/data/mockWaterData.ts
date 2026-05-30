import type { ParametroAgua, Aerador } from '@/types'

function hist(base: number, amp: number): { data: string; valor: number }[] {
  return Array.from({ length: 14 }).map((_, i) => {
    const dia = String(i + 7).padStart(2, '0')
    const valor = Math.round((base + Math.sin(i / 2) * amp + (Math.random() - 0.5) * amp) * 100) / 100
    return { data: `${dia}/05`, valor }
  })
}

export const parametrosAgua: ParametroAgua[] = [
  { id: 'temp', nome: 'Temperatura', unidade: '°C', valorAtual: 27.4, faixaIdealMin: 26, faixaIdealMax: 30, status: 'adequado', tendencia: 'estavel', recomendacao: 'Temperatura ideal para tilápia. Manter monitoramento diário.', historico: hist(27.5, 1.2) },
  { id: 'od', nome: 'Oxigênio dissolvido', unidade: 'mg/L', valorAtual: 4.1, faixaIdealMin: 5, faixaIdealMax: 8, status: 'atencao', tendencia: 'caindo', recomendacao: 'Abaixo do ideal ao amanhecer. Acionar aeradores das 22h às 8h.', historico: hist(5.2, 1.3) },
  { id: 'ph', nome: 'pH', unidade: '', valorAtual: 7.6, faixaIdealMin: 6.5, faixaIdealMax: 8.5, status: 'adequado', tendencia: 'estavel', recomendacao: 'Faixa adequada. Acompanhar após chuvas.', historico: hist(7.6, 0.3) },
  { id: 'transp', nome: 'Transparência', unidade: 'cm', valorAtual: 28, faixaIdealMin: 30, faixaIdealMax: 45, status: 'atencao', tendencia: 'caindo', recomendacao: 'Bloom de fitoplâncton aumentando. Reduzir arraçoamento e renovar água.', historico: hist(34, 5) },
  { id: 'amonia', nome: 'Amônia (NH3)', unidade: 'mg/L', valorAtual: 0.04, faixaIdealMin: 0, faixaIdealMax: 0.1, status: 'adequado', tendencia: 'estavel', recomendacao: 'Dentro do limite seguro.', historico: hist(0.05, 0.02) },
  { id: 'nitrito', nome: 'Nitrito (NO2)', unidade: 'mg/L', valorAtual: 0.18, faixaIdealMin: 0, faixaIdealMax: 0.3, status: 'adequado', tendencia: 'subindo', recomendacao: 'Monitorar. Se subir, aumentar renovação e cloretos.', historico: hist(0.15, 0.05) },
  { id: 'alc', nome: 'Alcalinidade', unidade: 'mg/L CaCO3', valorAtual: 95, faixaIdealMin: 50, faixaIdealMax: 200, status: 'adequado', tendencia: 'estavel', recomendacao: 'Boa capacidade tampão.', historico: hist(95, 8) },
  { id: 'dureza', nome: 'Dureza', unidade: 'mg/L CaCO3', valorAtual: 70, faixaIdealMin: 50, faixaIdealMax: 150, status: 'adequado', tendencia: 'estavel', recomendacao: 'Adequada para a espécie.', historico: hist(70, 6) },
  { id: 'cond', nome: 'Condutividade', unidade: 'µS/cm', valorAtual: 210, faixaIdealMin: 100, faixaIdealMax: 500, status: 'adequado', tendencia: 'estavel', recomendacao: 'Normal.', historico: hist(210, 15) },
  { id: 'turb', nome: 'Turbidez', unidade: 'NTU', valorAtual: 38, faixaIdealMin: 10, faixaIdealMax: 40, status: 'atencao', tendencia: 'subindo', recomendacao: 'Próxima do limite. Avaliar entrada de sedimentos.', historico: hist(30, 8) },
]

export const aeradores: Aerador[] = [
  { viveiro: 'V01', quantidade: 4, potenciaHp: 3, hpPorHa: 3.2, horasUsoDia: 10, consumoKwhDia: 89, riscoHipoxia: 'atencao', recomendacao: 'Adensamento alto. Manter 4 aeradores das 22h às 9h.' },
  { viveiro: 'V02', quantidade: 4, potenciaHp: 3, hpPorHa: 3.2, horasUsoDia: 9, consumoKwhDia: 80, riscoHipoxia: 'adequado', recomendacao: 'Operação normal.' },
  { viveiro: 'V03', quantidade: 3, potenciaHp: 3, hpPorHa: 2.4, horasUsoDia: 8, consumoKwhDia: 53, riscoHipoxia: 'adequado', recomendacao: 'Operação normal.' },
  { viveiro: 'V04', quantidade: 3, potenciaHp: 3, hpPorHa: 2.4, horasUsoDia: 12, consumoKwhDia: 80, riscoHipoxia: 'critico', recomendacao: 'O2 crítico. Adicionar 1 aerador e antecipar acionamento para 20h.' },
  { viveiro: 'V05', quantidade: 2, potenciaHp: 3, hpPorHa: 1.6, horasUsoDia: 6, consumoKwhDia: 27, riscoHipoxia: 'adequado', recomendacao: 'Biomassa moderada.' },
  { viveiro: 'V06', quantidade: 2, potenciaHp: 2, hpPorHa: 1.1, horasUsoDia: 5, consumoKwhDia: 15, riscoHipoxia: 'adequado', recomendacao: 'Operação normal.' },
]
