# Sistema de diseño y universo visual — TerceroDePrimaria

> Documento de UX-UI. Dirección de diseño base del proyecto.
> Estado: entregable para Maquetador (implementación visual) y Frontend (interacción).
> Fecha: 2026-06-25.
> Coordinado con el agente de Accesibilidad (WCAG 2.1 AA) desde el diseño, no como corrección posterior.

Este documento es la **única fuente de verdad de la identidad visual**. El Maquetador implementa estos tokens en código (CSS custom properties); el Frontend construye la interacción encima. Ningún agente inventa color, tipografía ni componentes nuevos sin pasar por aquí.

---

## 1. Universo visual: "El Verano de los Exploradores"

### Concepto

La app es una **isla de verano** que el niño explora durante las vacaciones. Cada materia es una **zona de la isla** (la playa de los números, el bosque de las palabras, el laboratorio de la naturaleza...). El hilo conductor es **el verano**: sol, agua, arena, frutas, helados, cometas. Festivo por defecto, sin ser infantilizante ni recargado.

**Por qué este concepto y no otro:**

- Encaja con el contexto real (uso en verano, vacaciones) sin forzarlo.
- Da un marco coherente a la gamificación: explorar zonas = probar materias; coleccionar = medallas; "volver mañana a la isla" = racha.
- Es neutro en género y cultura: ningún personaje ni temática excluye a nadie.
- Permite ilustración de **línea simple y plana**, barata de producir y de imprimir (sostenibilidad, ver versión imprimible).

### Mascota guía: **Rumbo**, la brújula-sol

Un personaje guía de bajo coste visual y alta personalidad: una **brújula con cara amable y rayos de sol** llamada **Rumbo**. No es obligatorio para nada, nunca bloquea. Su función:

- **Da la bienvenida** en la home y presenta la "Misión de hoy".
- **Acompaña el feedback**: celebra los aciertos y anima en los fallos (con expresión, no con texto solo).
- **Orienta sin texto denso**: una brújula que "señala hacia dónde ir" es una metáfora de navegación legible incluso para quien aún lee despacio.

Rumbo tiene **3 expresiones base** (suficientes para el MVP, ampliables):

| Estado | Expresión | Uso |
|---|---|---|
| `rumbo.happy` | Sonriente, rayos arriba | Home, acierto, celebración de sesión |
| `rumbo.cheer` | Guiño + pulgar/rayo animando | Fallo amable ("¡casi!"), reintento |
| `rumbo.idle` | Neutro amable | Pantallas de navegación, descanso |

> Rumbo es **decoración semántica reforzante, nunca el único canal de información**. Cada estado emocional de Rumbo va siempre acompañado de icono + texto (regla "no solo color, no solo imagen"). Las imágenes de Rumbo llevan `alt` descriptivo o `aria-hidden` cuando son puramente decorativas y la información ya está en texto adyacente.

### Personalidad visual (para que el Maquetador no tenga que inventar)

- **Formas:** todo redondeado. Sin esquinas duras. Botones tipo "caramelo", tarjetas con radio generoso.
- **Ilustración:** estilo plano (flat), línea gruesa y limpia, relleno de color sólido. Sin degradados complejos, sin sombras realistas, sin texturas pesadas (rendimiento en tablets modestas + impresión).
- **Densidad:** baja. Mucho aire. Una decisión por pantalla. El horror vacui es enemigo de un niño de 8 años.
- **Energía:** color saturado y alegre, pero **disciplinado por el contraste** (ver paleta). Festivo ≠ estridente ni caótico.
- **Movimiento:** rebotes suaves (ease-out con un pelín de overshoot), confeti en celebraciones. Siempre respetando `prefers-reduced-motion`.

---

## 2. Tokens de diseño

> Nomenclatura: `--tdp-<categoria>-<rol>[-<variante>]`. El Maquetador los implementa como CSS custom properties en `:root`. Frontend nunca usa valores literales, siempre el token.
> Convención de capas: **tokens primitivos** (valor crudo, ej. `--tdp-color-blue-500`) → **tokens semánticos** (rol, ej. `--tdp-color-primary`). Los componentes usan SIEMPRE el token semántico.

### 2.1 Color — primitivos

Paleta veraniega. Todos los valores verificados contra el requisito de contraste (sección 2.2). Los hex marcados como "texto sobre claro" cumplen ≥ 4.5:1 sobre `surface`; los marcados "solo relleno/decoración" no se usan para texto pequeño.

