import type {
  Lote,
  FaseProdutiva,
  PontoCurva,
  EventoCalendario,
  RegistroBiometria,
  RegistroMortalidade,
  RegistroDespesca,
} from '@/types'

export const lotes: Lote[] = [
  { id: 'L1', codigo: 'L-2025-01', viveiro: 'V01', dataPovoamento: '2025-01-10', dataPrevistaDespesca: '2025-08-10', faseAtual: 'Engorda final', numeroPeixes: 56_250, pesoMedioG: 620, status: 'em_andamento', progressoPct: 78 },
  { id: 'L2', codigo: 'L-2025-02', viveiro: 'V02', dataPovoamento: '2025-01-24', dataPrevistaDespesca: '2025-08-24', faseAtual: 'Engorda final', numeroPeixes: 56_250, pesoMedioG: 540, status: 'em_andamento', progressoPct: 70 },
  { id: 'L3', codigo: 'L-2025-03', viveiro: 'V03', dataPovoamento: '2025-02-07', dataPrevistaDespesca: '2025-09-07', faseAtual: 'Engorda intermediária', numeroPeixes: 56_250, pesoMedioG: 430, status: 'em_andamento', progressoPct: 60 },
  { id: 'L4', codigo: 'L-2025-04', viveiro: 'V04', dataPovoamento: '2025-02-21', dataPrevistaDespesca: '2025-09-21', faseAtual: 'Engorda intermediária', numeroPeixes: 56_250, pesoMedioG: 360, status: 'atrasado', progressoPct: 48 },
  { id: 'L5', codigo: 'L-2025-05', viveiro: 'V05', dataPovoamento: '2025-03-07', dataPrevistaDespesca: '2025-10-07', faseAtual: 'Engorda inicial', numeroPeixes: 56_250, pesoMedioG: 240, status: 'em_andamento', progressoPct: 38 },
  { id: 'L6', codigo: 'L-2025-06', viveiro: 'V06', dataPovoamento: '2025-03-21', dataPrevistaDespesca: '2025-10-21', faseAtual: 'Recria', numeroPeixes: 56_250, pesoMedioG: 120, status: 'em_andamento', progressoPct: 26 },
  { id: 'L7', codigo: 'L-2025-07', viveiro: 'V07', dataPovoamento: '2025-04-04', dataPrevistaDespesca: '2025-11-04', faseAtual: 'Recria', numeroPeixes: 56_250, pesoMedioG: 70, status: 'em_andamento', progressoPct: 16 },
  { id: 'L8', codigo: 'L-2025-08', viveiro: 'V08', dataPovoamento: '2025-04-18', dataPrevistaDespesca: '2025-11-18', faseAtual: 'Alevinagem', numeroPeixes: 60_000, pesoMedioG: 18, status: 'em_andamento', progressoPct: 8 },
  { id: 'L9', codigo: 'L-2025-09', viveiro: 'V09', dataPovoamento: '2025-06-01', dataPrevistaDespesca: '2026-01-01', faseAtual: 'Planejado', numeroPeixes: 60_000, pesoMedioG: 0, status: 'planejado', progressoPct: 0 },
]

