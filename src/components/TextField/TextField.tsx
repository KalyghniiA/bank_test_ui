import { useId, type InputHTMLAttributes, type Ref } from 'react'
import { Icon } from '../../icons/Icon'
import styles from './TextField.module.css'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  /** Подсказка под полем. Скрывается, когда есть ошибка. */
  hint?: string
  /** Текст ошибки. Поле подсвечивается, ошибка связывается с полем для скринридера. */
  error?: string
  /** Ref на <input> — нужен, например, react-hook-form. */
  ref?: Ref<HTMLInputElement>
}

/** Поле ввода с подписью над ним и ошибкой текстом под ним (не только цветом). */
export function TextField({ label, hint, error, className, ref, ...inputProps }: TextFieldProps) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error ?? hint

  return (
    <div className={[styles.field, error && styles.invalid, className].filter(Boolean).join(' ')}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={styles.input}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...inputProps}
      />
      {error ? (
        <p id={messageId} className={styles.error}>
          <Icon name="alert-circle" size={16} />
          {error}
        </p>
      ) : (
        hint && (
          <p id={messageId} className={styles.hint}>
            {hint}
          </p>
        )
      )}
    </div>
  )
}
