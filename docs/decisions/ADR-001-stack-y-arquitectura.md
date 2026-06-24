# ADR-001: Stack tecnológico y arquitectura de TerceroDePrimaria

**Fecha:** 2026-06-25
**Estado:** Aceptado
**Decidido por:** Arquitecto

---

## Contexto

TerceroDePrimaria es una plataforma web de ejercicios y juegos educativos para
niños de 3º de primaria (8-9 años), pensada para uso en verano. El producto tiene
dos modos de salida: un quiz interactivo con gamificación y una versión imprimible
en papel.

Restricciones duras del scope, cerradas con el usuario:

- **Sin backend.** Sin servidor de aplicación, sin base de datos, sin API. Web
  frontend 100% estática.
- **Sin login, sin registro, sin cuentas.** Ningún dato sale del dispositivo.
- **Persistencia local únicamente:** `localStorage` para racha diaria, puntos de
  sesión y preferencias.
- **Gratuito**, uso personal/familiar, sin interés comercial.
- **Mercado España.** i18n obligatorio EN + ES. ES es el idioma de uso real;
  EN es el default de interfaz por estándar del scaffold.
- **Dos modos de salida:** (a) quiz interactivo gamificado; (b) versión imprimible.
- **Usuario final:** niños de 8-9 años, con uso esperado en tablet. La app debe ser
  ligera, rápida, sin fricción y robusta en pantallas táctiles.

Fuerzas en juego:

- **Simplicidad** — es una app pequeña, mantenida de forma personal. No debe arrastrar
  complejidad de tooling ni de patrones.
- **Naturaleza estática** — debe poder desplegarse como sitio estático sin servidor.
- **Contenido estructurado y creciente** — habrá muchos ejercicios; añadir más debe ser
  trivial y no requerir tocar lógica. Esto exige un modelo de datos limpio.
- **Mantenibilidad a largo plazo** — el proyecto vivirá veranos sucesivos; conviene un
  stack estable y con ecosistema sano.
- **Rendimiento en dispositivos modestos** — tablets de gama media/baja; bundle pequeño
  y arranque rápido importan.

Estas decisiones definen los estándares que Frontend y Maquetador implementarán, por lo
que se documentan de forma cerrada y sin ambigüedad.

## Decisión

### 1. Stack frontend: **Vite + React + TypeScript**

Adoptaremos **Vite** como herramienta de build y dev server, **React** como librería de
UI y **TypeScript** en todo el código.

- **Vite** genera un sitio puramente estático (`vite build` produce HTML/CSS/JS sin
  runtime de servidor), con dev server rápido (HMR), configuración mínima y build
  optimizado por defecto. Encaja con la restricción de "100% estático".
- **React** aporta un modelo de componentes maduro, ecosistema amplio (i18n, routing,
  utilidades de PDF) y un modelo mental de estado adecuado para un quiz interactivo
  (pregunta actual, respuestas, puntos, racha). Es conocimiento transferible y con
  documentación abundante.
- **TypeScript: SÍ.** El núcleo de valor de esta app es un **modelo de datos de
  contenido** (ejercicios, materias, temas). TypeScript permite **tipar el esquema de
  los ejercicios** y validar en tiempo de compilación que cada ejercicio nuevo cumple la
  forma esperada (tipo, opciones, respuesta correcta, etc.). Dado que el contenido
  crecerá y será editado a mano, los tipos son la primera línea de defensa contra
  ejercicios malformados. El coste de TS en un proyecto pequeño es marginal y el
  beneficio en seguridad de datos es alto.

Routing: **`react-router-dom`** en modo cliente, o navegación por estado simple si las
vistas son pocas. Frontend decide el detalle; el requisito es que el routing funcione en
hosting estático (usar `HashRouter` o configurar SPA fallback en el host).

### 2. Solución i18n: **react-i18next + i18next**

Adoptaremos **i18next** con el binding **react-i18next**.

- Idiomas base: **EN** y **ES**. EN es el `fallbackLng` por estándar del scaffold.
- **Detección de idioma:** dado que el idioma de uso real es ES y el público es España,
  configuraremos detección con `i18next-browser-languagedetector` con orden:
  `localStorage` → `navigator`. Resultado práctico: un usuario en España con navegador en
  español verá ES por defecto desde el primer arranque, sin dejar de cumplir que EN es el
  fallback técnico cuando falta una clave. La preferencia elegida se persiste en
  `localStorage` (ver sección 4).
