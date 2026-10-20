import type { ElementType, ReactNode } from 'react'
import { Icon, type IconName } from '../../icons/Icon'
import type { PolymorphicProps } from '../../types/polymorphic'
import { Spinner } from '../Spinner/Spinner'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'l' | 'm'

interface ButtonOwnProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Идёт запрос: кнопка заблокирована и показывает спиннер (защита от двойного нажатия). */
  loading?: boolean
  fullWidth?: boolean
  icon?: IconName
  className?: string
  children?: ReactNode
}

/**
 * По умолчанию — <button type="button">. Через `as` можно отрисовать ссылкой в виде кнопки:
 * <Button as={Link} to="/transfer">Перевести</Button> — переход остаётся переходом (Ctrl+клик, новая вкладка).
 */
export type ButtonProps<C extends ElementType = 'button'> = PolymorphicProps<C, ButtonOwnProps>

export function Button<C extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'l',
  loading = false,
  fullWidth = false,
  icon,
  className,
  children,
  ...rest
}: ButtonProps<C>) {
  const Component: ElementType = as ?? 'button'
  // Настоящей кнопке — type="button" по умолчанию (не отправлять форму случайно) и disabled на время загрузки.
  const elementProps =
    as === undefined
      ? {
          type: 'button',
          ...rest,
          disabled: Boolean((rest as { disabled?: boolean }).disabled) || loading,
        }
      : rest

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
    <Component className={classes} aria-busy={loading || undefined} {...elementProps}>
      {loading ? <Spinner size={iconSize} /> : icon && <Icon name={icon} size={iconSize} />}
      {children}
    </Component>
  )
}