```
/* Azules — primario, cielo/mar de verano */
--tdp-blue-100:  #DCEFFB;   /* fondo suave, relleno decorativo */
--tdp-blue-300:  #5FC4E8;   /* relleno, ilustración */
--tdp-blue-600:  #0B7FB0;   /* texto/acción sobre claro — AA */
--tdp-blue-800:  #075A7D;   /* texto de alto contraste */

/* Turquesa — secundario fresco */
--tdp-teal-300:  #4FD1C5;   /* relleno */
--tdp-teal-700:  #117768;   /* texto/acción sobre claro — AA */

/* Coral/Naranja — acento cálido, energía */
--tdp-coral-300: #FF9E80;   /* relleno */
--tdp-coral-600: #C7452A;   /* texto/acción sobre claro — AA */
--tdp-orange-400:#FFB23E;   /* relleno cálido, soles */
--tdp-orange-700:#9A5B00;   /* texto sobre claro — AA */

/* Amarillo — estrellas, recompensa, brillo */
--tdp-yellow-300:#FFD84D;   /* estrellas, relleno (NO texto pequeño) */
--tdp-yellow-700:#8A6300;   /* texto "estrellas" sobre claro — AA */

/* Verde — acierto */
--tdp-green-200: #C6F0D2;   /* fondo de estado acierto */
--tdp-green-300: #5FD080;   /* relleno acierto (NO texto pequeño) */
--tdp-green-700: #1B7A3E;   /* texto/icono acierto sobre claro — AA */

/* Rojo/Coral — error amable (no agresivo) */
--tdp-red-200:   #FBD9D2;   /* fondo de estado "casi" */
--tdp-red-600:   #C7452A;   /* texto/icono error sobre claro — AA */

/* Morado — categoría/medallas especiales, Reto de 4º */
--tdp-purple-300:#B79BE8;   /* relleno */
--tdp-purple-700:#5E3BA5;   /* texto sobre claro — AA */

/* Neutros — texto y superficies */
--tdp-ink-900:   #1E2433;   /* texto principal (casi negro azulado, cálido) */
--tdp-ink-700:   #3D4660;   /* texto secundario — AA sobre surface */
--tdp-ink-500:   #6B7393;   /* texto deshabilitado/sutil (no para texto esencial) */
--tdp-paper-0:   #FFFFFF;   /* superficie base */
--tdp-paper-50:  #FFF9F0;   /* fondo cálido de app (crema verano) */
--tdp-paper-100: #FBEFD9;   /* tarjetas/zonas */
--tdp-border-200:#E7D9BF;   /* bordes suaves sobre fondo cálido */
```

### 2.1.b Color — semánticos (los que usan los componentes)

```
/* Marca y acción */
--tdp-color-primary:        var(--tdp-blue-600);   /* acción principal "¡Jugar!" */
--tdp-color-primary-strong: var(--tdp-blue-800);
--tdp-color-secondary:      var(--tdp-teal-700);
--tdp-color-accent:         var(--tdp-coral-600);

/* Superficies */
--tdp-color-bg:             var(--tdp-paper-50);   /* fondo de la app */
--tdp-color-surface:        var(--tdp-paper-0);    /* tarjetas, modales */
--tdp-color-surface-warm:   var(--tdp-paper-100);  /* zonas/secciones */
--tdp-color-border:         var(--tdp-border-200);

/* Texto */
--tdp-color-text:           var(--tdp-ink-900);
--tdp-color-text-muted:     var(--tdp-ink-700);
--tdp-color-text-on-primary:#FFFFFF;               /* verificar AA sobre primary */

/* Estados de feedback */
--tdp-color-success:        var(--tdp-green-700);   /* icono/texto/borde acierto */
--tdp-color-success-bg:     var(--tdp-green-200);
--tdp-color-error:          var(--tdp-red-600);     /* icono/texto/borde "casi" */
--tdp-color-error-bg:       var(--tdp-red-200);
--tdp-color-focus:          var(--tdp-blue-800);    /* anillo de foco — ver 2.6 */

/* Gamificación */
--tdp-color-star:           var(--tdp-yellow-300);  /* relleno estrella */
--tdp-color-star-text:      var(--tdp-yellow-700);  /* número de estrellas */
--tdp-color-streak:         var(--tdp-coral-600);   /* fuego/racha */
--tdp-color-challenge:      var(--tdp-purple-700);  /* Reto de 4º */
```

