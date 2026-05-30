/**
 * validationService — validações simples para formulários e futura
 * importação de planilhas. Estruturado para crescer conforme as regras
 * de negócio forem definidas.
 */
export interface ResultadoValidacao {
  valido: boolean
  erros: string[]
}

export function validarObrigatorios(
  registro: Record<string, unknown>,
  campos: { chave: string; rotulo: string }[],
): ResultadoValidacao {
  const erros: string[] = []
  for (const { chave, rotulo } of campos) {
    const v = registro[chave]
    if (v === undefined || v === null || v === '') {
      erros.push(`Campo obrigatório: ${rotulo}.`)
    }
  }
  return { valido: erros.length === 0, erros }
}

/** Valida o cabeçalho de uma planilha contra as colunas esperadas. */
export function validarColunasPlanilha(
  colunasArquivo: string[],
  colunasEsperadas: string[],
): ResultadoValidacao {
  const erros: string[] = []
  for (const esperada of colunasEsperadas) {
    if (!colunasArquivo.includes(esperada)) {
      erros.push(`Coluna ausente: "${esperada}".`)
    }
  }
  return { valido: erros.length === 0, erros }
}

export function validarFaixa(valor: number, min: number, max: number): boolean {
  return valor >= min && valor <= max
}
