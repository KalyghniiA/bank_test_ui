import { Icon } from '../../icons/Icon'
import styles from './Spinner.module.css'

export interface SpinnerProps {
  size?: number
  /** Текст для скринридера, например «Загрузка». Без него спиннер декоративный. */
  label?: string
}

export function Spinner({ size = 20, label }: SpinnerProps) {
  return <Icon name="spinner" size={size} label={label} className={styles.spinner} />
}
