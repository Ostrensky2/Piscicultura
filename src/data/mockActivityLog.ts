import type { RegistroDiario } from '@/types'

export const registrosDiarios: RegistroDiario[] = [
  { id: 'rd1', data: '2025-05-30', horario: '06:30', responsavel: 'Carlos (campo)', viveiro: 'V04', lote: 'L-2025-04', tipo: 'Qualidade da água', atividade: 'Medição de O2 ao amanhecer: 3,8 mg/L', observacoes: 'Abaixo do ideal', problemas: 'Baixa oxigenação', medidasCorretivas: 'Aeradores acionados, arraçoamento suspenso', status: 'concluida' },
  { id: 'rd2', data: '2025-05-30', horario: '07:15', responsavel: 'Carlos (campo)', viveiro: 'V01', lote: 'L-2025-01', tipo: 'Arraçoamento', atividade: 'Trato matinal — 130 kg AquaFinish 32', status: 'concluida' },
  { id: 'rd3', data: '2025-05-30', horario: '08:00', responsavel: 'Ana (técnica)', viveiro: 'V03', lote: 'L-2025-03', tipo: 'Biometria', atividade: 'Biometria quinzenal — peso médio 430 g', observacoes: 'Lote dentro do esperado', status: 'concluida' },
  { id: 'rd4', data: '2025-05-30', horario: '09:30', responsavel: 'Equipe manutenção', viveiro: 'V04', lote: 'L-2025-04', tipo: 'Manutenção', atividade: 'Instalação de aerador adicional', status: 'em_andamento' },
  { id: 'rd5', data: '2025-05-30', horario: '10:00', responsavel: 'Carlos (campo)', viveiro: 'V04', lote: 'L-2025-04', tipo: 'Mortalidade', atividade: 'Retirada de 320 peixes mortos', problemas: 'Pico de mortalidade', medidasCorretivas: 'Investigação de O2', status: 'concluida' },
  { id: 'rd6', data: '2025-05-29', horario: '14:00', responsavel: 'Logística', viveiro: '—', lote: '—', tipo: 'Recebimento de ração', atividade: 'Recebimento de 20 t AquaGrow 36', status: 'concluida' },
  { id: 'rd7', data: '2025-05-29', horario: '15:30', responsavel: 'Ana (técnica)', viveiro: 'V08', lote: 'L-2025-08', tipo: 'Visita técnica', atividade: 'Avaliação sanitária do lote de alevinagem', observacoes: 'Sem sinais clínicos', status: 'concluida' },
  { id: 'rd8', data: '2025-05-30', horario: '16:00', responsavel: 'Carlos (campo)', viveiro: 'V02', lote: 'L-2025-02', tipo: 'Uso de aeradores', atividade: 'Programar aeração noturna 22h–09h', status: 'pendente' },
]
