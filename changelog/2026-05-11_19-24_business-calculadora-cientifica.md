# Redactado el modelo de negocio de la calculadora científica

**Fecha:** 2026-05-11 19:24
**Tipo:** Documentación

## Qué se hizo

Se rellenó `docs/business.md` por primera vez. Decisiones registradas:

- **Sin monetización:** proyecto 100% personal, sin ads, sin tracking, sin
  donaciones.
- **Propuesta de valor:** calculadora personal con historial persistente +
  ejercicio de aprendizaje de Vite + React.
- **Métricas de éxito** orientadas a proceso y calidad (aprendizaje
  completado, calidad técnica, MUST entregado), no a adopción.
- **Riesgos identificados:** pérdida de historial al limpiar el navegador,
  imprecisión de coma flotante de JS, sobreingeniería, abandono.
- **Restricciones:** Vite + React obligado por aprendizaje, sin backend, sin
  gastos, idioma español, sin deadline duro.

## Qué se modificó

- `docs/business.md` — pasó de plantilla vacía a documento completo.
- `changelog/2026-05-11_19-24_business-calculadora-cientifica.md` — nueva
  entrada.

## Por qué

Siguiendo el orden definido en `CLAUDE.md` (prd → business → design-system →
architecture → data-model → roadmap), tocaba consolidar el contexto comercial
para que las próximas decisiones técnicas se tomen con esas restricciones
claras (no backend, no gastos, alcance mínimo).
