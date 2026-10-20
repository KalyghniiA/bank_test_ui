const ACCOUNT_NUMBER = /^\d{20}$/

/** "40817810000000007781" → "40817 810 0 0000 0007781" (группы 5-3-1-4-7, как в российских банках). */
export function formatAccountNumber(number: string): string {
  if (!ACCOUNT_NUMBER.test(number)) {
    throw new Error(`Номер счёта должен состоять из 20 цифр: "${number}"`)
  }
  return [
    number.slice(0, 5),
    number.slice(5, 8),
    number.slice(8, 9),
    number.slice(9, 13),
    number.slice(13),
  ].join(' ')
}

/** "40817810000000007781" → "•• 7781" — для списков. */
export function maskAccountNumber(number: string): string {
  return `•• ${number.slice(-4)}`
}
