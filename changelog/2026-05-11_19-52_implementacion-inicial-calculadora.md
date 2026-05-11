# Implementación inicial de la calculadora científica

**Fecha:** 2026-05-11 19:52
**Tipo:** Feature

## Qué se hizo

Primera implementación funcional de la calculadora científica web siguiendo
las especificaciones de `docs/prd.md`, `docs/design-system.md`,
`docs/architecture.md` y `docs/data-model.md`.

### Funcionalidades

**Operaciones MUST entregadas:**

- Aritmética básica: `+`, `−`, `×`, `÷`.
- Potencia (`x^y`), raíz cuadrada (`√`), logaritmo base 10 (`log`), logaritmo
  natural (`ln`).
- Trigonometría en grados: `sin`, `cos`, `tan`.
- Constantes: π, e.
- Factorial (`n!`).
- Paréntesis para agrupar.
- Manejo tipado de errores (división por cero, raíz de negativo, log de no
  positivo, factorial inválido, expresión incompleta, overflow).
- Entrada por **teclado físico** (dígitos, operadores, Enter `=`, Backspace
  `⌫`, Escape `AC`) y por botones en pantalla.
- **Historial** persistido en `localStorage` (`calc.history.v1`), límite 100
  entradas (FIFO). Cada entrada muestra expresión, resultado y tiempo
  relativo. Botón de borrar historial. Clic en una entrada para recuperar la
  expresión.
- **Tema claro/oscuro** con toggle, persistido en `localStorage`
  (`calc.theme`). Respeta `prefers-color-scheme` en la primera visita.
- Layout **responsive**: calculadora + historial en paralelo en escritorio,
  apilados en móvil.
- Accesibilidad: `role=status` + `aria-live` en el display, `aria-label` en
  todos los botones con símbolo no-textual, navegación completa por teclado,
  focus visible.

### Arquitectura entregada

- **Motor propio** en `src/lib/engine/`: `tokenize` → `parse` (recursive
  descent con precedencia correcta) → `evaluate` → `format`. Trigonometría
  evaluada en grados (conversión interna `× π/180`).
- **Reducer puro** (`src/state/calculatorReducer.ts`) con 12 acciones tipadas.
- **Context API** con hidratación inicial del historial vía lazy initializer
  de `useReducer`.
- **Hooks**: `useTheme` (toggle + persistencia), `useKeyboard` (atajos).
- **Persistencia** centralizada en `src/lib/history.ts` con fallback en
  memoria si `localStorage` no está disponible.

### Calidad

- TypeScript **strict** sin errores (`tsc --noEmit`).
- **17 tests del motor** pasando (Vitest): operaciones básicas, precedencia,
  paréntesis, todas las funciones científicas y todos los códigos de error.
- Build de producción correcto: 163 KB de JS (52 KB gzip).
- Dev server arranca en ~220 ms.

## Qué se modificó

**Configuración:**
- `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.ts`,
  `postcss.config.js`, `.eslintrc.cjs`, `.gitignore`, `index.html`.

**Código fuente:**
- `src/main.tsx`, `src/App.tsx`, `src/index.css`.
- `src/types/calculator.ts` — `Token`, `CalculatorState`, `HistoryEntry`,
  `CalcError`, `ERROR_MESSAGES`.
- `src/lib/engine/{tokenize,parse,evaluate,format,index}.ts`.
- `src/lib/history.ts`.
- `src/state/{actions,calculatorReducer,CalculatorContext}.{ts,tsx}`.
- `src/hooks/{useTheme,useKeyboard}.ts`.
- `src/components/{Display,Keypad,CalculatorButton,HistoryPanel,HistoryEntry,ThemeToggle}.tsx`.
- `src/test/{setup,engine.test}.ts`.

## Por qué

Cierra el MUST del PRD y deja la app utilizable de extremo a extremo. A
partir de aquí los SHOULD/COULD (copiar al portapapeles, exportar historial,
toggle DEG/RAD, animaciones avanzadas) pueden añadirse incrementalmente sin
tocar la arquitectura base.

## Cómo arrancar

```bash
npm install
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # build de producción en dist/
npm test          # ejecuta los tests del motor
npm run typecheck # comprobación de tipos sin emitir
```
