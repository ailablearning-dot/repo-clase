# Redactado el PRD inicial de la calculadora científica

**Fecha:** 2026-05-11 19:22
**Tipo:** Documentación

## Qué se hizo

Se rellenó por primera vez `docs/prd.md` con el alcance del producto:
calculadora científica web (SPA) de uso personal, construida con Vite + React,
con historial persistido en `localStorage` del navegador y sin backend.

Se decidió el alcance de funcionalidades en MoSCoW:

- **MUST:** operaciones básicas (+, −, ×, ÷), científicas (log, ln, √, x^y,
  sin, cos, tan en grados, π, e, factorial), entrada por teclado y por
  botones, gestión de errores, historial persistente, temas claro/oscuro y
  diseño responsive.
- **SHOULD/COULD:** copiar al portapapeles, reutilizar resultados del
  historial, exportar historial, toggle grados/radianes.
- **WON'T:** cuentas, sync entre dispositivos, gráficas, álgebra simbólica,
  conversión de unidades, monetización.

## Qué se modificó

- `docs/prd.md` — pasó de plantilla vacía a documento completo.
- `changelog/2026-05-11_19-22_prd-calculadora-cientifica.md` — nueva entrada.

## Por qué

Antes de escribir código, `CLAUDE.md` exige rellenar los documentos de `docs/`
en orden empezando por el PRD para fijar el alcance y el usuario. Este
documento es la base sobre la que se construirán `business.md`,
`design-system.md`, `architecture.md`, `data-model.md` y `roadmap.md`.