> **Regla de oro de color (accesibilidad):** el color **nunca** es el único portador de significado. Acierto/error/racha/Reto siempre se acompañan de **icono + texto** (y forma cuando aplica). Ver sección 5 y la regla "no solo color".

### 2.1.c Color por materia (zonas de la isla)

Cada materia tiene un color de identidad **para reconocimiento, no para transmitir información esencial** (siempre acompañado de icono + nombre).

```
--tdp-subject-math:    var(--tdp-blue-600);    /* Matemáticas — playa de números */
--tdp-subject-spanish: var(--tdp-coral-600);   /* Lengua — bosque de palabras */
--tdp-subject-science: var(--tdp-green-700);   /* Natural Science (EN) — laboratorio */
--tdp-subject-social:  var(--tdp-orange-700);  /* Ciencias Sociales — mundo */
--tdp-subject-english: var(--tdp-purple-700);  /* Inglés — faro */
```

Cada materia se distingue por **color + icono propio + nombre textual**. Un niño daltónico reconoce la materia por icono y nombre aunque el color le sea ambiguo.

### 2.2 Contraste (regla de implementación)

> Valores a confirmar/ajustar por el agente de Accesibilidad; provisionalmente fijados a best practice WCAG 2.1 AA con margen extra por ser público infantil.

- **Texto normal** (< 24px, o < 18.66px si bold): contraste **≥ 4.5:1** contra su fondo.
- **Texto grande** (≥ 24px, o ≥ 18.66px bold): contraste **≥ 3:1**. *Aun así, en esta app perseguimos 4.5:1 también en texto grande siempre que sea viable, por margen.*
- **Componentes de UI y estados** (bordes de botón, iconos informativos, indicador de foco, límites de un control): contraste **≥ 3:1** contra fondos adyacentes.
- **Indicador de foco:** ver 2.6.
- Los rellenos decorativos saturados (amarillo estrella, verde 300) **no portan texto pequeño**; el texto sobre ellos usa la variante `-700`/`-800`.

### 2.3 Tipografía

**Familia (decisión de UX-UI, validada por Accesibilidad):**

- **Cuerpo, enunciados y UI:** **Atkinson Hyperlegible** (fuente diseñada para legibilidad, licencia abierta). Es la **recomendación firme de Accesibilidad** por tres motivos clave para esta edad: distingue **I / l / 1** sin ambigüedad, usa **a y g de una sola planta** (single-story, las formas que los niños aprenden a escribir) y maximiza la diferencia entre caracteres parecidos. Alternativas defendibles del mismo perfil: **Andika** (diseñada para alfabetización infantil) o **Lexend** (optimizada para fluidez lectora infantil).
- **Display festivo opcional (solo titulares):** se permite una fuente redondeada con más carácter (ej. **Nunito** 800) **únicamente en titulares cortos** (home, celebración), nunca en enunciados ni cuerpo. Si añade peso de descarga sin aportar, se descarta y todo va en Atkinson Hyperlegible.
- **Fallback de sistema:** `system-ui, "Segoe UI", Roboto, sans-serif`.
- El Maquetador **autoaloja** la fuente (no CDN externo: privacidad + rendimiento offline-friendly, coherente con D-3). El Abogado valida la licencia al añadirla (gate de dependencia).

> **Por qué NO fuentes "para dislexia" (ej. OpenDyslexic):** la evidencia de que mejoran la velocidad de lectura es débil y algunos niños las perciben extrañas. Accesibilidad recomienda explícitamente NO imponerlas. En su lugar perseguimos los **factores que sí ayudan a todos los niños**: fuente hiperlegible con caracteres inequívocos, cuerpo grande, interlineado ≥ 1.5, sin mayúsculas sostenidas en enunciados, líneas cortas y contraste alto. Una preferencia de fuente alternativa queda como backlog (no MVP).

**Escala tipográfica** (base 16px = 1rem; pensada para lectura infantil — más grande de lo habitual. Mínimos confirmados por Accesibilidad: cuerpo ≥ 18px, enunciados ≥ 20px):

