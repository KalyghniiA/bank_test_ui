# @bank/ui

UI-библиотека «Банка»: дизайн-токены из Figma, шрифт Onest, иконки, базовые компоненты и форматирование денег, дат и номеров счетов. Используется в `bank_client_test` и `bank_eployee_test`.

## Команды

| Команда | Что делает |
|---|---|
| `npm install` | установить зависимости |
| `npm run build` | собрать `dist/`: JS (Vite), типы `.d.ts` (tsc), `style.css` |
| `npm run dev` | пересобирать `dist/` при каждом изменении — держать запущенным, пока правишь библиотеку |
| `npm test` | тесты (Vitest) |
| `npm run typecheck` | проверка типов |
| `npm run format` | Prettier |

## Как подключить в приложении

```bash
npm install @bank/ui@file:../bank-ui
```

```ts
// main.tsx — один раз
import '@bank/ui/fonts.css' // шрифт Onest: только кириллица и латиница
import '@bank/ui/style.css' // токены, базовые стили, стили компонентов
```

```tsx
import { Button, formatMoney } from '@bank/ui'
```

В `vite.config.ts` приложения обязательно `resolve.dedupe: ['react', 'react-dom']` — библиотека подключена ссылкой на папку и иначе возьмёт свою копию React.

## Устройство

- `src/styles/tokens.css` — CSS-переменные: `--color-*`, `--space-*`, `--radius-*`, `--text-*`, `--shadow-*`. Имена повторяют Figma.
- `src/components/*` — компоненты, стили в CSS Modules (`*.module.css`).
- `src/format/*` — `formatMoney` (деньги строкой, без `number`), `formatDate`, `formatAccountNumber`.
- `fonts.css` — не собирается библиотекой, его собирает приложение (шрифты выходят отдельными `.woff2`).
- React — `peerDependency`, в сборку не входит.
