import { describe, expect, it } from 'vitest'
import { formatAccountNumber, maskAccountNumber } from './account'
import { formatDate } from './date'
import { formatMoney } from './money'

// Intl разделяет разряды и отделяет «₽» неразрывными пробелами — заменяем их на обычные для читаемости.
const plain = (s: string) => s.replace(/[  ]/g, ' ')

describe('formatMoney', () => {
  it('форматирует рубли с разделителем тысяч и двумя знаками', () => {
    expect(plain(formatMoney('12345.67'))).toBe('12 345,67 ₽')
    expect(plain(formatMoney('0'))).toBe('0,00 ₽')
    expect(plain(formatMoney('150000'))).toBe('150 000,00 ₽')
  })

  it('использует типографский минус', () => {
    expect(plain(formatMoney('-3450.00'))).toBe('−3 450,00 ₽')
  })

  it('ставит плюс у зачислений, если попросили', () => {
    expect(plain(formatMoney('5000', { withPlus: true }))).toBe('+5 000,00 ₽')
    expect(plain(formatMoney('-1200', { withPlus: true }))).toBe('−1 200,00 ₽')
  })

  it('не теряет копейки на больших суммах (без float)', () => {
    expect(plain(formatMoney('9007199254740993.01'))).toBe('9 007 199 254 740 993,01 ₽')
  })

  it('отвергает мусор', () => {
    expect(() => formatMoney('12,5')).toThrow()
    expect(() => formatMoney('')).toThrow()
  })
})

describe('formatDate', () => {
  it('переводит ISO-дату в ДД.ММ.ГГГГ без сдвига по часовому поясу', () => {
    expect(formatDate('1994-03-12')).toBe('12.03.1994')
  })
})

describe('номер счёта', () => {
  it('группирует 20 цифр как 5-3-1-4-7', () => {
    expect(formatAccountNumber('40817810000000007781')).toBe('40817 810 0 0000 0007781')
  })

  it('маскирует для списков', () => {
    expect(maskAccountNumber('40817810000000007781')).toBe('•• 7781')
  })
})
