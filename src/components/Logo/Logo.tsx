import styles from './Logo.module.css'

export interface LogoProps {
  /** Показать только знак без слова «Банк» (например, в свёрнутом меню). */
  compact?: boolean
  className?: string
}

/** Условный логотип «Банк». */
export function Logo({ compact = false, className }: LogoProps) {
  return (
    <span className={[styles.logo, className].filter(Boolean).join(' ')}>
      <span className={styles.mark} aria-hidden="true">
        Б
      </span>
      {compact ? (
        <span className="visually-hidden">Банк</span>
      ) : (
        <span className={styles.name}>Банк</span>
      )}
    </span>
  )
}