- **Estructura de claves:** patrón `namespace.componente.elemento`
  (ej. `quiz.questionCard.submitButton`, `home.streak.label`).
- **Ubicación de archivos:** `/locales/en/` y `/locales/es/`, con archivos JSON por
  namespace (ej. `/locales/es/quiz.json`, `/locales/es/common.json`). Añadir un idioma
  nuevo se reduce a crear `/locales/<idioma>/` con los mismos archivos, sin tocar código.
- **Regla absoluta:** ningún string visible al usuario va hardcodeado. Todo texto pasa
  por clave i18n, incluidos los textos del contenido de ejercicios (ver sección 3).

### 3. Modelo de datos de contenido: **JSON estático tipado**

El contenido vive en **JSON estático** dentro del repositorio, validado por tipos
TypeScript. No hay base de datos: los ejercicios se importan como datos en build time.

**Organización jerárquica:** `Materia → Tema → Ejercicio`.

**Esquema de un ejercicio** (tipo TypeScript de referencia):

```ts
type Materia = "matematicas" | "lengua" | "ingles" | "ciencias";
type Nivel = "3" | "4"; // 3º o 4º de primaria
type TipoEjercicio =
  | "opcion-multiple"   // varias opciones, una correcta
  | "verdadero-falso"   // caso especial de opción múltiple
  | "respuesta-corta"   // input de texto con respuesta exacta normalizada
  | "emparejar";        // relacionar pares (izquierda-derecha)

interface Ejercicio {
  id: string;                 // estable y único, ej. "mat-3-sumas-001"
  materia: Materia;
  tema: string;               // clave de tema, ej. "sumas-llevando"
  nivel: Nivel;
  tipo: TipoEjercicio;
  enunciadoKey: string;       // clave i18n del enunciado
  opciones?: Opcion[];        // para opcion-multiple / verdadero-falso / emparejar
  respuestaCorrecta: string | string[]; // id(s) de opción correcta, o texto normalizado
  pistaKey?: string;          // clave i18n de pista opcional
  imprimible: boolean;        // si aparece en la versión en papel
}

interface Opcion {
  id: string;                 // ej. "a", "b", "c"
  textoKey: string;           // clave i18n del texto de la opción
}
```

**Decisiones de diseño del modelo:**

- **Textos por clave i18n, no literales.** `enunciadoKey`, `textoKey`, `pistaKey` son
  claves i18n. El contenido pedagógico se traduce igual que la interfaz. Esto cumple el
  estándar i18n del scaffold y permite versión EN/ES del mismo ejercicio.
- **`id` estable y único** por ejercicio: imprescindible para reanudar sesión, evitar
  repeticiones y referenciar progreso sin colisiones.
- **`nivel` 3/4:** permite reutilizar la plataforma para refuerzo (3º) o adelanto (4º).
- **`imprimible`:** marca qué ejercicios entran en la salida en papel (algunos tipos
  interactivos no tienen sentido impresos).
- **Carga:** un índice ligero (`materias.json`) lista materias y temas; los ejercicios se
  organizan en archivos por materia/tema (ej. `/content/matematicas/sumas.json`) e se
  importan bajo demanda. Añadir ejercicios = editar/crear un JSON, sin tocar lógica.
- **Validación:** un script de validación (Tester) comprueba en CI que todo JSON cumple
  el tipo `Ejercicio`, que los `id` son únicos y que toda clave i18n referenciada existe
  en EN y ES.

### 4. Persistencia local: **localStorage con esquema versionado y lectura defensiva**

Se persiste **solo** lo imprescindible, bajo una **única clave raíz versionada** para
facilitar migraciones y limpieza:

```ts
// clave de localStorage: "tdp:v1"
interface PersistedState {
  schemaVersion: 1;
  preferences: {
    language: "en" | "es";  // idioma elegido explícitamente por el usuario
    sound: boolean;
  };
  streak: {
    current: number;        // racha actual en días
    longest: number;        // mejor racha histórica
    lastPlayedDate: string; // "YYYY-MM-DD" en hora local del dispositivo
  };
  session: {
    points: number;         // puntos de la sesión / acumulados
  };
}
```

