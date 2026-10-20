import type { ReactNode } from 'react'
import { Icon, type IconName } from '../../icons/Icon'
import styles from './Badge.module.css'

export type BadgeTone = 'success' | 'danger' | 'warning' | 'info' | 'neutral'

export interface BadgeProps {
  tone: BadgeTone
  icon?: IconName
  children: ReactNode
  className?: string
}

/** Плашка статуса («Активен», «Заблокирован»). Смысл всегда передаёт текст, цвет — дополнение. */
export function Badge({ tone, icon, children, className }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[tone], className].filter(Boolean).join(' ')}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  )
}