```
--tdp-font-family-base: "Atkinson Hyperlegible", system-ui, "Segoe UI", Roboto, sans-serif;
--tdp-font-family-display: "Nunito", "Atkinson Hyperlegible", system-ui, sans-serif; /* solo titulares */

--tdp-font-size-xs:   1rem;     /* 16px — texto auxiliar (pistas, contadores). NUNCA por debajo */
--tdp-font-size-sm:   1.125rem; /* 18px — cuerpo / UI general (MÍNIMO de cuerpo, A11Y-TYPO-01) */
--tdp-font-size-base: 1.25rem;  /* 20px — cuerpo cómodo y enunciados (mínimo de enunciado) */
--tdp-font-size-lg:   1.5rem;   /* 24px — enunciados destacados / números de ejercicio */
--tdp-font-size-xl:   2rem;     /* 32px — títulos de pantalla */
--tdp-font-size-2xl:  2.75rem;  /* 44px — números grandes (mates), titular home */
--tdp-font-size-3xl:  3.5rem;   /* 56px — celebración, contador de estrellas */

--tdp-font-weight-regular: 400;
--tdp-font-weight-bold:    700;
--tdp-font-weight-black:   800; /* titulares festivos */

--tdp-line-height-tight:  1.2;  /* solo titulares grandes */
--tdp-line-height-base:   1.5;  /* cuerpo y enunciados (mínimo recomendado) */
--tdp-line-height-loose:  1.6;  /* bloques de lectura (comprensión lectora) */

--tdp-letter-spacing-base: 0;
--tdp-letter-spacing-caps: 0.02em; /* SOLO en etiquetas cortas en mayúscula */
```

**Reglas tipográficas:**

- **Cuerpo de contenido nunca por debajo de 20px** (`--tdp-font-size-base`). Enunciados de ejercicio a 24px (`-lg`).
- **Sin MAYÚSCULAS SOSTENIDAS** en enunciados ni en texto que el niño deba leer para resolver (dificulta la lectura a quien la afianza). Mayúsculas solo en micro-etiquetas decorativas cortas (ej. "RETO 4º").
- **Texto ampliable** hasta 200% sin romper layout ni truncar (requisito US-01 A11y). Usar `rem`, contenedores flexibles, nada de altura fija en cajas de texto.
- Alineación a la **izquierda** para bloques de lectura (no justificado: el justificado crea "ríos" que dificultan la lectura infantil). Centrado permitido solo en titulares y elementos cortos.

### 2.4 Espaciado

Escala base 4px. Generosa: el aire es parte del diseño para niños.

```
--tdp-space-1:  0.25rem;  /*  4px */
--tdp-space-2:  0.5rem;   /*  8px */
--tdp-space-3:  0.75rem;  /* 12px */
--tdp-space-4:  1rem;     /* 16px */
--tdp-space-5:  1.5rem;   /* 24px */
--tdp-space-6:  2rem;     /* 32px */
--tdp-space-7:  3rem;     /* 48px */
--tdp-space-8:  4rem;     /* 64px */

--tdp-gap-touch: 0.75rem; /* 12px — separación MÍNIMA entre objetivos táctiles (anti-toque accidental) */
```

- **Separación entre objetivos táctiles ≥ 12px** (`--tdp-gap-touch`) para evitar toques accidentales con dedos pequeños.
- Padding interno de tarjetas y secciones: mínimo `--tdp-space-5` (24px).

### 2.5 Radios, sombras, bordes

```
/* Radios — todo redondeado, lenguaje "caramelo" */
--tdp-radius-sm:   8px;    /* chips, etiquetas */
--tdp-radius-md:   16px;   /* botones, inputs */
--tdp-radius-lg:   24px;   /* tarjetas, opciones de respuesta */
--tdp-radius-xl:   32px;   /* paneles grandes, modales */
--tdp-radius-pill: 999px;  /* botones tipo píldora, barra de progreso */

/* Sombras — suaves, alegres, nunca dramáticas (estilo plano) */
--tdp-shadow-sm: 0 2px 0 0 rgba(30,36,51,0.12);          /* "borde inferior" tipo botón pulsable */
--tdp-shadow-md: 0 6px 16px -4px rgba(30,36,51,0.18);    /* tarjetas elevadas */
--tdp-shadow-lg: 0 12px 32px -8px rgba(30,36,51,0.22);   /* modales/celebración */

/* Bordes — el contorno también comunica estado (no solo color) */
--tdp-border-width:        2px;  /* borde base de controles */
--tdp-border-width-strong: 3px;  /* estado seleccionado / foco */
```

- Los botones usan el patrón "caramelo": relleno + `--tdp-shadow-sm` que da sensación física de pulsable, y se "hunde" 2px al `:active`.
- **El estado (seleccionado, correcto, incorrecto) se comunica también con grosor/estilo de borde y con icono**, no solo con color de relleno.

### 2.6 Foco visible (accesibilidad)

```
--tdp-focus-ring-width: 3px;
--tdp-focus-ring-offset: 2px;
--tdp-focus-ring-color:  var(--tdp-color-focus); /* azul 800 */
```

