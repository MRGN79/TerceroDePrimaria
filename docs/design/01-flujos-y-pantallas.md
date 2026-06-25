# Flujos y pantallas clave — TerceroDePrimaria

> Documento de UX-UI. Define el journey del usuario, la estructura de cada pantalla y los comportamientos de interacción.
> Lee junto a `00-universo-visual-y-sistema-de-diseno.md` (identidad, tokens, componentes) y `02-criterios-accesibilidad.md` (criterios A11Y-*).
> Fecha: 2026-06-25. Para Maquetador (estructura visual) y Frontend (lógica de interacción).

**Convención:** los wireframes usan **claves i18n** (`namespace.componente.elemento`), nunca texto literal. El layout absorbe +30% de expansión EN→ES. Mobile-first; el dispositivo objetivo es tablet (768-1024px).

---

## 0. Mapa de navegación

```
                         ┌─────────────────┐
        (primer uso) ──→ │  ONBOARDING     │ ── elegir avatar/apodo (saltar permitido)
                         └────────┬────────┘
                                  │
                          ┌───────▼────────┐
   (visita recurrente) ─→ │     HOME       │ ←──────────────────────┐
                          │ (isla verano)  │                        │
                          └─┬───┬───┬───┬──┘                        │
              "Misión hoy"  │   │   │   │  ajustes                  │
                    ┌───────┘   │   │   └────────┐                  │
                    │      materias │ mochila    │                  │
            ┌───────▼──────┐  ┌─────▼─────┐ ┌────▼─────┐  ┌─────────▼────────┐
            │ SESIÓN        │  │ ELEGIR    │ │ MOCHILA  │  │ AJUSTES          │
            │ (misión)      │  │ MATERIA   │ │(progreso)│  │(idioma/sonido)   │
            └───────────────┘  └─────┬─────┘ └──────────┘  └──────────────────┘
                                     │
                              ┌──────▼──────┐
                              │ ELEGIR TEMA │── "Reto 4º" marcado
                              └──────┬──────┘
                                     │
                              ┌──────▼──────┐      ┌──────────────┐
                              │  SESIÓN     │─────→│ RESULTADOS   │──→ vuelve a HOME
                              │ (ejercicios)│      │ (celebración)│
                              └─────────────┘      └──────────────┘

        ┌──────────────┐     ┌──────────────┐
   HOME │ ZONA IMPRIMIR │──→ │ VISTA FICHA  │──→ window.print()
        └──────────────┘     │  (@media     │
                             │   print)     │
                             └──────────────┘
```

Regla de oro: **desde HOME hasta jugar en ≤ 2 toques** (US-01). Desde cualquier pantalla, siempre hay vuelta a HOME visible (Rumbo/casa) sin perder progreso.

---

## 1. ONBOARDING — elegir avatar y apodo (primer uso)

`US-02`. Solo en el primer arranque (cuando no hay `profile` en localStorage). Saltable.

```
[PANTALLA: Onboarding]
Header:
  └── Rumbo `happy` + saludo grande [home.welcome.title]
Body:
  ├── [Paso 1: Avatar]
  │     ├── título [onboarding.avatar.heading]
  │     └── Galería de avatares (rejilla 3×N, tarjetas ≥ 60×60px)
  │           └── cada avatar: imagen + nombre textual [content.avatar.<id>.name]
  │                 · comportamiento: toca → se marca (borde grueso + ✓), no solo color
  │                 · teclado: cada avatar focable, flechas/Tab + Enter
  ├── [Paso 2: Apodo] (lista CERRADA, no texto libre — D-2)
  │     ├── título [onboarding.nickname.heading]
  │     └── Chips de apodos predefinidos [content.nickname.<id>]
  │           · seleccionable, uno activo, estado por borde + ✓
  └── Acciones:
        ├── Botón primary [onboarding.continue]  (lg, ≥60px)
        └── Botón ghost  [onboarding.skip]       → asigna avatar+apodo por defecto
Footer: indicador de paso (1 de 2 / 2 de 2) en texto, no solo puntos
Estados:
  · vacío (nada elegido) → "continuar" usa el default; nunca bloquea
  · elegido → se persiste profile.avatarId / profile.nicknameId al continuar
A11y: cada avatar/apodo con nombre textual; navegable sin ratón (A11Y-KBD-01).
```

