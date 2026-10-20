/**
 * Деньги приходят с сервера строкой с точкой: "12345.67", "-3450.00".
 * В number не переводим: форматируем строку напрямую (Intl умеет принимать десятичную строку).
 */
export type MoneyString = string

const MONEY_PATTERN = /^-?\d+(\.\d+)?$/
const MINUS = '−' // типографский минус «−»

const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const signedFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: 'exceptZero',
})

export interface FormatMoneyOptions {
  /** Показывать «+» у положительных сумм — для операций (зачислений). */
  withPlus?: boolean
}

/** "12345.67" → "12 345,67 ₽"; "-3450" → "−3 450,00 ₽". Пробелы неразрывные. */
export function formatMoney(amount: MoneyString, options: FormatMoneyOptions = {}): string {
  if (!MONEY_PATTERN.test(amount)) {
    throw new Error(`Некорректная сумма: "${amount}"`)
  }
  const value = amount as Intl.StringNumericLiteral
  const text = (options.withPlus ? signedFormatter : formatter).format(value)
  return text.replace('-', MINUS)
}
