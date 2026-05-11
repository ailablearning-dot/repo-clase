# Redactada la arquitectura técnica de la calculadora científica

**Fecha:** 2026-05-11 19:30
**Tipo:** Documentación

## Qué se hizo

Se rellenó `docs/architecture.md` por primera vez. Decisiones registradas:

- **Stack:** Vite 5 + React 18 + TypeScript (strict), Tailwind CSS, Vitest,
  ESLint + Prettier, despliegue en Vercel.
- **Estado:** `useReducer` + Context API (decisión razonada frente a Zustand).
- **Motor de cálculo propio** (tokenize → parse con shunting-yard → evaluate
  → format) en `src/lib/engine/`, en lugar de `eval` o `mathjs`. Trigonometría
  siempre en grados.
- **Persistencia:** `localStorage` con claves versionadas (`calc.theme`,
  `calc.history.v1`). Historial limitado a 100 entradas (FIFO).
- **Estructura de carpetas** completa documentada (`components/`, `state/`,
  `lib/engine/`, `hooks/`, `types/`, `test/`).
- **CI:** GitHub Actions con `lint`, `typecheck`, `test`, `build`. Deploys
  desde Vercel solo si la CI pasa.
- **Sin auth, sin integraciones externas en runtime, sin PWA en v1.**

## Qué se modificó

- `docs/architecture.md` — pasó de plantilla vacía a documento completo.
- `changelog/2026-05-11_19-30_architecture-calculadora.md` — nueva entrada.

## Por qué

Cuarto documento del flujo definido en `CLAUDE.md`. Fija el stack y la
estructura para que el data-model y el roadmap se construyan sobre una base
técnica concreta, y para que cuando empiece la implementación las decisiones
ya estén tomadas (no haya que decidir Zustand vs Context o eval vs motor
propio sobre la marcha).