**Interacción:** un solo gesto por elección (toque). Si el niño no quiere decidir, "saltar" le deja jugar igual (US-02). Nunca un campo de texto.

---

## 2. HOME — la isla de verano

Pantalla de retorno diario. Pilar del hábito. Recuerda avatar, estrellas y racha desde localStorage (US-01).

```
[PANTALLA: Home]
Header:
  ├── Avatar + apodo del niño [profile]  (toca → Mochila)
  ├── StreakBadge: 🔥 + nº + [home.streak.days]   (icono + número + texto)
  └── StarCounter: ⭐ + nº total                    (icono + número, aria-label)
Body (orden vertical en móvil, puede ser 2 columnas en tablet):
  ├── [Bloque héroe: Misión de hoy]  (US-06, P1)
  │     ├── Rumbo `happy` presentando la misión
  │     ├── título [home.dailyGoal.title] + descripción corta [home.dailyGoal.desc]
  │     ├── estado: pendiente → Botón primary lg [home.dailyGoal.start]  (CTA principal)
  │     │            hecha hoy → sello "¡Hecha!" [home.dailyGoal.done] (icono ✓ + texto)
  │     └── (1 toque desde aquí a la sesión = cumple ≤2 toques)
  ├── [Acceso: Elegir yo]
  │     └── Botón secondary [home.play.chooseSubject] → Elegir materia
  ├── [Acceso: Para imprimir]
  │     └── Botón secondary [home.print.enter] → Zona imprimir
  └── [Acceso: Mi mochila]
        └── Botón ghost/icono [nav.menu.backpack] → Mochila
Footer/persistente:
  └── Botón ajustes (icono engranaje, esquina, ≥48px) → Ajustes
Estados:
  · primer día / sin racha → StreakBadge muestra "¡Empieza tu racha!" [home.streak.empty]
  · racha rota (no jugó ayer) → mensaje AMABLE [home.streak.reset] ("¡Hoy empezamos una nueva!"), nunca culpa
  · misión ya hecha hoy → bloque héroe celebra y ofrece "jugar más" (no obliga)
A11y: jerarquía de headings; CTA "misión" con etiqueta clara y foco visible (US-06 A11y).
```

**Decisión UX:** la "Misión de hoy" es el héroe para **reducir la decisión** (un niño de 8 años no quiere elegir entre 30 temas). "Elegir yo" está disponible pero secundario. Esto refuerza el hábito sin quitar libertad.

---

## 3. ELEGIR MATERIA → ELEGIR TEMA

`US-03`. Dos niveles. Cada materia es una zona de la isla.

```
[PANTALLA: Elegir materia]
Header: título [subjects.title] + botón volver a HOME (≥48px)
Body:
  └── Rejilla de SubjectCard (2 col móvil / 2-3 col tablet, tarjetas grandes ≥ 60px alto)
        ├── Matemáticas [content.math.title]   (color math + icono propio)
        ├── Lengua      [content.spanish.title] (color spanish + icono)
        ├── Natural Science [content.science.title] (color science + icono + micro-etiqueta "EN")
        ├── Ciencias Sociales [content.social.title] (color social + icono)
        └── Inglés      [content.english.title] (color english + icono + micro-etiqueta "EN")
Estados:
  · materia sin contenido aún → tarjeta "Pronto" (aria-disabled, texto), no rompe navegación
A11y: cada materia = control accesible con etiqueta (icono+nombre) y foco visible (US-03 A11y).
        El color NO es el único distintivo: icono + nombre identifican la materia (daltonismo).
```

