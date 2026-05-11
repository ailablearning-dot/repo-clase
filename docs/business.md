# Modelo de negocio

<!-- Contexto comercial del proyecto. Útil para que el agente entienda las restricciones
     y prioridades de negocio que afectan a las decisiones técnicas.
     Actualizar si cambia el modelo de monetización, el pricing o la estrategia. -->

---

## Propuesta de valor

Una calculadora científica web personal que está siempre a un clic, recuerda
las operaciones realizadas entre sesiones y no exige cuenta ni muestra
publicidad. Sirve además como ejercicio de aprendizaje de **Vite + React**.

---

## Modelo de monetización

**Sin monetización.** El proyecto es 100% personal y no genera ni busca generar
ingresos:

- No hay tiers, ni pago único, ni suscripción, ni donaciones.
- No hay publicidad.
- No hay analítica de terceros ni telemetría.

La sostenibilidad económica no aplica: el coste de mantenimiento es cero
(hosting estático gratuito o ejecución local) y no hay usuarios externos a los
que dar soporte.

---

## Competidores y diferenciación

No es un proyecto que compita en el mercado. Aun así, las alternativas que el
usuario tiene hoy y por qué este producto le encaja mejor:

| Alternativa | Qué hace | Por qué construimos esto en su lugar |
|-------------|----------|--------------------------------------|
| Calculadora del SO (Windows/macOS/Linux) | Calculadora científica nativa. | No mantiene historial entre sesiones, hay que abrir otra app. |
| Google "calculadora" en buscador | Calculadora en la SERP. | No tiene historial, requiere conexión, mezcla resultados de búsqueda. |
| Calculadoras online (web aleatoria) | Calculadoras con anuncios. | Llenas de publicidad, dependencia de un tercero, trackers. |
| Calculadora física | Hardware dedicado. | Hay que tenerla a mano, no se integra con el flujo en navegador. |

**Diferenciación:** una pestaña en el navegador, historial persistente, cero
fricción, cero anuncios, totalmente bajo control del usuario.

---

## Métricas de éxito

Como es un proyecto personal con objetivo de aprendizaje, las métricas no son
de adopción sino de proceso y calidad:

- **Aprendizaje completado:** el autor termina el proyecto habiendo
  interiorizado los conceptos clave de Vite + React (componentes, estado,
  hooks, persistencia, theming).
- **Calidad técnica:** código limpio, tipado correctamente, sin warnings, con
  build estable.
- **Funcionalidad MUST entregada:** todo lo marcado como MUST en el PRD está
  implementado y funciona en los navegadores soportados.

No se miden DAU/MAU, retención, conversión ni NPS — el único usuario es el
autor.

---

## Riesgos identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Pérdida del historial al limpiar datos del navegador o cambiar de equipo | Alta | Bajo | Aceptado en v1. Si molesta, evaluar exportación a archivo (COULD). |
| Imprecisión de coma flotante de JS (`0.1 + 0.2 ≠ 0.3`) | Alta | Medio | Documentar la limitación y, si afecta, valorar `decimal.js` o redondeo controlado en display. |
| Sobreingeniería por estar aprendiendo (añadir features fuera de scope) | Media | Medio | El PRD y el roadmap son fuente de verdad; cualquier idea extra va a `mejoras/`. |
| Abandono del proyecto antes de terminar el MUST | Media | Alto (para aprendizaje) | Mantener scope mínimo y entregar en pequeños incrementos verificables. |

---

## Restricciones

- **Tiempo:** proyecto en huecos, sin deadline duro. No comprometerse con
  features que no caben en una sesión razonable.
- **Tecnología impuesta:** Vite + React (decisión consciente para aprender ese
  stack). No usar otros frameworks aunque encajaran mejor.
- **Sin backend:** todo lo que necesite servidor está fuera de alcance. La
  persistencia se limita a `localStorage`.
- **Sin gastos:** hosting estático gratuito (GitHub Pages, Vercel free tier o
  similar). No contratar servicios de pago.
- **Idioma:** español. No invertir esfuerzo en i18n en v1.
