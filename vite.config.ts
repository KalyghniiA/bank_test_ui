/// <reference types="vitest/config" />
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Библиотечный режим: dist/index.js (ESM) и один общий dist/style.css.
// Объявления типов (dist/*.d.ts) генерирует tsc — см. tsconfig.build.json.
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Читаемые имена классов (Button_primary_x1y2z) — удобно смотреть в DevTools.
      generateScopedName: '[name]_[local]_[hash:base64:5]',
    },
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'style',
    },
    // Не очищаем dist при сборке: туда же пишет tsc. Очистка — в npm-скрипте clean.
    emptyOutDir: false,
    sourcemap: true,
    rolldownOptions: {
      // React не вшиваем: его даёт приложение, иначе будет два React и хуки сломаются.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  test: {
    environment: 'node',
  },
})
