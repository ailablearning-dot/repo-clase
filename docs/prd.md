# Product Requirements Document (PRD)

<!-- Fuente de verdad sobre qué construimos y por qué.
     Actualizar este archivo cuando cambie el alcance, las funcionalidades o el usuario objetivo.
     Si algo se mueve a "fuera de alcance", no borrar: mover a la sección correspondiente. -->

---

## Resumen ejecutivo

Calculadora científica web de uso personal. Una aplicación SPA (sin backend) que
permite realizar operaciones aritméticas básicas y científicas (logaritmos,
potencias, raíces, trigonometría, factorial, constantes matemáticas) y mantiene
un historial de las operaciones realizadas, persistido en el navegador.

El producto nace como herramienta personal: rápida de abrir, sin login, sin
publicidad, accesible desde cualquier navegador moderno. Funciona offline una
vez cargada.

---

## Problema que resuelve

Al hacer cálculos del día a día (estudio, trabajo, gastos), las calculadoras
del sistema operativo son funcionales pero pierden el historial al cerrarlas y
las calculadoras online suelen estar llenas de publicidad o requieren
registrarse para guardar operaciones.

Necesito una calculadora científica que:

- Esté siempre a un clic en el navegador
- Recuerde las operaciones que he hecho aunque cierre la pestaña
- No me pida cuenta ni me muestre anuncios
- Tenga las funciones científicas que uso (logaritmos, potencias, trigonometría)

---

## Usuario objetivo

**Único perfil: el propietario del proyecto (uso personal).**

- Persona técnica, cómoda con calculadoras científicas.
- Usa el navegador como entorno principal de trabajo.
- Quiere algo simple, rápido y sin fricción (sin registro, sin sincronización
  entre dispositivos).
- Acepta que el historial vive en un solo navegador y se puede perder si limpia
  los datos de sitio.

---

## Funcionalidades core (MoSCoW)

### MUST

- **Operaciones básicas:** suma (+), resta (−), multiplicación (×), división (÷).
- **Operaciones científicas:**
  - Logaritmo base 10 (`log`) y logaritmo natural (`ln`).
  - Raíz cuadrada (`√`) y potencia arbitraria (`x^y`).
  - Trigonometría en grados: `sin`, `cos`, `tan`.
  - Constantes: π y e.
  - Factorial (`n!`).
- **Display de la calculadora** que muestra la expresión actual y el resultado.
- **Entrada por teclado físico** (números, operadores, Enter para `=`,
  Backspace para borrar, Escape para limpiar).
- **Entrada por botones en pantalla** (clic / tap).
- **Gestión de errores:** división por cero, raíz de negativo, log de cero o
  negativo, factorial de no enteros o negativos — se muestran como mensaje en
  el display sin romper la app.
- **Historial:**
  - Persistencia en `localStorage` del navegador.
  - Lista visible de operaciones recientes (expresión + resultado + timestamp).
  - Se conserva entre sesiones del mismo navegador.
- **Tema visual:** modo claro y modo oscuro con toggle. Estética moderna
  minimalista. Modo oscuro por defecto.
- **Responsive:** funciona en escritorio y móvil.

### SHOULD

- Indicador visible del modo de ángulos (solo grados en v1, pero el badge
  prepara el terreno para añadir radianes después).
- Atajo para copiar el resultado al portapapeles.
- Animaciones sutiles al pulsar botones.

### COULD

- Reutilizar un resultado del historial haciendo clic en él.
- Borrar entradas individuales del historial.
- Exportar historial (txt/csv).
- Memoria (M+, M−, MR, MC).
- Toggle grados/radianes.

### WON'T (esta versión)

- Cuentas de usuario y sincronización entre dispositivos.
- Backend, base de datos en la nube.
- Gráficas de funciones.
- Cálculo simbólico / álgebra (resolver ecuaciones, derivadas, integrales).
- Conversión de unidades.
- Soporte multi-idioma (la app está en español).
- PWA / instalación como app (puede pasar a SHOULD más adelante).

---

## Flujos de usuario principales

**Flujo de cálculo básico:**
El usuario abre la web, ve la calculadora con el display vacío y los botones.
Introduce una expresión (`3 + 4 × 2`) por teclado o clic. Pulsa `=` o Enter.
El display muestra el resultado (`11`). La operación se añade al historial
visible en un panel lateral o inferior.

**Flujo de operación científica:**
El usuario quiere calcular `log(100)`. Pulsa el botón `log`, introduce `100`,
pulsa `)` (o el botón equivalente) y `=`. El resultado (`2`) aparece en el
display y se guarda en el historial.

**Flujo de consultar historial:**
El usuario hace scroll por el historial. Ve operaciones anteriores con su
expresión y su resultado. Las entradas más recientes aparecen arriba.

**Flujo de error:**
El usuario intenta dividir por cero. El display muestra `Error: división por
cero`. La operación errónea no se añade al historial (o se añade marcada como
error — a decidir en implementación). El usuario pulsa cualquier tecla
numérica o `C` y la calculadora vuelve al estado normal.

---

## Requisitos no funcionales

- **Rendimiento:** primera carga < 2s en conexión normal. Interacción < 50ms.
- **Accesibilidad:** navegable por teclado, contraste AA en ambos temas, roles
  ARIA en los botones.
- **Sin dependencias de red en runtime:** una vez cargada, la app funciona sin
  internet.
- **Privacidad:** no se envía ningún dato a ningún servidor. El historial vive
  solo en el navegador del usuario.
- **Navegadores soportados:** últimas dos versiones de Chrome, Firefox, Safari
  y Edge.

---

## Fuera de alcance (explícito)

- Autenticación, perfiles, sincronización multi-dispositivo.
- Operaciones de álgebra simbólica.
- Gráficas, matrices, números complejos.
- Conversión de unidades o de bases (binario, hex).
- Monetización, analíticas, telemetría.
