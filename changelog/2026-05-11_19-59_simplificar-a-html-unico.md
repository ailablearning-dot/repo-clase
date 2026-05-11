# Simplificar la calculadora a un único archivo HTML

**Fecha:** 2026-05-11 19:59
**Tipo:** Refactor

## Qué se hizo

Se eliminó el setup de **Vite + React + TypeScript + Tailwind** y la
aplicación pasó a ser **un solo archivo `calculadora.html`** autocontenido
(CSS y JS inline).

La funcionalidad entregada al usuario es la misma:

- Operaciones básicas y científicas (log, ln, √, x^y, sin/cos/tan en grados,
  π, e, factorial, paréntesis).
- Historial persistente en `localStorage`.
- Modo claro / oscuro.
- Entrada por teclado físico.
- Errores manejados con mensajes en español.

## Qué se modificó

**Eliminado:**

- `src/` (todo el código React: componentes, hooks, state, engine, types,
  tests).
- `package.json`, `package-lock.json`, `node_modules/`.
- `tsconfig.json`, `vite.config.ts`, `tailwind.config.ts`,
  `postcss.config.js`, `.eslintrc.cjs`.
- `index.html` (era el entry de Vite).

**Conservado:**

- `calculadora.html` — la app entera.
- `docs/` y `changelog/` — historia y decisiones del producto.
- `mejoras/`, `README.md`, `CLAUDE.md`.

**Actualizado:**

- `README.md` — instrucciones nuevas ("doble clic y funciona").

## Por qué

La complejidad del setup anterior (React + Vite + TS + Tailwind + Vitest + 34
archivos fuente) era desproporcionada para el alcance real del producto: una
calculadora personal de uso individual. El usuario lo expresó con claridad:
*"demasiado trabajo para algo tan sencillo, solo quiero un html para la
calculadora"*.

Un archivo HTML estático elimina:

- Instalación (`npm install`).
- Servidor de desarrollo.
- Toolchain de build.
- Mantenimiento de dependencias.

Y mantiene todas las funcionalidades del MUST del PRD. Para distribuir la
app, basta con copiar un archivo.

## Nota sobre los docs

Los documentos en `docs/architecture.md` y `docs/data-model.md` describen una
arquitectura React que ya no existe. Quedan como referencia del diseño que se
exploró antes de simplificar. Si más adelante se decide retomar esa vía, el
camino ya está pensado. Si se quiere mantener coherencia, conviene actualizar
o anotar esos documentos.
