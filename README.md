# Calculadora científica

Calculadora científica web personal con historial persistente en el
navegador. Sin cuentas, sin publicidad, sin backend.

---

## Qué es esto

Una SPA (single page app) que sustituye a la calculadora del sistema operativo
o a las calculadoras online llenas de anuncios. Soporta las operaciones
aritméticas básicas y las funciones científicas habituales: logaritmos,
raíz cuadrada, potencias arbitrarias, trigonometría (en grados), factorial y
las constantes π y e.

Cada operación que evalúas queda registrada en un historial persistente
(`localStorage`) que sobrevive al cierre de la pestaña. Tiene modo claro y
modo oscuro, soporta el teclado físico y es completamente responsive.

Construida como ejercicio de aprendizaje de **Vite + React + TypeScript +
Tailwind**.

---

## Requisitos previos

- Node.js 18+ (probado con Node 22)
- npm 9+

---

## Variables de entorno

Ninguna. La app no se comunica con ningún servicio externo en runtime.

---

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo (http://localhost:5173)
npm run dev

# Build de producción (genera dist/)
npm run build

# Ejecutar tests del motor de cálculo
npm test

# Comprobación de tipos
npm run typecheck
```

---

## Estructura del proyecto

```
src/
├── main.tsx            → Entry point
├── App.tsx             → Composición raíz (providers + layout)
├── index.css           → Tokens CSS y reset
├── components/         → Display, Keypad, CalculatorButton,
│                         HistoryPanel, HistoryEntry, ThemeToggle
├── state/              → Reducer + Context + tipos de acciones
├── lib/
│   ├── engine/         → tokenize → parse → evaluate → format
│   └── history.ts      → Persistencia del historial en localStorage
├── hooks/              → useTheme, useKeyboard
├── types/              → Tipos compartidos (Token, CalculatorState, ...)
└── test/               → Tests con Vitest
docs/                   → PRD, arquitectura, data-model, design-system, ...
changelog/              → Registro cronológico de cambios
mejoras/                → Backlog de ideas
```

---

## Atajos de teclado

| Tecla | Acción |
|-------|--------|
| `0`–`9`, `.` | Introducir dígito |
| `+`, `-`, `*`, `/`, `^` | Operadores |
| `(`, `)` | Paréntesis |
| `!` | Factorial |
| `Enter` o `=` | Evaluar |
| `Backspace` | Borrar último carácter |
| `Escape` | Limpiar todo (AC) |

---

## Cómo contribuir o trabajar en el proyecto

1. Lee `CLAUDE.md` antes de hacer cualquier cambio.
2. Consulta `docs/` para entender las decisiones de diseño y arquitectura.
3. Registra cualquier cambio relevante en `changelog/`.
4. Si tienes ideas de mejora que no entran ahora, añádelas a `mejoras/`.

---

## Estado del proyecto

En desarrollo (MUST del PRD entregado).

Última actualización: 2026-05-11.