```
[PANTALLA: Elegir tema]
Header: nombre de la materia (color + icono) + volver a materias
Body:
  └── Lista/rejilla de TopicCard del bloque curricular
        ├── tema normal [content.<materia>.<tema>.title] + icono
        ├── tema "Reto 4º" → etiqueta especial [content.label.challengeG4]
        │     · icono cohete/estrella dorada + texto "Reto 4º" (no solo color morado)
        │     · opcional, nunca obligatorio para avanzar
        └── tema sin contenido → "Pronto" (aria-disabled + texto)
        └── opción "Mezcla sorpresa" del tema/materia [content.label.surpriseMix]
Footer: ninguno
Estados: vacío (materia sin temas con contenido) → mensaje "Pronto más juegos aquí"
A11y: cada tema control accesible; "Reto 4º" comunicado por icono+texto, no solo color.
```

---

## 4. SESIÓN DE EJERCICIOS

`US-04`, el corazón del producto. N ejercicios (5-10) de uno en uno, con feedback inmediato celebratorio. Sin presión de tiempo (default).

```
[PANTALLA: Sesión — un ejercicio]
Header (persistente durante la sesión):
  ├── SessionProgress: barra "X de N" (relleno + texto + Rumbo avanzando)
  ├── StarCounter de la sesión (sube al acertar)
  └── Botón salir (≥48px, separado de zona de respuesta) → confirma "¿Seguro?" sin drama
Body (cambia según tipo de ejercicio del MVP):
  ├── Enunciado [content.<id>.enunciado]  (≥20px, izquierda, sin mayúsculas sostenidas)
  ├── [Zona de respuesta — según tipo]
  │     ├── opcion-multiple  → OptionCards (radio, rejilla 1col móvil / 2×2 tablet)
  │     ├── verdadero-falso  → 2 OptionCards grandes con icono (👍/👎) + texto V/F
  │     ├── respuesta-corta  → display + NumPad en pantalla (mates) / banco de palabras
  │     └── emparejar        → MatchingBoard (clic-clic, NO solo arrastre — condición dura)
  └── [Acción]
        └── Botón primary [quiz.action.check]  (activo cuando hay respuesta elegida)
Feedback (overlay/inline tras "comprobar"):
  ├── ACIERTO:
  │     · Rumbo `happy` + animación rebote + estrella vuela al contador (reduce-motion: estática)
  │     · icono ✓ + mensaje festivo VARIADO [quiz.feedback.correct.<1..n>] (rotación aleatoria)
  │     · color verde + sonido opcional → Botón [quiz.action.next]
  └── FALLO (sin castigo):
        · Rumbo `cheer` + tono amable, sin rojo agresivo
        · icono ✗/↻ + mensaje variado [quiz.feedback.almost.<1..n>] ("¡Casi! Otra vez")
        · permite REINTENTAR; tras 1-2 intentos revela la correcta [quiz.feedback.solution]
          (resalta la opción correcta: icono + color + texto "Esta era"), avanza sin drama
        · NO resta estrellas ni racha
Estados:
  · sin respuesta elegida → "comprobar" deshabilitado (aria-disabled, no solo color)
  · cargando contenido → no debería verse (todo local); si acaso, skeleton breve
  · último ejercicio resuelto → transición a Resultados
A11y (US-04):
  · todo resoluble solo con teclado (opciones, V/F, NumPad, matching clic-clic)
  · feedback NUNCA solo por color: icono + texto siempre; aria-live anuncia acierto/error
  · alternativa textual al sonido; prefers-reduced-motion atenúa animación sin perder info
  · matching: selección secuencial + aria-live del emparejamiento
```

**Generación de mates (D-6):** los ejercicios de cálculo generan operandos aleatorios al montar (plantilla i18n con interpolación `{{a}} {{b}}`); la respuesta se calcula, no se almacena. Visualmente esto es transparente para el niño: ve una operación normal.

