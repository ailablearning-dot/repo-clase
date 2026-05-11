# Design System

<!-- Fuente de verdad visual del proyecto.
     Consultar antes de crear cualquier componente nuevo.
     Actualizar cuando se añadan nuevos patrones, componentes o se modifique la identidad visual. -->

---

## Principios

1. **Minimalismo funcional:** todo lo visible tiene un propósito. Sin
   adornos decorativos.
2. **Legibilidad ante todo:** el display y los números son el protagonista.
   Alto contraste, tipografía clara, alineación impecable.
3. **Respuesta inmediata:** cada interacción tiene feedback visual (hover,
   active, focus) en < 100 ms.
4. **Coherencia entre temas:** modo claro y oscuro comparten layout y
   espaciado. Solo cambian los tokens de color.

---

## Paleta de colores

La paleta se define con **tokens semánticos** (qué hace cada color), no con
nombres de color crudos. Cada token tiene un valor en modo claro y en oscuro.

| Token | Uso | Claro | Oscuro |
|-------|-----|-------|--------|
| `--bg` | Fondo principal | `#FFFFFF` | `#0B0F14` |
| `--bg-elevated` | Display, panel de historial | `#F4F6F8` | `#141A22` |
| `--bg-button` | Botones numéricos | `#F4F6F8` | `#1B232D` |
| `--bg-button-op` | Botones de operador (+, −, ×, ÷) | `#E6EAEF` | `#222B37` |
| `--bg-button-sci` | Botones científicos (log, sin, √…) | `#ECEFF3` | `#1E2733` |
| `--fg` | Texto principal | `#0B0F14` | `#E6EAEF` |
| `--fg-muted` | Texto secundario (historial antiguo, hints) | `#5B6573` | `#8A95A3` |
| `--border` | Bordes finos, separadores | `#E1E5EB` | `#222B37` |
| `--accent` | Color de marca y botón `=` | `#3B82F6` | `#3B82F6` |
| `--accent-fg` | Texto sobre `--accent` | `#FFFFFF` | `#FFFFFF` |
| `--danger` | Errores en el display | `#DC2626` | `#F87171` |
| `--focus-ring` | Anillo de foco accesible | `#3B82F6` | `#60A5FA` |

**Tema por defecto:** oscuro. Se respeta `prefers-color-scheme` en la primera
visita y la elección del usuario se persiste en `localStorage` con la clave
`theme` (`light` | `dark`).

**Contraste:** todos los pares texto/fondo cumplen **WCAG AA** (≥ 4.5:1 para
texto normal, ≥ 3:1 para texto grande y elementos UI).

---

## Tipografía

| Familia | Uso | Pesos |
|---------|-----|-------|
| **Inter** | UI general, botones, etiquetas | 400, 500, 600 |
| **JetBrains Mono** | Display y entradas del historial | 400, 600 |

Fallbacks:
- Inter: `system-ui, -apple-system, "Segoe UI", sans-serif`.
- JetBrains Mono: `ui-monospace, "SF Mono", Menlo, Consolas, monospace`.

### Escala tipográfica

| Token | Tamaño | Line height | Uso |
|-------|--------|-------------|-----|
| `--fs-xs` | 12 px | 16 px | Timestamp del historial, badge `DEG` |
| `--fs-sm` | 14 px | 20 px | Texto secundario, expresión del historial |
| `--fs-base` | 16 px | 24 px | Texto general, labels de botones |
| `--fs-btn` | 20 px | 24 px | Símbolos de botones |
| `--fs-expr` | 22 px | 28 px | Expresión en construcción dentro del display |
| `--fs-result` | 44 px | 52 px | Resultado principal del display |

En display e historial: `font-variant-numeric: tabular-nums;` para alineación
de dígitos.

---

## Espaciado y grid

Sistema basado en múltiplos de **4 px**.

| Token | Valor |
|-------|-------|
| `--space-1` | 4 px |
| `--space-2` | 8 px |
| `--space-3` | 12 px |
| `--space-4` | 16 px |
| `--space-5` | 20 px |
| `--space-6` | 24 px |
| `--space-8` | 32 px |

Anchura máxima del contenedor: **1200 px**, centrado.

### Layout responsive

- **Escritorio (≥ 1024 px):** calculadora a la izquierda, historial a la
  derecha. Ambos visibles a la vez.
- **Tablet (640–1023 px):** calculadora arriba, historial debajo.
- **Móvil (< 640 px):** calculadora a pantalla completa. Historial en panel
  deslizante desde abajo con un botón "Historial".

---

## Estilo de componentes

### Radios

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | 8 px | Inputs pequeños, badges |
| `--radius-md` | 12 px | Botones de la calculadora |
| `--radius-lg` | 16 px | Display, panel de historial, tarjetas |

### Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-1` | `0 1px 2px rgba(0,0,0,0.06)` | Botones en reposo (solo claro) |
| `--shadow-2` | `0 4px 12px rgba(0,0,0,0.08)` | Display, paneles elevados |

En modo oscuro las sombras se sustituyen por bordes sutiles (`--border`) para
mantener jerarquía sin lavado.

### Densidad

Estándar. Botones con padding cómodo para tap en móvil: mínimo **44×44 px**.

### Iconos

**Lucide React** (`lucide-react`). Tamaño base 20 px, stroke 1.75 px.

Iconos previstos: `Sun`, `Moon`, `Trash2`, `Copy`, `Clock`, `Calculator`.

