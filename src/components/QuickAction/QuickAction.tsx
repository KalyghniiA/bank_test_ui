import type { ElementType } from 'react'
import { Icon, type IconName } from '../../icons/Icon'
import type { PolymorphicProps } from '../../types/polymorphic'
import styles from './QuickAction.module.css'

interface QuickActionOwnProps {
  icon: IconName
  label: string
  className?: string
}

export type QuickActionProps<C extends ElementType = 'button'> = PolymorphicProps<
  C,
  QuickActionOwnProps
>

/** Быстрое действие: круглая кнопка с иконкой и подписью («Пополнить», «Перевести»). */
export function QuickAction<C extends ElementType = 'button'>({
  as,
  icon,
  label,
  className,
  ...rest
}: QuickActionProps<C>) {
  const Component: ElementType = as ?? 'button'
  const buttonProps = as === undefined ? { type: 'button' } : {}

  return (
    <Component
      className={[styles.action, className].filter(Boolean).join(' ')}
      {...buttonProps}
      {...rest}
    >
      <span className={styles.circle}>
        <Icon name={icon} />
      </span>
      {label}
    </Component>
  )
}