**Decisión UX — fallo amable:** el patrón es *reintento → pista opcional → revelar*. Nunca un "INCORRECTO" en rojo a pantalla. El error es una invitación, no un veredicto. Rumbo anima, no regaña.

---

## 5. RESULTADOS DE SESIÓN — celebración

`US-04`, `US-05`. Pantalla de cierre festiva: el botín del día.

```
[PANTALLA: Resultados]
Header: confeti (respeta reduce-motion: estático) + Rumbo `happy` grande
Body:
  ├── Titular celebratorio [results.title]  (display, grande, 3xl)
  ├── Estrellas ganadas hoy:
  │     └── nº grande + estrellas (animación de entrada / estáticas en reduce-motion)
  │           [results.starsEarned] (aria-label "Has ganado N estrellas")
  ├── Avance de racha:
  │     ├── racha subió → 🔥 nº + [results.streak.up] ("¡Llevas N días seguidos!")
  │     └── primer día → [results.streak.first] ("¡Empiezas una racha!")
  ├── [Si desbloqueó medalla] → CelebrationModal/inset de medalla
  │     └── Badge a color + nombre [content.badge.<id>] + [results.badge.unlocked]
  └── [Acciones]
        ├── Botón primary [results.action.playAgain] → nueva sesión o elegir
        └── Botón secondary [results.action.home] → HOME
Estados:
  · misión del día completada → celebración ESPECIAL [results.dailyGoal.done] + marca dailyGoal.lastDoneDate
  · sin medalla nueva → se omite ese bloque (no se inventa)
A11y (US-05): estrellas/racha/medallas con texto alternativo comprensible, no solo iconos.
        El refuerzo (cuánto ganó) vive en texto+icono, nunca solo en la animación.
```

**Persistencia al cerrar la sesión:** se consolidan estrellas (`stars.total`), se recalcula la racha (ADR-001 §4: comparar fecha local con `lastPlayedDate`), se evalúan medallas. Si la racha se rompió por un día sin jugar, el mensaje es **amable** (US-05), nunca culpabilizador.

---

## 6. MOCHILA — mis estrellas, racha y medallas

`US-05`. El escaparate del orgullo del niño. Motiva sin comparar (no hay ranking).

```
[PANTALLA: Mi mochila]
Header: avatar + apodo + volver a HOME
Body:
  ├── [Resumen]
  │     ├── StarCounter total [backpack.stars]
  │     ├── StreakBadge actual + mejor racha [backpack.streak.current / .best]
  ├── [Colección de medallas]
  │     └── Rejilla de Badge
  │           ├── desbloqueada → ilustración a color + nombre + fecha
  │           └── bloqueada → silueta atenuada + candado + "Por conseguir" (no solo color)
  └── (sin secciones de comparación con otros — explícitamente fuera de scope)
Estados:
  · sin medallas aún → todas en estado bloqueado con pista de cómo conseguirlas
A11y: cada estrella/racha/medalla con aria-label; bloqueada/desbloqueada distinguible sin color.
```

---

## 7. ZONA IMPRIMIR → VISTA FICHA

`US-07`. Generar ficha A4 con soluciones. La acción de imprimir suele hacerla un adulto, pero la interfaz sigue siendo para el niño.