---

## Tono visual

Sobrio, técnico y silencioso. La calculadora "desaparece" para que el número
sea el único protagonista. Nada de gradientes llamativos, glassmorphism,
sombras dramáticas o emojis. El acento azul aparece solo donde aporta
información (botón `=`, foco, hover sutil) — el resto es escala de grises.

Debe transmitir precisión y control. NO debe parecer una app de juguete,
ni una calculadora retro nostálgica, ni una pieza de marketing.

---

## Componentes definidos

### CalculatorButton

Botón cuadrado/rectangular reutilizable de la calculadora. Tamaño mínimo
44×44 px, `border-radius: var(--radius-md)`, tipografía `--fs-btn`.

**Props principales:**
- `variant: 'digit' | 'operator' | 'scientific' | 'utility' | 'equals'`
- `label: string` (símbolo visible)
- `ariaLabel?: string` (cuando el símbolo no es texto plano, ej. `√`, `⌫`)
- `onClick: () => void`
- `disabled?: boolean`

**Variantes y tokens:**

| Variante | Fondo | Texto | Ejemplos |
|----------|-------|-------|----------|
| `digit` | `--bg-button` | `--fg` | `0–9`, `.`, `π`, `e` |
| `operator` | `--bg-button-op` | `--fg` | `+`, `−`, `×`, `÷` |
| `equals` | `--accent` | `--accent-fg` | `=` |
| `scientific` | `--bg-button-sci` | `--fg` | `log`, `ln`, `sin`, `cos`, `tan`, `√`, `x^y`, `n!` |
| `utility` | `--bg-button-sci` | `--fg-muted` | `C`, `AC`, `⌫`, `(`, `)` |

**Estados:**
- `hover`: `filter: brightness(1.05)` claro / `1.10` oscuro.
- `active`: `transform: scale(0.97)`, transición 80 ms.
- `focus-visible`: anillo `2px solid var(--focus-ring)` con offset `2px`.
- `disabled`: opacidad 0.4, sin hover.

### Display

Tarjeta elevada (`--bg-elevated`, `--radius-lg`, `--shadow-2`) con dos zonas
apiladas verticalmente y alineadas a la derecha:

1. **Expresión en curso** — arriba, `--fs-expr`, `--fg-muted`.
2. **Resultado o valor actual** — abajo, `--fs-result`, `--fg`, JetBrains Mono.

Badge `DEG` arriba a la izquierda en `--fs-xs` color `--fg-muted`. En v1 fijo;
preparado para toggle `RAD` en una versión futura.

Cuando hay error: el resultado se sustituye por el mensaje en `--danger` con
peso 500. Anuncio accesible vía `role="status"` + `aria-live="polite"`.

### HistoryPanel

Lista vertical scrollable dentro de tarjeta (`--bg-elevated`, `--radius-lg`).

Cada **HistoryEntry**:

- Línea 1: **expresión** — JetBrains Mono, `--fs-sm`, `--fg-muted`.
- Línea 2: **resultado** — JetBrains Mono, `--fs-base`, `--fg`, alineado a la
  derecha.
- Línea 3: **timestamp relativo** — `--fs-xs`, `--fg-muted` ("hace 2 min").

Separador entre entradas: `1px solid var(--border)`.

**Estado vacío:** icono `Clock` + texto "Sin operaciones todavía".

### ThemeToggle

Botón circular de 40×40 px con icono `Sun` / `Moon`. Esquina superior derecha
de la app. Cambio animado en 200 ms (fade + ligera rotación).

---

## Movimiento

- **Transición estándar:** 150 ms `ease-out` para color, fondo y borde.
- **Pulsación de botón:** 80 ms `ease-out` para `transform`.
- **Cambio de tema:** 200 ms en todas las variables CSS.
- **Aparición de entrada en historial:** fade-in 200 ms + slide 4 px desde
  abajo.

Respetar `prefers-reduced-motion: reduce` desactivando animaciones no
esenciales.

---

## Accesibilidad

- Botones interactivos siempre son `<button>` con `aria-label` cuando el
  símbolo no es texto plano.
- Display marcado con `role="status"` y `aria-live="polite"`.
- Navegación completa por teclado:
  - Tab entre botones, Enter/Space para activar.
  - Atajos: dígitos, operadores, `Enter` (=), `Backspace` (⌫), `Escape` (AC).
- Contraste mínimo AA en ambos temas.
- `prefers-reduced-motion` respetado.

---

## Tono y voz (microcopy)

- **Directo y sin adornos.** Sin emojis, sin signos de exclamación.
- **Errores específicos:** "División por cero", "Raíz de número negativo",
  "Factorial solo para enteros ≥ 0". Nunca "Algo salió mal".
- **Estado vacío del historial:** "Sin operaciones todavía".
- **Idioma:** español neutro.

---

## Referencias visuales

- Apple Calculator (iOS/macOS) — jerarquía de display y agrupación de
  operadores.
- Vercel / Linear — uso restringido del color, neutros como base, acento solo
  donde importa.
- Soulver — claridad del display y tratamiento tipográfico monoespaciado.

---

## Tokens en CSS

Los tokens se exponen como variables CSS en `:root` (modo claro) y
`:root[data-theme="dark"]` (modo oscuro). Si más adelante se introduce
Tailwind, se mapean en `tailwind.config` para que las clases utilitarias
respeten el tema.
