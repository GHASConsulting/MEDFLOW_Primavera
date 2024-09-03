function padZero(valor: number): string {
  return valor.toString().padStart(2, '0')
}

/** @description Format date to format yyyy-mm-dd */
export function formatDate(data: Date): string {
  const ano = data.getFullYear()
  const mes = padZero(data.getMonth() + 1)
  const dia = padZero(data.getDate())

  return `${ano}-${mes}-${dia}`
}