export const fasesProdutivas: FaseProdutiva[] = [
  { fase: 'Alevinagem', duracaoDias: 30, pesoInicialG: 1, pesoFinalG: 30, densidadePeixesM3: 25, biomassaEsperadaKg: 1_350, sobrevivenciaPct: 92, consumoRacaoKg: 1_080, conversaoAlimentar: 0.9, manejos: 'Aclimatação, peneiramento, arraçoamento 6x/dia', riscos: 'Estresse de transporte, predação, qualidade da água' },
  { fase: 'Recria', duracaoDias: 45, pesoInicialG: 30, pesoFinalG: 120, densidadePeixesM3: 18, biomassaEsperadaKg: 6_480, sobrevivenciaPct: 96, consumoRacaoKg: 6_900, conversaoAlimentar: 1.2, manejos: 'Classificação por tamanho, ajuste de granulometria', riscos: 'Desuniformidade, baixa oxigenação noturna' },
  { fase: 'Engorda inicial', duracaoDias: 40, pesoInicialG: 120, pesoFinalG: 280, densidadePeixesM3: 12, biomassaEsperadaKg: 15_120, sobrevivenciaPct: 98, consumoRacaoKg: 13_900, conversaoAlimentar: 1.35, manejos: 'Biometria quinzenal, aeração programada', riscos: 'Variação térmica, adensamento' },
  { fase: 'Engorda intermediária', duracaoDias: 35, pesoInicialG: 280, pesoFinalG: 450, densidadePeixesM3: 9, biomassaEsperadaKg: 24_300, sobrevivenciaPct: 98, consumoRacaoKg: 15_300, conversaoAlimentar: 1.5, manejos: 'Monitoramento de O2, manejo alimentar fino', riscos: 'Hipóxia, doenças bacterianas' },
  { fase: 'Engorda final', duracaoDias: 30, pesoInicialG: 450, pesoFinalG: 850, densidadePeixesM3: 6, biomassaEsperadaKg: 45_900, sobrevivenciaPct: 99, consumoRacaoKg: 36_000, conversaoAlimentar: 1.7, manejos: 'Aeração intensiva, jejum pré-despesca', riscos: 'Off-flavor, mortalidade por baixa O2' },
  { fase: 'Pré-despesca', duracaoDias: 5, pesoInicialG: 850, pesoFinalG: 870, densidadePeixesM3: 6, biomassaEsperadaKg: 46_980, sobrevivenciaPct: 100, consumoRacaoKg: 0, conversaoAlimentar: 0, manejos: 'Jejum, depuração, concentração', riscos: 'Estresse de manejo, off-flavor' },
  { fase: 'Despesca', duracaoDias: 2, pesoInicialG: 870, pesoFinalG: 870, densidadePeixesM3: 6, biomassaEsperadaKg: 46_980, sobrevivenciaPct: 100, consumoRacaoKg: 0, conversaoAlimentar: 0, manejos: 'Arraste, classificação, transporte vivo', riscos: 'Perdas físicas, mortalidade no transporte' },
]

export const curvaCrescimento: PontoCurva[] = Array.from({ length: 30 }).map((_, i) => {
  const semana = i + 1
  const dia = semana * 7
  const pesoEsperado = Math.round(1.05 * Math.pow(semana, 1.92) + 12)
  const observado = semana <= 22 ? Math.round(pesoEsperado * (0.97 - (semana > 14 ? 0.05 : 0))) : undefined
  const biomassa = Math.round((pesoEsperado * 56_250 * 0.97) / 1000)
  const gmd = Math.round((pesoEsperado / dia) * 10) / 10
  return { semana, dia, pesoEsperadoG: pesoEsperado, pesoObservadoG: observado, biomassaKg: biomassa, ganhoMedioDiarioG: gmd }
})

export const eventosCalendario: EventoCalendario[] = [
  { id: 'e1', data: '2025-06-01', tipo: 'Povoamento', titulo: 'Povoamento V09 — 60.000 alevinos', viveiro: 'V09', lote: 'L-2025-09', status: 'previsto' },
  { id: 'e2', data: '2025-06-03', tipo: 'Biometria', titulo: 'Biometria quinzenal V01–V04', status: 'previsto' },
  { id: 'e3', data: '2025-06-05', tipo: 'Recebimento de ração', titulo: 'Entrega 40 t ração engorda', status: 'previsto' },
  { id: 'e4', data: '2025-06-08', tipo: 'Qualidade da água', titulo: 'Monitoramento semanal de O2 e amônia', status: 'previsto' },
  { id: 'e5', data: '2025-06-10', tipo: 'Despesca', titulo: 'Despesca prevista V01 (~47 t)', viveiro: 'V01', lote: 'L-2025-01', status: 'previsto' },
  { id: 'e6', data: '2025-06-15', tipo: 'Manutenção', titulo: 'Manutenção preventiva aeradores', status: 'previsto' },
  { id: 'e7', data: '2025-06-20', tipo: 'Renovação de licença', titulo: 'Renovação Licença de Operação (IAT)', status: 'atrasado' },
  { id: 'e8', data: '2025-06-25', tipo: 'Ajuste de arraçoamento', titulo: 'Revisão de taxas de arraçoamento', status: 'previsto' },
]

