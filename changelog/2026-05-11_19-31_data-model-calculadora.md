# Redactado el modelo de datos de la calculadora científica

**Fecha:** 2026-05-11 19:31
**Tipo:** Documentación

## Qué se hizo

Se rellenó `docs/data-model.md` por primera vez. Decisiones registradas:

- **Sin base de datos.** El modelo de datos vive como tipos de TypeScript y
  se persiste en `localStorage`.
- **Entidades documentadas:** `Token`, `CalculatorState`, `HistoryEntry`,
  `ThemeValue`, `CalcError` (con códigos tipados y mapeo a microcopy).
- **Esquema de `localStorage`:** claves prefijadas y versionadas
  (`calc.theme`, `calc.history.v1`).
- **Reglas de escritura:** capa única (`lib/history.ts` + `useLocalStorage`),
  try/catch en parseo, fallback en memoria si `localStorage` no está
  disponible.
- **Límite del historial:** 100 entradas (FIFO).
- **Versionado de claves:** sufijo `v1` para preparar futuras migraciones.
- **No hay políticas de acceso ni datos seed** (no aplica al no haber backend).

## Qué se modificó

- `docs/data-model.md` — pasó de plantilla vacía a documento completo.
- `changelog/2026-05-11_19-31_data-model-calculadora.md` — nueva entrada.

## Por qué

Quinto documento del flujo. Cierra el contrato de datos (tipos TS + claves
de `localStorage`) que el motor, el reducer y los componentes consumirán.
Tener los tipos definidos ahora evita inconsistencias durante la
implementación.