```
[PANTALLA: Zona imprimir]
Header: título [print.title] + Rumbo + volver a HOME
Body:
  ├── Paso 1: elegir MATERIA (SubjectCards, igual que sección 3)
  ├── Paso 2: elegir TEMA (TopicCards) o "Mezcla sorpresa"
  ├── [MVP: cantidad fija 10 ejercicios; post-MVP: pocos/normal/muchos]
  ├── [MVP: dificultad normal; post-MVP: fácil/normal/con retos]
  ├── (toggle) incluir soluciones on/off [print.includeSolutions]
  └── Botón primary [print.create] → Vista ficha
Estados: tema sin contenido imprimible → desactivado con "Pronto"
A11y (US-07): todos los controles (materia/tema/imprimir) accesibles sin ratón.

[PANTALLA: Vista ficha (preview + @media print)]
Pantalla (preview):
  ├── Vista previa A4 de la ficha
  └── Botón primary [print.action.print] → window.print()
  └── Botón volver para reconfigurar
@media print (lo que sale en papel — ver 00 §7.2):
  ├── Cabecera ligera: título + ilustración de línea + "Mi nombre: ___" + "Fecha: ___" + materia/tema
  ├── Cuerpo: ejercicios numerados, B/N, negro sólido, ≥12pt, espacio de escritura ≥10mm,
  │           break-inside: avoid por ejercicio
  ├── Pie: mensaje de ánimo [print.footer.cheer]
  └── Hoja de soluciones: break-before: page (si incluir-soluciones on)
        · mismo nº de ejercicio + respuesta correcta
        · mates generadas (D-6): valores CONGELADOS en esta ficha + su solución coherente
A11y/print: negro sólido sobre blanco; estrellas como contorno; nada depende de color; márgenes ≥15mm.
```

---

## 8. AJUSTES — idioma y sonido

`US-08` (P1). Pensado para que un niño o un adulto lo use sin complicación.

```
[PANTALLA: Ajustes]
Header: título [settings.title] + volver
Body:
  ├── Idioma de la interfaz [settings.language]
  │     └── toggle/selector ES | EN — cambia sin recargar ni perder progreso
  │           · nota: contenido de Lengua/Inglés/Natural Science NO se traduce (D-1, D-5)
  ├── Sonido [settings.sound]
  │     └── toggle mute (control grande ≥60px, icono altavoz/tachado + texto) — persiste
  └── [opcional] Reducir movimiento [settings.reducedMotion]
        └── toggle que fuerza prefers-reduced-motion en la app
Estados: cambios se aplican al momento y se persisten (prefs.lang / prefs.muted / prefs.reducedMotion)
A11y (US-08): todos los controles accesibles con foco visible; toggles con estado textual, no solo visual.
```

---

## 9. Estados globales y casos límite (para Frontend)

| Situación | Comportamiento de diseño |
|---|---|
| Primer arranque sin localStorage | Onboarding; si se salta, default. App jugable de inmediato. |
| localStorage no disponible (modo privado) | App funciona en memoria; no persiste racha. Sin error visible que asuste al niño (ADR-001 §4). |
| Datos corruptos | Se descartan, arranca limpio (ADR-001 §4). El niño no ve un crash. |
| Sesión cerrada a medias | Al volver, empieza sesión nueva (no se reanuda en MVP — US-09 es P2). Sin culpa. |
| Racha rota | Mensaje amable y positivo en HOME y Resultados (US-05). |
| Tema/materia sin contenido | Estado "Pronto" visible y deshabilitado, nunca un hueco roto (US-03). |
| Cambio de idioma a media navegación | Interfaz se actualiza en vivo; contenido de materias de idioma fijo no cambia (US-08). |

---

## 10. Resumen de pantallas para el MVP (P0)

| Pantalla | User story | Prioridad |
|---|---|---|
| Home (isla) | US-01 | P0 |
| Onboarding avatar/apodo | US-02 | P1 |
| Elegir materia / tema | US-03 | P0 |
| Sesión de ejercicios (4 tipos + feedback) | US-04 | P0 |
| Resultados (celebración) | US-04/05 | P0 |
| Mochila (estrellas/racha/medallas) | US-05 | P0 |
| Misión del día (bloque en Home) | US-06 | P1 |
| Zona imprimir + vista ficha | US-07 | P0 |
| Ajustes (idioma/sonido) | US-08 | P1 |

Todos los tipos de ejercicio del MVP (`opcion-multiple`, `verdadero-falso`, `respuesta-corta`/numérica, `emparejar`) están cubiertos en la pantalla de Sesión (sección 4) con su variante de zona de respuesta y sus criterios de accesibilidad.