**Cálculo de la racha diaria sin servidor:**

- Se compara la **fecha local de hoy** (`YYYY-MM-DD`) con `streak.lastPlayedDate`:
  - Si son **iguales** → ya jugó hoy; la racha no cambia.
  - Si la diferencia es **exactamente 1 día** → `current += 1`; actualizar `longest`.
  - Si la diferencia es **mayor de 1 día** → la racha se rompe; `current = 1`.
  - Si **no hay** `lastPlayedDate` (primer uso) → `current = 1`.
- En todos los casos donde hubo actividad, `lastPlayedDate = hoy`.
- Se usa **fecha local** (no UTC) porque la noción de "hoy" del niño es la del huso del
  dispositivo. Limitación asumida y documentada: cambiar la hora del dispositivo permite
  manipular la racha. Es aceptable: no hay incentivo (uso personal, sin ranking ni
  recompensa con valor) y no compensa la complejidad de mitigarlo sin backend.

**Manejo de ausencia o corrupción de datos:**

- Toda lectura de `localStorage` pasa por una función que: (1) intenta `JSON.parse`;
  (2) valida la forma contra el esquema esperado; (3) si falla parseo o validación, o si
  `schemaVersion` es desconocida e immigrable, **descarta** el estado y arranca con un
  **estado por defecto** limpio. Nunca se deja que un dato corrupto rompa la app.
- Si `localStorage` no está disponible (modo privado, almacenamiento lleno, navegador
  restrictivo), la app funciona en memoria durante la sesión y degrada sin error: el
  niño puede jugar, simplemente no se persiste la racha.
- `schemaVersion` permite futuras migraciones controladas sin perder datos del usuario.

### 5. Versión imprimible: **CSS `@media print` como solución principal**

Adoptaremos **CSS `@media print`** sobre una vista dedicada de "hoja de ejercicios",
disparada con `window.print()` del navegador. **No** se añade dependencia de generación
de PDF (jsPDF / react-pdf) en la primera versión.

- Una ruta/vista específica (ej. `/print`) renderiza los ejercicios con `imprimible: true`
  filtrados por materia/tema/nivel, maquetada para papel: sin elementos interactivos,
  sin cabeceras de app, tipografía grande y legible para 8-9 años, espacio para escribir,
  saltos de página controlados (`break-inside: avoid` por ejercicio).
- El usuario imprime en papel o "imprime a PDF" desde el propio navegador (función
  estándar del SO), obteniendo un PDF sin que la app cargue ninguna librería pesada.

### 6. Estrategia de deploy: **Cloudflare Pages (recomendado)**

Recomendación para DevOps (a ejecutar en su fase, no ahora): desplegar el sitio estático
en **Cloudflare Pages**.

- Build estático, hosting gratuito generoso, CDN global con buena latencia desde España,
  HTTPS automático, despliegues por push a la rama. Cero servidor que mantener, coherente
  con la naturaleza estática del proyecto.
- **Alternativas igualmente válidas** (decisión final de DevOps según comodidad):
  **Netlify**, **Vercel** y **GitHub Pages**. Las tres sirven SPA estáticas sin coste para
  este volumen. GitHub Pages es la opción más simple si ya se usa GitHub y no se necesitan
  funciones extra; requiere atención al *base path* del repo y al fallback de SPA.
- Requisito transversal para cualquier host elegido: configurar el **SPA fallback**
  (servir `index.html` en rutas no encontradas) o usar `HashRouter`, y **excluir del
  artefacto desplegado** los archivos privados del scaffold (`.claude/`, `CLAUDE.md`,
  `.github/`, `docs/`, `CHANGELOG.md`) según la política del proyecto.

## Consecuencias

**Positivas:**

- Stack estático puro: sin servidor, sin coste de operación, sin superficie de ataque de
  backend. Encaja exactamente con las restricciones del scope.
- TypeScript + JSON tipado convierte el contenido educativo en datos validables: añadir
  ejercicios es seguro y barato, y los errores se detectan en build/CI, no en producción.
- i18next cubre EN/ES desde el día uno con detección que da ES real al usuario español sin
  romper el estándar de EN como fallback.
