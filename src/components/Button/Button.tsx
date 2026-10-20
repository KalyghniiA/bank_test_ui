import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '../../icons/Icon'
import { Spinner } from '../Spinner/Spinner'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'l' | 'm'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Идёт запрос: кнопка заблокирована и показывает спиннер (защита от двойного нажатия). */
  loading?: boolean
  fullWidth?: boolean
  icon?: IconName
}

export function Button({
  variant = 'primary',
  size = 'l',
  loading = false,
  fullWidth = false,
  icon,
  type = 'button',
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const iconSize = size === 'l' ? 20 : 16

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner size={iconSize} /> : icon && <Icon name={icon} size={iconSize} />}
      {children}
    </button>
  )
}
