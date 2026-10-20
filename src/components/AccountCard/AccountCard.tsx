import type { ElementType } from 'react'
import { formatMoney, type MoneyString } from '../../format/money'
import { Icon, type IconName } from '../../icons/Icon'
import type { PolymorphicProps } from '../../types/polymorphic'
import { Badge } from '../Badge/Badge'
import styles from './AccountCard.module.css'

export type AccountKind = 'default' | 'saving' | 'checking'

const kindIcons: Record<AccountKind, IconName> = {
  default: 'wallet',
  saving: 'percent',
  checking: 'card',
}

interface AccountCardOwnProps {
  kind: AccountKind
  /** Баланс строкой с сервера: "150000.00", "-3450.00". */
  balance: MoneyString
  /** Тип и последние цифры номера: «Накопительный · •• 7781». */
  title: string
  /** Особенность типа: «Снятий осталось 3 из 5», «Доступно 12 300,00 ₽». */
  meta?: string
  /** warning — для отрицательного баланса и предупреждений: заметно, но без паники. */
  metaTone?: 'default' | 'warning'
  blocked?: boolean
  className?: string
}

export type AccountCardProps<C extends ElementType = 'div'> = PolymorphicProps<
  C,
  AccountCardOwnProps
>

/** Счёт в списке: баланс крупно, ниже тип и номер, ещё ниже — особенность типа или статус. */
export function AccountCard<C extends ElementType = 'div'>({
  as,
  kind,
  balance,
  title,
  meta,
  metaTone = 'default',
  blocked = false,
  className,
  ...rest
}: AccountCardProps<C>) {
  const Component: ElementType = as ?? 'div'
  const interactive = as !== undefined
  const negative = balance.startsWith('-')

  return (
    <Component
      className={[
        styles.card,
        interactive && styles.interactive,
        blocked && styles.blocked,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className={[styles.tile, styles[kind]].join(' ')}>
        <Icon name={kindIcons[kind]} size={22} />
      </span>
      <span className={styles.info}>
        <span className={[styles.balance, negative && styles.negative].filter(Boolean).join(' ')}>
          {formatMoney(balance)}
        </span>
        <span className={styles.title}>{title}</span>
        {blocked ? (
          <Badge tone="danger" icon="lock">
            Заблокирован
          </Badge>
        ) : (
          meta && (
            <span
              className={[styles.meta, metaTone === 'warning' && styles.warning]
                .filter(Boolean)
                .join(' ')}
            >
              {meta}
            </span>
          )
        )}
      </span>
      {interactive && <Icon name="chevron-right" size={20} className={styles.chevron} />}
    </Component>
  )
}
