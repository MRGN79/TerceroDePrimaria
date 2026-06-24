# Criterios de aceptación de accesibilidad — TerceroDePrimaria

> **Fuente de verdad de accesibilidad** para Maquetador, Frontend, Tester y QA.
> Validado por el agente de Accesibilidad desde el diseño (no como corrección posterior).
> Objetivo de cumplimiento: **WCAG 2.1 nivel AA mínimo**, con margen extra por ser producto público infantil (8-9 años, tablet, lectura en afianzamiento). Se adoptan puntualmente criterios de WCAG 2.2 (2.5.7 Dragging Movements) donde aportan.

**Documento hermano:** `docs/design/00-universo-visual-y-sistema-de-diseno.md` (tokens y reglas de implementación). Cada criterio referencia su sección.

---

## Cómo se usa este documento

- Cada criterio tiene un **ID estable `A11Y-*`**. Úsalo en commits, PRs, issues y reportes de test.
- La columna **Verifica** indica el rol responsable de comprobar el criterio en su fase:
  - **Maq** = Maquetador (en la implementación de HTML/CSS/tokens)
  - **FE** = Frontend (en la lógica e interacción)
  - **Test** = Tester (en pruebas manuales/automatizadas, EN y ES)
  - **QA** = QA (en el gate final, antes de Abogado)
- Un criterio puede tener varios verificadores: cada uno comprueba su parte.
- **`[ ]`** = pendiente · marcar **`[x]`** cuando esté verificado por el rol indicado.

---

## 🚨 CONDICIONES DURAS (BLOQUEAN EL RELEASE)

Estas dos no son negociables. Si cualquiera falla en el gate pre-release, el veredicto de Accesibilidad es **❌ Bloqueado**.

| ID | Condición | Por qué bloquea | Verifica |
|---|---|---|---|
| **A11Y-KBD-02** | El ejercicio de emparejar (`MatchingBoard`) **DEBE** ofrecer emparejado por **selección secuencial clic-clic / toque-toque** (origen → destino). El arrastre puede existir como atajo, **nunca como única vía**. Un matching solo-drag está bloqueado. | Sin alternativa al arrastre, el ejercicio es inoperable con teclado y para usuarios con limitación motora (WCAG 2.1.1, y 2.5.7 de 2.2). | FE, Test, QA |
| **A11Y-MOTION-04** | **Ningún elemento parpadea/destella más de 3 veces por segundo** — confeti, estrellas, feedback de error, transiciones. Sin destellos de gran área a pleno contraste. Aplica **SIEMPRE**, ignora `prefers-reduced-motion`. | Seguridad fotosensible: riesgo de crisis epiléptica en un menor (WCAG 2.3.1). No es una mejora, es seguridad. | Maq, FE, Test, QA |

---

## 1. CONTRASTE (WCAG 1.4.3, 1.4.11) — ref. sistema de diseño §2.2

Regla maestra: **los colores vivos van en fondo / borde / ilustración; el texto va en neutro oscuro.** El color identifica el estado; el texto que lo acompaña es oscuro.

| ID | Criterio | Verifica |
|---|---|---|
| **A11Y-CONTRAST-01** | Todo texto tiene contraste **≥ 4.5:1** contra su fondo **real** (no el teórico). Suelo único: no se usa el 3:1 de "texto grande" como excusa. | Maq, Test |
| **A11Y-CONTRAST-02** | Todo borde/icono/estado informativo y el anillo de foco tienen contraste **≥ 3:1** contra fondos adyacentes. | Maq, Test |
| **A11Y-CONTRAST-03** | Ningún token de color vivo (coral, amarillo estrella, turquesa brillante, naranja) se usa como `color` de texto sobre fondo claro. Los vivos son `background` / `border` / `fill` decorativo; el texto sobre ellos usa la variante `-700`/`-800`. | Maq |
| **A11Y-CONTRAST-04** | El contraste se cumple verificado con **color real**, no con `opacity` (un color a `opacity: 0.6` cambia el ratio). Si hubiera más de un tema, se cumple en todos. | Maq, Test |
| **A11Y-CONTRAST-05** | El amarillo (estrella) **nunca** porta texto ni es texto sobre blanco. Se distingue por **contorno oscuro ≥ 3:1** (forma reconocible sin depender del relleno). | Maq |

**Umbral de "texto grande" (referencia):** 24px regular = 18pt · 18.66px bold = 14pt bold. En este producto no nos apoyamos en él: 4.5:1 para todo.

---

## 2. NO SOLO COLOR (WCAG 1.4.1) — ref. §2.5, §3.x, §5