- Anillo de foco **siempre visible** al navegar por teclado: `outline: var(--tdp-focus-ring-width) solid var(--tdp-focus-ring-color); outline-offset: var(--tdp-focus-ring-offset);`
- El anillo debe tener contraste **≥ 3:1** contra el fondo adyacente Y contra el componente. Sobre fondos azules (la propia marca), usar un anillo de doble capa (interior claro + exterior oscuro) para garantizar contraste en cualquier superficie.
- **Nunca** `outline: none` sin sustituto visible equivalente.
- El foco es grande y obvio: estos son niños, no usuarios expertos de teclado.

### 2.7 Movimiento

```
--tdp-duration-fast:  120ms;  /* micro-feedback (pulsar) */
--tdp-duration-base:  220ms;  /* transiciones de UI */
--tdp-duration-slow:  450ms;  /* celebraciones, entrada de estrellas */
--tdp-ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1);  /* overshoot festivo suave */
--tdp-ease-out:       cubic-bezier(0.16, 1, 0.3, 1);
```

**Regla `prefers-reduced-motion` (obligatoria):** la celebración animada se envuelve en `@media (prefers-reduced-motion: no-preference)` — **default seguro: si no hay preferencia explícita de movimiento, no se anima la traslación/escala llamativa**. Cuando hay `reduce` (o `prefs.reducedMotion` en localStorage on):
- Se eliminan confeti, rebotes, desplazamientos, partículas, parallax y auto-scroll.
- Las transiciones se reducen a un **fade simple ≤ 200ms** o a cambio instantáneo.
- **La celebración sigue ocurriendo** pero estática: la estrella **aparece** (no vuela), el badge se muestra. La información (estrellas ganadas, "¡Acierto!") nunca depende de la animación — vive en icono + texto fijos.
- El "shake" de error: amplitud pequeña, ≤ 400ms, una vez, y **desactivado** con reduce-motion.

**🚨 Límite de flash (CRÍTICO DE SEGURIDAD — WCAG 2.3.1, NO se salta nunca, ignora la preferencia del usuario):**
- **Nada parpadea/destella más de 3 veces por segundo.** Aplica a confeti, estrellas y feedback de error sin excepción.
- **Sin destellos de gran área a pleno contraste** (p. ej. rojo brillante a pantalla completa). El confeti son partículas pequeñas que caen, jamás un estroboscópico global.
- Este punto es de seguridad (riesgo de crisis fotosensible en un menor): se trata como bloqueante, no como mejora.

---

## 3. Componentes base

> El Maquetador construye estos componentes una sola vez; todas las pantallas los reutilizan. Cada uno con sus estados.

### 3.1 Botón (`Button`)
- **Variantes:** `primary` (acción principal, ej. "¡Jugar!"), `secondary`, `ghost` (navegación sutil), `subject` (color de materia).
- **Tamaños:** `lg` (acción principal, altura mínima **60px**), `md` (estándar, mínimo **48px** de alto), `icon` (botón solo-icono, mínimo **48×48px**; si es control principal del niño como mute, **60×60px**).
- **Estados:** reposo, hover, foco (anillo 2.6), `:active` (se hunde 2px), deshabilitado (sin solo-color: opacidad + cursor + `aria-disabled`).
- Texto siempre presente o, si solo-icono, `aria-label` obligatorio.
- **Target táctil:** ver sección 4.

### 3.2 Tarjeta de opción de respuesta (`OptionCard`)
- Usada en opción múltiple y verdadero/falso. Grande, tocable, con sitio para texto e icono/imagen.
- **Estados:** reposo, foco, seleccionada (borde grueso + check de selección, no solo color), correcta (borde verde + icono ✓ + fondo `success-bg`), incorrecta (borde rojo + icono ✗/↻ + fondo `error-bg`), correcta-no-elegida (resaltada al revelar la solución).
- **Mínimo de altura: 64px**; separación entre opciones ≥ 12px; ancho cómodo para texto que se expande (+30% ES, enunciados largos).
- **Test de escala de grises (A11Y-COLOR-02):** correcto e incorrecto deben distinguirse en B/N por icono + forma + luminosidad, no solo por verde/rojo (peor par para daltonismo rojo-verde).

### 3.3 Barra de progreso de sesión (`SessionProgress`)
- Píldora que se llena con cada ejercicio. Muestra "X de N" en **texto** además del relleno (no solo visual).
- Color `primary`; el segmento lleno se distingue por relleno + un icono de posición (ej. Rumbo avanzando), no solo por color.

