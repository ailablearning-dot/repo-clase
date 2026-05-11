# Redactado el design system de la calculadora científica

**Fecha:** 2026-05-11 19:27
**Tipo:** Documentación

## Qué se hizo

Se rellenó `docs/design-system.md` por primera vez. Decisiones registradas:

- **Estética:** minimalista, sobria, tipo Apple/Vercel/Linear. Sin gradientes
  ni adornos. La calculadora "desaparece" para que el número sea protagonista.
- **Paleta:** tokens semánticos (`--bg`, `--fg`, `--accent`, etc.) con valor
  en modo claro y oscuro. Acento azul eléctrico `#3B82F6`. Modo oscuro por
  defecto, respetando `prefers-color-scheme` en la primera visita.
- **Tipografía:** Inter para UI, JetBrains Mono para display e historial.
  `tabular-nums` en zonas numéricas.
- **Layout responsive:** desktop (≥1024px) con calculadora + historial en
  paralelo; tablet apilado; móvil con historial en panel deslizante.
- **Componentes definidos:** `CalculatorButton` (con variantes digit /
  operator / equals / scientific / utility), `Display`, `HistoryPanel`,
  `HistoryEntry`, `ThemeToggle`.
- **Accesibilidad:** AA en ambos temas, navegación por teclado, `role=status`
  en display, `prefers-reduced-motion` respetado.
- **Microcopy:** español neutro, mensajes de error específicos, sin emojis.

## Qué se modificó

- `docs/design-system.md` — pasó de plantilla vacía a documento completo.
- `changelog/2026-05-11_19-27_design-system-calculadora.md` — nueva entrada.

## Por qué

Tercer documento del flujo definido en `CLAUDE.md` (prd → business →
design-system → architecture → data-model → roadmap). Fija el lenguaje visual
para que cuando empiece la implementación los componentes nazcan ya alineados
con la identidad del producto.
