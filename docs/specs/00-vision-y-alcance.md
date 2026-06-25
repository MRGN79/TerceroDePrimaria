# TerceroDePrimaria — Especificación funcional: Visión y alcance

> Documento de Analista Funcional. Arranque de proyecto.
> Estado: borrador para revisión del Jefe / Arquitecto / UX-UI.
> Fecha: 2026-06-25.

## 1. Resumen

Plataforma web de ejercicios y juegos para que niños de **3º de primaria (8-9 años)** practiquen durante el verano. Objetivos pedagógicos:

1. **No olvidar** los contenidos de 3º.
2. **Afianzar** habilidades adquiridas.
3. **Adelantar** algunos conceptos de 4º como reto.
4. **Crear hábito**: hacer algún ejercicio todos los días.
5. Todo con un **tono lúdico y festivo**: tiene que parecerles divertido.

El tono festivo es un **requisito funcional de primer nivel**, no decorativo. Cualquier decisión de diseño que sacrifique diversión por densidad de contenido es incorrecta para este producto.

## 2. Contexto cerrado con el usuario

| Dimensión | Decisión |
|---|---|
| Mercado | España (Madrid) |
| Currículo | LOMLOE, 3º de primaria |
| Usuario final | El **niño directamente** (8-9 años). No hay panel de padres ni profesores. No hay adulto en escena. |
| Backend | **Ninguno.** Sin servidor, sin login, sin registro. |
| Persistencia | Solo `localStorage` en el dispositivo. Nada se envía a servidor. |
| Modelo | Gratuito, sin interés comercial. |
| Formatos | (a) Online interactivo tipo quiz con gamificación; (b) versión **imprimible** para papel. |
| Contenido | Set amplio de 3º + algunos conceptos de 4º. |
| i18n | EN + ES mínimo. ES es el idioma real de uso; EN por estándar del scaffold. Idioma por defecto del scaffold = EN, pero ver decisión D-1. |

## 3. Decisiones y asunciones explícitas

- **D-1 (idioma por defecto):** El scaffold fija EN como idioma por defecto de interfaz. Para este producto el usuario real es un niño español de 8-9 años; el contenido pedagógico (Lengua Castellana, ortografía, problemas) **solo tiene sentido en ES**. Se asume: la **interfaz** cumple el estándar i18n (EN+ES disponibles, EN como fallback técnico), pero la **detección de idioma del navegador arranca en ES** para el usuario objetivo, y el **contenido de ejercicios de materias dependientes del idioma (Lengua, Inglés) no se traduce** — son específicos de su asignatura. Decisión a confirmar por Arquitecto/UX-UI.
- **D-2 (sin recogida de datos personales):** No se pide nombre real, edad, email ni ningún dato identificativo. El "perfil" es un avatar/apodo elegido de una lista cerrada, guardado solo en `localStorage`. Esto mantiene el proyecto fuera del ámbito sensible de datos de menores (ver sección legal). El apodo libre escrito por el niño es un **riesgo** que se evita ofreciendo apodos predefinidos (ver caso edge).
- **D-3 (offline-friendly):** Al no haber backend, el objetivo es que funcione como web estática. La posibilidad de PWA/offline total es una decisión del Arquitecto; funcionalmente se especifica que **una vez cargada, una sesión de ejercicios no debe requerir red**.
- **D-4 (sin sonido obligatorio):** El tono festivo puede incluir sonido, pero el audio nunca es imprescindible para completar un ejercicio (accesibilidad + uso en silencio). Sonido siempre con control de mute y desactivable.
- **D-5 (Ciencias Naturales en inglés — decisión pedagógica del usuario):** La materia "Ciencias Naturales" se presenta como **"Natural Science"** y **todo su contenido** (título de materia, temas, enunciados, opciones, respuestas y feedback de ejercicio) va **en inglés**. Razón: el niño cursa la asignatura en inglés en su colegio y debe practicarla en el idioma en que la estudia. Implicación para i18n: como en Lengua e Inglés, el contenido de esta materia **no se traduce con el selector de idioma de la interfaz** — el "idioma de la materia" es fijo (inglés). La interfaz envolvente (botones de navegación, gamificación) sí sigue el idioma de UI seleccionado.
- **D-6 (números aleatorios en Matemáticas — decisión del usuario):** Los ejercicios de cálculo de Matemáticas (sumas, restas, multiplicaciones, divisiones y problemas numéricos) **generan sus números aleatoriamente en cada sesión**, dentro de rangos apropiados para 3º de primaria. El mismo ejercicio es distinto cada vez que el niño lo repite, evitando la memorización del resultado y reforzando el cálculo real. Los rangos exactos por tipo de operación los fija el Arquitecto (ver ADR / spec de matemáticas). Estos ejercicios generados **no aplican a la versión imprimible salvo que se congelen sus valores en el momento de generar la ficha** (cada ficha imprimible captura una instancia concreta de números, con su hoja de soluciones correspondiente).