### 3.4 Contador de estrellas (`StarCounter`) y racha (`StreakBadge`)
- Estrella (icono) + número (`--tdp-color-star-text`). `aria-label` tipo "12 estrellas".
- Racha: icono de fuego/cohete + número + texto "X días seguidos". Nunca solo el icono.

### 3.5 Teclado numérico en pantalla (`NumPad`)
- Para `numeric_answer`. Teclas grandes (**mínimo 56×56px**), separadas (`--tdp-gap-touch`), con tecla "borrar" y "comprobar".
- La tecla "borrar" va **claramente separada** de las numéricas y de "comprobar" (acciones de signo opuesto, ≥ 24px o ubicación distinta).
- Navegable por teclado físico (cada tecla es un `button` enfocable real, orden de tabulación lógico 1-2-3 / 4-5-6...). El display de lo tecleado lleva `aria-live="polite"` para anunciarlo (A11Y-LIVE-01).

### 3.6 Tarjeta de materia (`SubjectCard`) y de tema (`TopicCard`)
- Color de materia + icono propio + nombre. Tema con etiqueta "Reto 4º" cuando aplica (icono cohete/estrella dorada + texto, no solo color morado).
- Tema sin contenido: estado "pronto" (deshabilitado visible, `aria-disabled`, texto "Pronto"), nunca rompe la navegación.

### 3.7 Modal de celebración (`CelebrationModal`)
- Aparece al desbloquear medalla / terminar sesión. Rumbo `happy`, confeti (respeta reduced-motion), estrellas ganadas en grande, botón claro para continuar.
- Foco se mueve al modal al abrirse; cierre por botón y por teclado (Esc); trap de foco mientras está abierto.

### 3.8 Emparejar (`MatchingBoard`) — componente crítico de accesibilidad
- Dos columnas; el niño relaciona cada elemento de la izquierda con su pareja de la derecha.
- **Requisito DURO (A11Y-KBD-02, condición de Accesibilidad):** el emparejado se hace por **selección secuencial clic-clic / toque-toque** (seleccionar origen → seleccionar destino = empareja), NO solo por arrastre. El arrastre puede existir como atajo en táctil, pero **nunca como única vía**. Un matching solo-drag está BLOQUEADO en el gate pre-release.
- Cada elemento es un `button` enfocable con nombre accesible (ej. "manzana", "número 5").
- Estado de selección por **borde grueso + `aria-pressed`/`aria-selected` + icono**, no solo color.
- Al emparejar, anuncio `aria-live` ("manzana emparejada con 3"). Línea/conector visual entre la pareja, distinguible sin color (grosor/estilo).

### 3.9 Medalla (`Badge`)
- Estados: bloqueada (silueta/atenuada + candado + texto "Por conseguir") vs desbloqueada (a color + fecha). La diferencia no es solo color: silueta vs ilustración a color + icono de candado.

---

## 4. Objetivos táctiles (regla transversal)

> Valores **confirmados por Accesibilidad**, fijados por encima del mínimo WCAG por ser manos infantiles en tablet.

| Elemento | Tamaño táctil | Separación mínima |
|---|---|---|
| Target principal (botones de respuesta, opciones, "¡Jugar!", materias) | **≥ 60×60px** (objetivo 64–72px de alto en opciones) | **≥ 12px** (mejor 16px) |
| Teclas del NumPad | **≥ 56×56px** | ≥ 8px |
| Botones secundarios (siguiente, repetir) | **≥ 48×48px** | ≥ 8px |
| Control de mute (control principal de un niño) | **≥ 60×60px** | — |
| Mínimo absoluto de cualquier interactivo | **44×44px (nunca por debajo)** | — |

- El **área tocable** puede ser mayor que el visual (padding invisible) pero **nunca menor** (un icono de 32px puede tener 60px de hit-area).
- **Acciones de signo opuesto separadas:** "borrar/salir" nunca pegado a "confirmar/enviar" — separación **≥ 24px** o ubicación claramente distinta (A11Y-TOUCH-02).
- **Margen de borde de pantalla ≥ 16px:** evita toques accidentales por el agarre de la tablet.

---

## 5. Principios de interacción para niños (8-9 años)

Estos principios son **vinculantes** para Frontend y Maquetador. Derivan de las specs (tipos de ejercicio, gamificación) y son el corazón del tono festivo.

