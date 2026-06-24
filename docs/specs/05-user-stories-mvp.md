# User Stories — MVP

> Priorizadas. Cada una con criterios de aceptación verificables (Dado/Cuando/Entonces) e incluye al menos un criterio de accesibilidad por feature de interfaz.
> Leyenda de prioridad: **P0** = imprescindible MVP · **P1** = deseable MVP · **P2** = post-MVP.

---

## Épica A — Entrar y empezar a jugar

### US-01 (P0) — Empezar sin barreras
**Como** niño de 8-9 años
**Quiero** abrir la web y empezar a jugar enseguida
**Para** no perder tiempo ni necesitar ayuda de un adulto para entrar.

**Criterios de aceptación:**
- Dado que abro la web por primera vez, cuando carga, entonces veo una pantalla de inicio festiva con un botón grande para empezar, sin pedir login ni datos.
- Dado que pulso "¡Jugar!", cuando empieza, entonces llego a elegir materia/misión en como máximo 2 toques.
- Dado que ya he usado la app antes, cuando vuelvo a abrirla, entonces se recuerda mi avatar, mis estrellas y mi racha (desde `localStorage`).
- **(A11y)** Dado que uso solo el teclado, cuando navego la pantalla de inicio, entonces puedo enfocar y activar el botón "¡Jugar!" sin ratón, con foco visible.
- **(A11y)** Dado que la pantalla tiene texto, cuando la veo, entonces el contraste cumple WCAG 2.1 AA y el texto es ampliable sin romper el diseño.

### US-02 (P1) — Elegir avatar y apodo
**Como** niño
**Quiero** elegir un personaje y un apodo divertido
**Para** sentir que el juego es mío.

**Criterios de aceptación:**
- Dado que es mi primera vez, cuando entro, entonces puedo elegir un avatar de una galería y un apodo de una **lista cerrada** (no escribo texto libre).
- Dado que elijo avatar y apodo, cuando continúo, entonces se guardan en `localStorage` y aparecen luego en mi perfil.
- Dado que no quiero elegir, cuando lo salto, entonces se me asigna uno por defecto y puedo jugar igual.
- **(A11y)** Dado que uso teclado o lector de pantalla, cuando recorro la galería de avatares, entonces cada avatar tiene nombre textual y es seleccionable sin ratón.

---

## Épica B — Hacer ejercicios online

### US-03 (P0) — Elegir materia y tema
**Como** niño
**Quiero** elegir a qué quiero jugar (mates, lengua, etc.) y de qué tema
**Para** practicar lo que me apetece o necesito.

**Criterios de aceptación:**
- Dado que estoy en el menú, cuando lo veo, entonces aparecen las materias con icono y color claros y grandes.
- Dado que elijo una materia, cuando entro, entonces veo sus temas, con los "Retos de 4º" marcados de forma especial.
- Dado que un tema aún no tiene contenido, cuando lo veo, entonces aparece desactivado o marcado como "pronto", sin romper la navegación.
- **(A11y)** Dado que navego por teclado, cuando recorro materias y temas, entonces cada uno es un control accesible con etiqueta y foco visible.

### US-04 (P0) — Resolver una sesión de ejercicios con feedback
**Como** niño
**Quiero** hacer una tanda de ejercicios y saber al momento si acierto
**Para** aprender jugando y sentirme bien.

**Criterios de aceptación:**
- Dado que empiezo una sesión, cuando arranca, entonces se me presentan los ejercicios de uno en uno con una barra de progreso de la sesión.
- Dado que respondo correctamente, cuando confirmo, entonces recibo feedback festivo inmediato (animación + mensaje variado) y gano estrellas.
- Dado que fallo, cuando confirmo, entonces el mensaje es amable, puedo reintentar y/o ver la respuesta correcta tras 1-2 intentos, sin penalización dura.
- Dado que termino los ejercicios, cuando acaba la sesión, entonces veo una pantalla de celebración con las estrellas ganadas y el avance de mi racha.
- Dado el tipo de ejercicio, cuando lo resuelvo, entonces los tipos del MVP funcionan: opción múltiple, verdadero/falso, respuesta numérica y emparejar.
- **(A11y)** Dado que uso solo teclado, cuando resuelvo cualquier tipo de ejercicio del MVP, entonces puedo seleccionar y confirmar la respuesta sin ratón.
- **(A11y)** Dado que el acierto/fallo se indica, cuando recibo feedback, entonces no se transmite **solo por color**: hay icono y texto. Y existe alternativa textual al sonido.
- **(A11y)** Dado que activé "reducir movimiento", cuando hay animaciones, entonces se atenúan o desactivan (`prefers-reduced-motion`).

---

## Épica C — Motivación y hábito

### US-05 (P0) — Ver mis estrellas, racha y medallas
**Como** niño
**Quiero** ver cuántas estrellas tengo, mi racha y mis medallas
**Para** sentirme orgulloso y querer volver mañana.