Regla: **icono + texto + forma**, nunca color como único portador de información. Verde-rojo es el peor par para daltonismo rojo-verde (~8% de niños varones): se mantiene por convención, nunca como única señal.

| ID | Criterio | Verifica |
|---|---|---|
| **A11Y-COLOR-01** | Acierto y error se distinguen por **icono inequívoco (✓ / ✗)** + texto, no solo color. Iconos de forma claramente distinta (no dos círculos parecidos). | Maq, FE, Test |
| **A11Y-COLOR-02** | **Test de escala de grises (obligatorio):** acierto y error son distinguibles convertidos a B/N (luminosidad distinta + forma). Gate en revisión visual. | Test, QA |
| **A11Y-COLOR-03** | Ningún estado del sistema (seleccionado, deshabilitado, error de input, materia, "Reto", medalla bloqueada/desbloqueada) se comunica solo por color: siempre borde/grosor/icono/texto adicional. | Maq, FE, Test |
| **A11Y-COLOR-04** | El conector visual del emparejado se distingue **sin color** (grosor/estilo de línea), no solo por tono. | Maq, FE |

**Pares a evitar como única señal:** verde/rojo, verde/marrón, azul/morado, verde/gris. Si dos elementos solo se distinguen por estos pares → añadir forma o etiqueta.

---

## 3. TAMAÑO TÁCTIL (WCAG 2.5.5 / 2.5.8) — ref. §4

| ID | Criterio | Verifica |
|---|---|---|
| **A11Y-TOUCH-01** | Targets de respuesta principal (opciones, botones de respuesta, "¡Jugar!", materias, mute) **≥ 60×60px** (objetivo 64–72px de alto en opciones). NumPad ≥ 56×56px; secundarios ≥ 48×48px. | Maq, Test |
| **A11Y-TOUCH-02** | Separación entre targets adyacentes **≥ 12px** (`--tdp-gap-touch`); **≥ 24px** entre acciones de signo opuesto (borrar/salir vs confirmar/enviar). | Maq, Test |
| **A11Y-TOUCH-03** | Ningún target interactivo tiene **< 44×44px** de área efectiva (incluido padding invisible). El área tocable puede superar al visual, nunca quedarse por debajo. | Maq, Test |
| **A11Y-TOUCH-04** | Margen interno de borde de pantalla **≥ 16px** para targets pegados al borde (agarre de la tablet). | Maq |

---

## 4. TIPOGRAFÍA (WCAG 1.4.4, 1.4.8, 1.4.12) — ref. §2.3

Fuente: **Atkinson Hyperlegible** (I/l/1 inequívocos, a/g de una sola planta). **No** se imponen fuentes "para dislexia" (evidencia débil); se persiguen los factores que sí ayudan a todos.

| ID | Criterio | Verifica |
|---|---|---|
| **A11Y-TYPO-01** | Cuerpo/UI **≥ 18px**, enunciados de ejercicio **≥ 20px** (cómodo a 24px), definidos en **`rem`** (no px fijos), respetando zoom del navegador. Texto auxiliar nunca < 16px. | Maq |
| **A11Y-TYPO-02** | `line-height` **≥ 1.5** en cuerpo y enunciados (1.6 en bloques de comprensión lectora). | Maq |
| **A11Y-TYPO-03** | **Sin MAYÚSCULAS SOSTENIDAS** en enunciados ni texto que el niño deba leer. Mayúsculas solo en micro-etiquetas cortas decorativas. | Maq, FE, Test |
| **A11Y-TYPO-04** | Texto de lectura alineado a la **izquierda**; sin `text-align: justify`. Centrado solo en titulares/elementos cortos. Líneas ≤ 60-65 caracteres en enunciados largos. | Maq |
| **A11Y-TYPO-05** | El layout **no se rompe** al aplicar el bookmarklet de Text Spacing de WCAG 1.4.12 (line-height 1.5, letter 0.12em, word 0.16em, párrafo 2em). | Test |
| **A11Y-TYPO-06** | Texto ampliable hasta **200%** sin truncar ni romper layout (`rem`, contenedores flexibles, sin alturas fijas en cajas de texto). | Maq, Test |
| **A11Y-TYPO-07** | La fuente cargada distingue I/l/1 y a/g sin ambigüedad (Atkinson Hyperlegible o fallback equivalente del mismo perfil). | Maq |

---

## 5. FOCO VISIBLE (WCAG 2.4.7, 1.4.11) — ref. §2.6