export const biometrias: RegistroBiometria[] = [
  { id: 'b1', data: '2025-05-20', viveiro: 'V01', lote: 'L-2025-01', numeroAmostrados: 60, pesoMedioG: 620, comprimentoMedioCm: 31.5, biomassaEstimadaKg: 34_875, ganhoPesoG: 85, conversaoEstimada: 1.62, observacoes: 'Lote uniforme, boa condição' },
  { id: 'b2', data: '2025-05-20', viveiro: 'V03', lote: 'L-2025-03', numeroAmostrados: 60, pesoMedioG: 430, comprimentoMedioCm: 27.2, biomassaEstimadaKg: 24_188, ganhoPesoG: 70, conversaoEstimada: 1.48 },
  { id: 'b3', data: '2025-05-20', viveiro: 'V04', lote: 'L-2025-04', numeroAmostrados: 60, pesoMedioG: 360, comprimentoMedioCm: 25.4, biomassaEstimadaKg: 20_250, ganhoPesoG: 52, conversaoEstimada: 1.71, observacoes: 'Crescimento abaixo do esperado' },
  { id: 'b4', data: '2025-05-06', viveiro: 'V01', lote: 'L-2025-01', numeroAmostrados: 60, pesoMedioG: 535, comprimentoMedioCm: 29.8, biomassaEstimadaKg: 30_094, ganhoPesoG: 78, conversaoEstimada: 1.6 },
]

export const mortalidade: RegistroMortalidade[] = [
  { id: 'm1', data: '2025-05-18', viveiro: 'V04', lote: 'L-2025-04', peixesMortos: 320, mortalidadeAcumuladaPct: 6.2, causaProvavel: 'Baixa oxigenação noturna', acaoCorretiva: 'Ligar aeradores às 22h', observacoes: 'Pico após dia quente' },
  { id: 'm2', data: '2025-05-15', viveiro: 'V02', lote: 'L-2025-02', peixesMortos: 95, mortalidadeAcumuladaPct: 3.1, causaProvavel: 'Manejo de biometria', acaoCorretiva: 'Reduzir manuseio' },
  { id: 'm3', data: '2025-05-12', viveiro: 'V07', lote: 'L-2025-07', peixesMortos: 140, mortalidadeAcumuladaPct: 4.0, causaProvavel: 'Estresse pós-povoamento', acaoCorretiva: 'Sal terapêutico, jejum 24h' },
]

export const despescas: RegistroDespesca[] = [
  { id: 'd1', viveiro: 'V01', lote: 'L-2025-01', dataPrevista: '2025-08-10', biomassaEstimadaKg: 47_700, pesoMedioFinalG: 850, destino: 'Frigorífico regional', receitaEstimada: 500_850 },
  { id: 'd2', viveiro: 'V02', lote: 'L-2025-02', dataPrevista: '2025-08-24', biomassaEstimadaKg: 47_700, pesoMedioFinalG: 850, destino: 'Frigorífico regional', receitaEstimada: 500_850 },
  { id: 'd3', viveiro: 'V12', lote: 'L-2024-12', dataPrevista: '2025-04-15', dataRealizada: '2025-04-16', biomassaEstimadaKg: 46_500, biomassaDespescadaKg: 45_120, pesoMedioFinalG: 832, destino: 'Mercado vivo', receitaEstimada: 488_250, receitaRealizada: 473_760 },
]
