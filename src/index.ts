// Токены и глобальные стили попадают в dist/style.css. Шрифт подключается отдельно — см. fonts.css.
import './styles/tokens.css'
import './styles/base.css'

export { Icon, type IconName, type IconProps } from './icons/Icon'
export { Spinner, type SpinnerProps } from './components/Spinner/Spinner'
export {
  Button,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
} from './components/Button/Button'

export { formatMoney, type FormatMoneyOptions, type MoneyString } from './format/money'
export { formatDate, formatDateTime, formatTime } from './format/date'
export { formatAccountNumber, maskAccountNumber } from './format/account'