### 5.1 Feedback inmediato
- Cada respuesta produce reacción **al instante** (< 150ms percibido). Sin spinners visibles en el flujo de ejercicio (todo es local).
- El feedback es **multicanal**: animación (si procede) + **icono** + **texto** + sonido opcional. Quitar cualquier canal no debe quitar la información.

### 5.2 Errores sin castigo
- Un fallo **nunca** resta estrellas ni racha, ni usa rojo agresivo ni lenguaje negativo.
- Tono amable y de ánimo: banco de mensajes variados tipo "¡Casi! Prueba otra vez", "¡Uy! Inténtalo de nuevo". Rumbo en estado `cheer`.
- Se permite **reintento**; tras 1-2 intentos se **revela la respuesta correcta** resaltándola (icono + color + texto "Esta era"), sin dramatizar, y se avanza.
- El error se marca con icono ✗ o ↻ (reintentar) + texto, **no solo color rojo**.

### 5.3 Celebración del acierto
- Acierto = micro-celebración: rebote suave + estrella que vuela al contador + mensaje festivo variado ("¡Genial!", "¡Eres un crack!", "¡Bravo!") + sonido opcional.
- La **variedad** es obligatoria: un banco de mensajes e iconos para que no se repita siempre lo mismo (la repetición aburre a esta edad).
- Acierto se marca con icono ✓ + color verde + texto, **no solo color**.

### 5.4 Progreso visible
- Siempre se ve **dónde está** (barra "X de N") y **qué gana** (estrellas subiendo, racha).
- Meta cercana: mensajes de "¡Ya casi!" cuando queda poco.
- Al terminar: pantalla de celebración con el botín del día (estrellas, avance de racha, medalla si la hubo).

### 5.5 Cero fricción / autonomía del niño
- Sin login, sin formularios. Máximo **2 toques** desde la home hasta empezar a jugar (US-01).
- Selección, no escritura: avatar y apodo de listas cerradas; respuestas por toque/banco de palabras siempre que se pueda (menos teclear = menos frustración).
- Lenguaje de interfaz simple, frases cortas, una instrucción por pantalla. Iconografía que refuerza el texto (un niño que no lee bien una palabra reconoce el icono).
- Siempre hay forma obvia de **volver atrás** y de **ir a casa** (Rumbo/casa), sin perder lo ganado.

### 5.6 Tono de la voz (microcopy)
- Cercano, alegre, en segunda persona ("¡Tú puedes!"), nunca condescendiente ni cursi.
- **Todo el texto va por clave i18n** (`namespace.componente.elemento`), nunca literal en specs ni en código (ver sección 8).

---

## 6. Accesibilidad desde el diseño (resumen vinculante)

> **Validada por el agente de Accesibilidad** (revisión punto por punto desde el diseño). El detalle con todos los criterios de aceptación verificables (`A11Y-*`) vive en **`docs/design/02-criterios-accesibilidad.md`** — fuente de verdad para Maquetador, Frontend, Tester y QA. Este es el resumen vinculante:

1. **Contraste:** **4.5:1 como suelo para TODO el texto** (no nos apoyamos en el 3:1 de texto grande; coste cero y margen para tablet a pleno sol). Componentes/foco ≥ 3:1. Regla clave: los colores vivos van en **fondo/borde/ilustración**, el texto va en neutro oscuro. Ver 2.2.
2. **No solo color:** acierto/error/selección/materia/Reto siempre con **icono + texto + forma**. **Test obligatorio de escala de grises** (acierto/error distinguibles en B/N). Verde-rojo es el peor par para daltonismo rojo-verde: se mantiene por convención pero nunca como única señal.
3. **No solo sonido:** audio opcional, mute persistente y grande (≥ 60px); sin autoplay antes de interacción; toda info sonora tiene equivalente visual/textual (D-4).
4. **Táctil:** principal **≥ 60px**, NumPad ≥ 56px, secundarios ≥ 48px, mínimo absoluto 44px; separación ≥ 12px (≥ 24px entre acciones opuestas). Ver 4.
5. **Tipografía:** **cuerpo ≥ 18px, enunciados ≥ 20px** (en `rem`), line-height ≥ 1.5, sin mayúsculas sostenidas, alineado a la izquierda (sin justificar), líneas ≤ 60-65 caracteres, ampliable a 200% sin romper. Atkinson Hyperlegible.
6. **Foco:** anillo visible **≥ 3px**, offset 2px, contraste ≥ 3:1 contra fondo Y componente, `:focus-visible`, nunca suprimido sin sustituto. Ver 2.6.
7. **Teclado:** toda la app y los tipos de ejercicio operables solo con teclado. **Matching DEBE tener alternativa clic-clic sin arrastre** (condición dura). Sin trampas de foco; foco gestionado en modales.
8. **Movimiento:** `prefers-reduced-motion` desactiva animación sin perder información. **🚨 Nada parpadea > 3 veces/seg (crítico de seguridad fotosensible, bloqueante).**
9. **Lectores de pantalla:** estrellas, racha y medallas con `aria-label` comprensible; Rumbo decorativo con `aria-hidden`; ilustraciones informativas con `alt`. `aria-live` para feedback de acierto/error, emparejamiento y NumPad.
10. **Estructura semántica:** HTML semántico (headings jerárquicos, `button` real, `radio`/`fieldset` para opción múltiple), no divs clicables.