**Criterios de aceptación:**
- Dado que tengo progreso, cuando abro "Mi mochila", entonces veo mis estrellas totales, mi racha actual y mejor racha, y mis medallas desbloqueadas.
- Dado que desbloqueo una medalla, cuando ocurre, entonces aparece una celebración especial y la medalla queda guardada.
- Dado que completo una sesión hoy, cuando termino, entonces mi racha sube si es un día nuevo (basado en la fecha local).
- Dado que ha pasado un día sin jugar, cuando vuelvo, entonces la racha se reinicia con un mensaje **amable y positivo**, nunca culpabilizador.
- **(A11y)** Dado que uso lector de pantalla, cuando reviso mi mochila, entonces estrellas, racha y medallas tienen texto alternativo comprensible (no solo iconos).

### US-06 (P1) — Misión del día
**Como** niño
**Quiero** una misión sugerida cada día
**Para** no tener que decidir y para mantener mi hábito.

**Criterios de aceptación:**
- Dado que entro un día nuevo, cuando veo el inicio, entonces hay una "Misión de hoy" con un botón directo para empezarla.
- Dado que completo la misión del día, cuando termino, entonces recibo una celebración especial y se marca como hecha hoy (`dailyGoal.lastDoneDate`).
- **(A11y)** Dado que navego por teclado, cuando está la misión del día, entonces el botón de empezarla es accesible y tiene etiqueta clara.

---

## Épica D — Versión imprimible

### US-07 (P0) — Generar una ficha imprimible con soluciones
**Como** niño o familia
**Quiero** crear una ficha de ejercicios para imprimir y hacerla en papel
**Para** practicar sin pantalla.

**Criterios de aceptación:**
- Dado que entro en "Para imprimir", cuando elijo materia y tema, entonces puedo generar una ficha A4 con varios ejercicios de ese tema.
- Dado que genero la ficha, cuando la veo, entonces incluye cabecera con espacio para nombre/fecha y una **hoja de soluciones** al final.
- Dado que pulso "Imprimir", cuando se abre el diálogo del navegador, entonces la ficha se imprime bien en A4 (saltos de página correctos, sin cortar ejercicios a la mitad).
- Dado que imprimo en blanco y negro, cuando hago la ficha, entonces todos los ejercicios se entienden sin depender del color.
- **(A11y)** Dado que uso teclado, cuando configuro y genero la ficha, entonces todos los controles (materia, tema, imprimir) son accesibles sin ratón.

---

## Épica E — Preferencias e i18n

### US-08 (P1) — Cambiar idioma y silenciar
**Como** niño o familia
**Quiero** ajustar idioma y sonido
**Para** usar la app a mi gusto.

**Criterios de aceptación:**
- Dado que abro ajustes, cuando los veo, entonces puedo cambiar entre ES y EN y la interfaz se actualiza sin recargar ni perder progreso.
- Dado que silencio el sonido, cuando juego, entonces no suena audio pero el feedback visual sigue funcionando, y la preferencia persiste.
- Dado que el contenido de Lengua Castellana e Inglés, cuando cambio el idioma de la UI, entonces el contenido propio de esas materias **no se traduce** (es su asignatura), solo cambia la interfaz envolvente.
- **(A11y)** Dado que uso teclado, cuando entro en ajustes, entonces todos los controles son accesibles con foco visible.

---

## Post-MVP (P2) — backlog explícito

- US-09 (P2) Reanudar sesión a medias.
- US-10 (P2) "Mezcla sorpresa" en imprimible + elección de cantidad/dificultad + modo ahorro de tinta.
- US-11 (P2) Tipos de ejercicio avanzados: arrastrar/clasificar, hotspot sobre imagen, colorear en pantalla, completar con teclado.
- US-12 (P2) Modo contrarreloj festivo opcional.
- US-13 (P2) Más medallas y eventos temáticos de verano.
- US-14 (P2) PWA / uso offline instalable.

---

## Definición del MVP (alcance mínimo entregable)

El MVP entregable incluye **P0**:
- Entrada sin login con persistencia local (US-01).
- Elegir materia/tema (US-03).
- Sesión de ejercicios con los 4 tipos base y feedback festivo (US-04).
- Estrellas, racha y medallas básicas (US-05).
- Ficha imprimible con soluciones (US-07).

Con un **subconjunto de contenido inicial** suficiente (recomendado: 2-3 temas por materia, varios ejercicios cada uno) para que la experiencia tenga sustancia desde el día uno. La producción del contenido completo del catálogo es trabajo continuo, no bloqueante para el primer release.

---

## Métricas de negocio
No aplican: el proyecto es gratuito, sin interés comercial y sin servidor para recoger métricas. Growth no está en modo estratega. No se instrumentan eventos de negocio. (Cualquier métrica local de uso quedaría en el dispositivo y no se recoge.)