| ID | Criterio | Verifica |
|---|---|---|
| **A11Y-FOCUS-01** | Anillo de foco **≥ 3px** (`--tdp-focus-ring-width`), offset 2px, contraste **≥ 3:1** contra el fondo adyacente **Y** contra el componente. Sobre superficies azules de marca, anillo de doble capa (claro interior + oscuro exterior). | Maq, Test |
| **A11Y-FOCUS-02** | **Nunca** `outline: none` sin sustituto visible equivalente. El foco no desaparece jamás en navegación por teclado. | Maq, FE, Test |
| **A11Y-FOCUS-03** | Se usa **`:focus-visible`** (anillo en teclado, no molesta en toque), pero el foco siempre aparece cuando se navega con teclado. | Maq, FE |
| **A11Y-FOCUS-04** | Señal doble recomendada para esta edad: anillo + ligero cambio de fondo/escala, para que el foco sea inequívoco. | Maq |

---

## 6. NAVEGACIÓN POR TECLADO (WCAG 2.1.1, 2.1.2, 2.4.3, 3.2.3) — ref. §3.5, §3.8, §6

| ID | Criterio | Verifica |
|---|---|---|
| **A11Y-KBD-01** | Todo el flujo es completable **solo con teclado**: resolver cualquier tipo de ejercicio, navegar, emparejar, usar el NumPad, abrir/cerrar modales, ir a casa/atrás. | FE, Test, QA |
| **🚨 A11Y-KBD-02** | **(CONDICIÓN DURA)** `MatchingBoard` ofrece emparejado clic-clic/toque-toque sin arrastre; estado de selección por **borde grueso + `aria-pressed`/`aria-selected` + icono**, no solo color. Solo-drag = bloqueado. | FE, Test, QA |
| **A11Y-KBD-03** | **Sin trampas de foco:** se entra y se sale de todo componente con teclado. En modales (celebración), el foco se gestiona (foco al abrir, retorno al cerrar, foco contenido mientras está abierto). | FE, Test |
| **A11Y-KBD-04** | Orden de tabulación = orden visual/lógico del DOM (enunciado → opciones en orden → acción). Sin saltos. NumPad en orden lógico (1-2-3 / 4-5-6…), tecla de borrar separada de las numéricas. | Maq, FE, Test |
| **A11Y-KBD-05** | Todo control interactivo es un elemento nativo (`button`, `radio`/`fieldset` para opción múltiple), no un `div`/`span` clicable. Activable con Enter/Espacio. | Maq, FE |

---

## 7. CONTENIDO DINÁMICO Y LECTORES DE PANTALLA (WCAG 4.1.2, 4.1.3, 1.1.1) — ref. §6

| ID | Criterio | Verifica |
|---|---|---|
| **A11Y-LIVE-01** | El resultado de cada respuesta (acierto/error) se anuncia por **`aria-live`** (`polite` en general). El emparejamiento anuncia "X emparejada con Y". El display del NumPad usa `aria-live="polite"` para lo tecleado. | FE, Test |
| **A11Y-SR-01** | Estrellas, racha y medallas tienen `aria-label` comprensible (ej. "12 estrellas", "racha de 3 días", "medalla X conseguida / por conseguir"). | Maq, FE, Test |
| **A11Y-SR-02** | Rumbo (mascota) y decoración son `aria-hidden`. Ilustraciones **informativas** tienen `alt` descriptivo (vía clave i18n). | Maq, FE |
| **A11Y-SR-03** | HTML semántico: headings jerárquicos sin saltos, landmarks (`main`, `nav`), listas para colecciones, nombre accesible en cada control. | Maq, Test |

---

## 8. MOVIMIENTO Y ANIMACIÓN (WCAG 2.3.1, 2.3.3) — ref. §2.7

| ID | Criterio | Verifica |
|---|---|---|
| **A11Y-MOTION-01** | Con `prefers-reduced-motion: reduce` (o `prefs.reducedMotion` on): **ninguna** animación de traslación/escala (confeti, rebotes, partículas, parallax, auto-scroll). Solo fade ≤ 200ms o cambio instantáneo. | Maq, FE, Test |
| **A11Y-MOTION-02** | Toda celebración animada está envuelta en `@media (prefers-reduced-motion: no-preference)`. **Default seguro:** sin preferencia explícita de movimiento → no se anima la traslación/escala llamativa. | Maq, FE |
| **A11Y-MOTION-03** | El feedback de acierto/error es **comprensible sin animación**: la información vive en icono + texto fijos. Con reduce-motion la estrella **aparece** (no vuela) y el badge se muestra. | Maq, FE, Test |
| **🚨 A11Y-MOTION-04** | **(CONDICIÓN DURA)** Ningún elemento parpadea/destella **> 3 veces/segundo**. Aplica SIEMPRE, ignora la preferencia del usuario. | Maq, FE, Test, QA |
| **A11Y-MOTION-05** | **Sin destellos de gran área a pleno contraste** (ej. rojo brillante a pantalla completa). El confeti son partículas pequeñas, jamás un estroboscópico global. | Maq, FE, Test |
| **A11Y-MOTION-06** | El "shake" de error: amplitud pequeña, ≤ 400ms, una sola vez, **desactivado** con reduce-motion. | Maq, FE |

