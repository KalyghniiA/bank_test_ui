import { useState, type ReactNode } from 'react'
import { Icon, type IconName } from '../../icons/Icon'
import styles from './Alert.module.css'

export type AlertVariant = 'error' | 'warning' | 'info' | 'success'

const defaultIcons: Record<AlertVariant, IconName> = {
  error: 'alert-circle',
  warning: 'alert-circle',
  info: 'info',
  success: 'check-circle',
}

export interface AlertProps {
  variant: AlertVariant
  title: string
  children?: ReactNode
  icon?: IconName
  /** requestId серверной ошибки (5xx): показывается как «Код для поддержки» с копированием. */
  supportCode?: string
  className?: string
}

/** Уведомление в потоке страницы. Ошибки объявляются скринридером сразу (role="alert"). */
export function Alert({ variant, title, children, icon, supportCode, className }: AlertProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={[styles.alert, styles[variant], className].filter(Boolean).join(' ')}
    >
      <Icon name={icon ?? defaultIcons[variant]} size={20} className={styles.icon} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {children && <div className={styles.text}>{children}</div>}
        {supportCode && <SupportCode code={supportCode} />}
      </div>
    </div>
  )
}

function SupportCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Буфер обмена недоступен (нет HTTPS или запрещено) — код всё равно виден на экране.
    }
  }

  return (
    <p className={styles.support}>
      <span className={styles.code}>Код для поддержки: {code}</span>
      <button type="button" className={styles.copy} onClick={() => void copy()}>
        <Icon name={copied ? 'check-circle' : 'copy'} size={16} />
        <span aria-live="polite">{copied ? 'Скопировано' : 'Скопировать'}</span>
      </button>
    </p>
  )
}