---

## 7. Responsive y versión imprimible

### 7.1 Breakpoints (mobile-first)
```
--tdp-bp-sm:  480px;   /* móvil grande */
--tdp-bp-md:  768px;   /* tablet vertical — DISPOSITIVO OBJETIVO */
--tdp-bp-lg:  1024px;  /* tablet horizontal / portátil */
```
- **Mobile-first.** Se diseña primero para móvil; tablet (768-1024) es el escenario de uso esperado y debe sentirse cómodo y espacioso.
- En tablet, las opciones de respuesta pueden ir en rejilla 2×2; en móvil, apiladas. Botones nunca se encogen por debajo del mínimo táctil.
- Layout que absorbe la expansión de texto ES (+30%) y la ampliación a 200% sin truncar.

### 7.2 Versión imprimible (CSS `@media print`) — reglas confirmadas por Accesibilidad
- A4 vertical, **márgenes ≥ 15mm** (impresoras de aula recortan bordes). Sin fondos de color que gasten tóner.
- **Texto en negro sólido (`#000`) sobre blanco.** Nada de grises claros para contenido esencial (la fotocopiadora del cole los hace ilegibles). Grises solo para decoración prescindible.
- Tipografía: **cuerpo/enunciados ≥ 12pt (recomendado 14pt)**, **operaciones ≥ 16pt**, line-height ≥ 1.5. Misma fuente Atkinson Hyperlegible.
- **Espacio de escritura manuscrita ≥ 10mm** de alto (líneas/casillas).
- **B/N entendible:** ningún ejercicio depende del color. **Las estrellas/recompensas se imprimen como contorno negro** (estrella vacía, casilla para sello), nunca relleno de color (un amarillo en B/N es un gris ilegible).
- Cabecera festiva ligera (línea, no relleno), "Mi nombre / Fecha", materia y tema. Pie de ánimo.
- Hoja de soluciones en página aparte (`break-before: page`); cada ejercicio `break-inside: avoid` (no se parte entre páginas).
- `@media print` oculta toda la UI interactiva (navegación, sonido, gamificación) y deja solo el ejercicio.

---

## 8. i18n en el diseño

- **Ningún texto literal en specs ni en wireframes:** se usan **claves i18n** `namespace.componente.elemento` (ej. `home.cta.play`, `quiz.feedback.correct.1`, `nav.menu.backpack`).
- Los **layouts absorben +30%** de expansión EN→ES: nada de anchos fijos calculados sobre el texto inglés; botones y tarjetas crecen con su contenido.
- Banco de mensajes de feedback = varias claves numeradas (`quiz.feedback.correct.1..n`) que el Frontend rota aleatoriamente.
- Contenido de **Lengua, Inglés y Natural Science no se traduce** con el selector de UI (D-1, D-5): el diseño lo trata como "idioma de la materia fijo"; la interfaz envolvente sí cambia. Visualmente, Natural Science puede llevar una micro-etiqueta "EN" para que el niño entienda que ahí se juega en inglés.

---

## 9. Lo que el Maquetador implementa primero (orden sugerido)

1. Tokens (`:root` con todos los `--tdp-*`) + reset + tipografía base autoalojada.
2. Componentes base: `Button`, `OptionCard`, `SubjectCard`, `SessionProgress`, `StarCounter`/`StreakBadge`, `NumPad`, `CelebrationModal`, `Badge`.
3. Implementación de `prefers-reduced-motion` y del foco visible como capa transversal.
4. Hoja `@media print`.

El Frontend monta la lógica (estado de sesión, generación de mates D-6, persistencia, rotación de microcopy, cálculo de racha) sobre estos componentes.