---

## 9. SONIDO (WCAG 1.4.2) — ref. §6, D-4

| ID | Criterio | Verifica |
|---|---|---|
| **A11Y-SOUND-01** | Toda información sonora tiene **equivalente visual/textual**. El sonido nunca es el único portador. | FE, Test |
| **A11Y-SOUND-02** | Control de **mute** visible, **≥ 60×60px**, icono inequívoco (altavoz tachado), **persistente entre sesiones** (localStorage). | Maq, FE, Test |
| **A11Y-SOUND-03** | **Sin autoplay** de audio antes de interacción del usuario. Música de fondo (si existe) arranca solo tras interacción. Sin sonidos bruscos/estridentes; el error suena suave, no punitivo. | FE, Test |

---

## 10. VERSIÓN IMPRIMIBLE — A4 B/N (WCAG 1.4.1, 1.4.3 aplicados a impresión) — ref. §7.2

| ID | Criterio | Verifica |
|---|---|---|
| **A11Y-PRINT-01** | Texto imprime en **negro sólido (`#000`)** sobre blanco. Ningún contenido esencial en gris claro (la fotocopiadora del aula lo hace ilegible). Grises solo para decoración prescindible. | Maq, Test |
| **A11Y-PRINT-02** | Tipografía impresa: cuerpo/enunciados **≥ 12pt** (recomendado 14pt), operaciones **≥ 16pt**, `line-height` ≥ 1.5. Misma fuente Atkinson Hyperlegible. | Maq |
| **A11Y-PRINT-03** | Estados/recompensas representados por **forma/contorno negro** (estrella vacía, casilla para sello), nunca relleno de color. Ningún ejercicio depende del color. | Maq, Test |
| **A11Y-PRINT-04** | `@media print` oculta toda la UI interactiva (navegación, sonido, gamificación) y deja solo el ejercicio. Cada ejercicio `break-inside: avoid`; soluciones en página aparte (`break-before: page`). | Maq, FE, Test |
| **A11Y-PRINT-05** | Espacio de respuesta manuscrita **≥ 10mm** de alto (líneas/casillas). Márgenes A4 **≥ 15mm**. Sin fondos de color que gasten tóner ni reduzcan contraste. | Maq, Test |

---

## Checklist resumen para el gate pre-release (QA + Accesibilidad)

- [ ] Contraste: A11Y-CONTRAST-01 a 05 verificados con checker sobre color real
- [ ] No solo color + test de escala de grises (A11Y-COLOR-01 a 04)
- [ ] Táctil ≥ 60px principal, separaciones (A11Y-TOUCH-01 a 04)
- [ ] Tipografía: tamaños, line-height, sin mayúsculas, 200%, Text Spacing (A11Y-TYPO-01 a 07)
- [ ] Foco ≥ 3px, ≥ 3:1, nunca suprimido (A11Y-FOCUS-01 a 04)
- [ ] Teclado: flujo completo + **🚨 matching clic-clic** + sin trampas (A11Y-KBD-01 a 05)
- [ ] aria-live + lectores de pantalla + semántica (A11Y-LIVE/SR)
- [ ] Movimiento: reduce-motion + **🚨 flash ≤ 3/seg** (A11Y-MOTION-01 a 06)
- [ ] Sonido opcional, mute persistente, sin autoplay (A11Y-SOUND-01 a 03)
- [ ] Imprimible B/N legible (A11Y-PRINT-01 a 05)

**Veredicto de Accesibilidad solo puede ser ✅ si las DOS condiciones duras (A11Y-KBD-02 y A11Y-MOTION-04) están verificadas.** Cualquiera de ellas fallando → ❌ Bloqueado.

---

## Posible obligación legal (a confirmar por el Abogado)

Si TerceroDePrimaria se distribuye a **colegios públicos** en España/UE, le aplica **EN 301 549 / RD 1112/2018 / Directiva (UE) 2016/2102** (accesibilidad del sector público): en ese contexto **WCAG AA pasa de recomendación a requisito legal**. Accesibilidad determina el cumplimiento técnico; el **Abogado** determina el alcance de la obligación según el modelo de distribución. Derivado al Jefe para evaluación legal.

---

*Mantenido por el agente de Accesibilidad. Cambios a este documento se versionan junto al sistema de diseño.*