## 4. Fuera de alcance (MVP y producto)

Explícitamente **NO** se construye:

- Cualquier backend, base de datos o API de servidor.
- Login, registro, cuentas de usuario, recuperación de contraseña.
- Panel de padres, panel de profesores, informes para adultos.
- Rankings online, leaderboards globales, comparación entre niños.
- Multijugador, chat, cualquier interacción social o entre usuarios.
- Compras, suscripciones, publicidad, monetización de cualquier tipo.
- Recogida de datos personales o analítica que identifique al niño.
- Generación de contenido por IA en tiempo de ejecución (los ejercicios son contenido curado/estático).
- Sincronización entre dispositivos (sin servidor no hay sync; el progreso vive en cada dispositivo).
- Corrección automática de la versión imprimible (el papel se corrige con la hoja de soluciones).

## 5. Requisitos no funcionales reales

- **Rendimiento:** Carga inicial usable en < 3 s en conexión móvil media; transición entre ejercicios percibida como instantánea (< 150 ms). Es una herramienta para niños: la espera mata la diversión.
- **Dispositivos:** Diseño responsive. Uso esperado en tablet y portátil familiar; también móvil. La versión imprimible se diseña en A4 vertical.
- **Disponibilidad:** Al ser estática, depende solo del hosting de ficheros estáticos. Sin SLA de servidor propio.
- **Accesibilidad:** WCAG 2.1 AA como mínimo transversal (ver criterios por feature). Contraste alto, tipografía grande y legible, navegación por teclado, objetivos táctiles grandes (mínimo 44x44 px) apropiados para manos pequeñas.
- **Seguridad/privacidad:** Sin datos personales en servidor. `localStorage` no contiene PII. Sin trackers de terceros.

## 6. Base jurídica del tratamiento de datos (RGPD)

- El producto **no trata datos personales en servidor**: no hay recogida, no hay transferencia, no hay responsable de tratamiento en sentido clásico.
- `localStorage` guarda: progreso, racha, medallas, preferencias (idioma, mute), avatar/apodo elegido de lista cerrada. Estos datos **no salen del dispositivo** y no se asocian a una identidad.
- **Base jurídica:** no aplica tratamiento RGPD en servidor. El almacenamiento local sin envío a terceros y sin identificación queda fuera del consentimiento de cookies analíticas. **Señalado para el Abogado:** confirmar que (a) el uso de `localStorage` puramente funcional no requiere banner de consentimiento, y (b) que la ausencia de recogida de datos de menores mantiene el proyecto fuera del régimen reforzado de protección de menores (LOPDGDD art. 7, edad de consentimiento digital en España = 14 años). Como no hay tratamiento, no debería activarse; el Abogado lo valida en el gate.
- **Punto de atención para el Abogado:** alineamiento curricular con LOMLOE — usar la marca "3º de primaria" y referencias al currículo es descriptivo y no requiere licencia, pero el **contenido de los ejercicios debe ser original o de fuente con licencia compatible**; no copiar enunciados de editoriales con copyright. Señalado como dependencia de contenido.

## 7. Dependencias

- **Arquitecto:** define solución i18n y estructura de claves (`namespace.componente.elemento`), decisión PWA/offline, formato de almacenamiento del contenido de ejercicios (JSON estático), y estrategia de versión imprimible (CSS print vs. generación de PDF).
- **UX-UI:** define el universo visual festivo, el sistema de recompensas visible, los avatares y la voz/tono de los textos para niños.
- **Contenido pedagógico:** los enunciados concretos de ejercicios deben crearse (originales, alineados a LOMLOE). Esta spec define el catálogo y los tipos; **no** redacta los cientos de ejercicios — eso es producción de contenido.
- **Abogado:** valida sección 6 antes del release.