- Persistencia mínima, versionada y defensiva: la app nunca se rompe por datos locales
  corruptos y permite migraciones futuras.
- Impresión sin dependencias pesadas: bundle ligero, ideal para tablets modestas.
- Ningún dato sale del dispositivo: privacidad por diseño, simplifica el gate legal
  (sin tratamiento de datos personales, sin cookies de terceros).

**Negativas / trade-offs:**

- React + su runtime añaden algo de peso frente a vanilla; se mitiga con el árbol pequeño
  de la app y el code-splitting de Vite. El coste es aceptable por la mantenibilidad.
- La racha es manipulable cambiando la fecha del dispositivo (sin backend no hay forma de
  evitarlo). Asumido por falta de incentivo real.
- `@media print` da menos control de paginación fina que un PDF generado programáticamente;
  el resultado depende algo del navegador. Aceptable para hojas de ejercicios escolares.
- TypeScript añade un paso de tipado/compilación; trivial con Vite y compensado por la
  seguridad del modelo de datos.

**Riesgos:**

- Crecimiento desordenado del contenido si no se respeta el esquema. **Mitigación:** script
  de validación de JSON + unicidad de `id` + existencia de claves i18n, ejecutado en CI.
- Pérdida de progreso si el usuario borra el almacenamiento del navegador. Inherente a la
  ausencia de backend; comunicado como limitación esperada, no como bug.
- Divergencia de impresión entre navegadores. **Mitigación:** probar la vista `/print` en
  los navegadores objetivo (Tester) y documentar "imprimir desde Chrome/Edge" como camino
  recomendado.

## Alternativas consideradas

### Opción A — Vite + Vanilla JS/TS (sin framework)

**Por qué se descarta:** máxima ligereza, pero el quiz interactivo con estado
(pregunta actual, puntuación, racha, feedback) y el crecimiento del contenido harían
reinventar gestión de estado y renderizado. El ahorro de peso no compensa el coste de
mantenibilidad y la pérdida del ecosistema (i18n, routing, utilidades). React con árbol
pequeño es suficientemente ligero.

### Opción B — Astro

**Por qué se descarta:** excelente para sitios mayormente estáticos con poco JS
("islands"), pero aquí el corazón del producto es **una sola aplicación interactiva**
(el quiz), no muchas páginas de contenido estático. El modelo de islas aporta poco cuando
casi todo es interactivo, y añade un concepto extra que mantener. La versión imprimible no
justifica por sí sola elegir Astro.

### Opción C — SvelteKit en modo estático (adapter-static)

**Por qué se descarta:** Svelte es ligero y agradable, y `adapter-static` produce un sitio
estático válido. Se descarta por **ecosistema y familiaridad**: React tiene mayor masa de
documentación, ejemplos educativos y soporte de librerías (react-i18next, utilidades de
impresión/PDF si se necesitaran), lo que reduce el riesgo de mantenimiento a lo largo de
varios veranos para un proyecto personal. Decisión de prudencia, no técnica: SvelteKit
sería una elección defendible.

### Sobre i18n — solución propia ligera vs i18next

**Por qué se elige i18next:** una solución propia (objeto de traducciones + función `t`)
sería más ligera, pero i18next ya resuelve fallback de idioma, detección, interpolación,
plurales y carga por namespace de forma estándar y probada. El coste en peso es pequeño y
evita reescribir lógica que el estándar i18n del scaffold da por supuesta.

### Sobre impresión — generación de PDF en cliente (jsPDF / react-pdf)

**Por qué se descarta como solución principal:** jsPDF y react-pdf permiten control
total de la maquetación del PDF y un botón "Descargar PDF" sin pasar por el diálogo de
impresión, pero añaden **dependencia pesada** al bundle (penaliza tablets modestas), más
código que mantener y complejidad de layout. `@media print` + "imprimir a PDF" del
navegador cubre la necesidad real (hojas para hacer en papel) con coste cero. Queda como
posible evolución futura si se pide un PDF descargable con diseño muy controlado.

---
<!-- Copiar este archivo como docs/decisions/ADR-NNN-titulo-en-kebab-case.md -->
<!-- Nunca reutilizar un número, aunque el ADR se deprece -->
