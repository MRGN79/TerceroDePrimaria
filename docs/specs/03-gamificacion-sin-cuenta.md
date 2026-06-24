# Gamificación sin cuenta

> Cómo motivar y crear hábito diario sin servidor ni login. Toda la persistencia vive en `localStorage`.
> El tono festivo es requisito funcional de primer nivel: estas mecánicas son el corazón del producto, no un añadido.

## Principio: motivar sin comparar, premiar sin castigar

- No hay ranking ni comparación con otros niños (no hay servidor, y además sería contraproducente a esta edad).
- El niño compite **consigo mismo**: su racha, sus estrellas, su colección de medallas.
- Nunca se "pierde" progreso ganado por fallar un ejercicio. Fallar es parte del juego.

---

## Mecánicas

### 1. Estrellas por ejercicio y por sesión (`stars`)
- Cada ejercicio acertado da **estrellas** (ej. 1 estrella a la primera, opción de "media" si acierta tras pista).
- Al final de la sesión, animación festiva con el total de estrellas ganadas hoy.
- **Persistencia:** total acumulado histórico en `localStorage` (`stars.total`). Las de la sesión son efímeras hasta consolidarse al cerrar la sesión.

### 2. Barra de progreso de la sesión (`session_progress`)
- Durante una sesión (un conjunto de N ejercicios, ej. 5-10), barra que se llena.
- Da sensación de avance y meta cercana ("¡ya casi!").
- **Persistencia:** ninguna entre sesiones; es del momento. Si el niño cierra a mitad, la sesión se considera no terminada (ver caso edge).

### 3. Racha diaria (`daily_streak`) — pilar del hábito
- Cada día que el niño **completa al menos una sesión**, la racha sube en 1.
- Visual festivo: contador con fuego/cohete, mensaje "¡Llevas 5 días seguidos! 🔥".
- Si pasa un día sin completar, la racha se reinicia a 0 (con mensaje amable, sin drama: "¡Hoy empezamos una racha nueva!").
- **Persistencia:** `localStorage`: `streak.current`, `streak.best`, `streak.lastCompletedDate` (fecha local, no hora). El cálculo compara la fecha de hoy con `lastCompletedDate`.
- **Regla anti-frustración:** la racha se basa en el calendario local del dispositivo. Si el reloj del dispositivo cambia, puede haber inconsistencias; se acepta como limitación sin servidor (ver caso edge).

### 4. Medallas / insignias (`badges`)
- Colección de medallas desbloqueables por logros concretos:
  - "Primera sesión" (onboarding).
  - "Racha de 3 / 7 / 14 días".
  - "Maestro de las tablas" (X aciertos en `operations.times_tables`).
  - "Explorador" (haber probado las 5 materias).
  - "Valiente" (haber completado un Reto de 4º).
  - "100 estrellas".
- Pantalla de "Mi mochila / Mis medallas" donde el niño ve su colección (festiva, presumible).
- **Persistencia:** `localStorage`: `badges.unlocked` (array de ids) con fecha de desbloqueo.

### 5. Feedback inmediato celebratorio (`feedback`)
- Acierto: animación corta + sonido alegre (con mute) + frase variada y festiva ("¡Genial!", "¡Eres un crack!", "¡Bravo!").
- Fallo: tono amable, nunca negativo. "¡Casi! Inténtalo otra vez" + pista opcional. Muestra la respuesta correcta tras 1-2 intentos, sin dramatizar.
- **Variedad:** un banco de mensajes para que no se repita siempre lo mismo (la repetición aburre a esta edad).
- **Persistencia:** ninguna.

### 6. Avatar / apodo (`profile`)
- Al primer uso, el niño elige un **avatar** de una galería y, opcionalmente, un **apodo de una lista cerrada** (no texto libre, ver D-2 y caso edge de privacidad).
- Da identidad y pertenencia sin recoger datos personales.
- **Persistencia:** `localStorage`: `profile.avatarId`, `profile.nicknameId`.

### 7. Meta diaria sugerida (`daily_goal`)
- "Tu misión de hoy": una sesión sugerida (mezcla de materias o tema del día) para reducir la decisión y reforzar el hábito.
- Al completarla, celebración especial y avance de racha.
- **Persistencia:** marca de si la misión de hoy está hecha (`dailyGoal.lastDoneDate`).

---

## Qué se persiste y qué se pierde

### Persiste en `localStorage`
| Clave (orientativa) | Contenido |
|---|---|
| `profile.avatarId`, `profile.nicknameId` | Identidad elegida |
| `stars.total` | Estrellas acumuladas históricas |
| `streak.current`, `streak.best`, `streak.lastCompletedDate` | Racha diaria |
| `badges.unlocked[]` | Medallas desbloqueadas |
| `dailyGoal.lastDoneDate` | Misión diaria completada |
| `prefs.lang`, `prefs.muted`, `prefs.reducedMotion` | Preferencias |
| `progress.byTopic` (opcional) | Aciertos por tema, para medallas y "ya lo dominas" |

### Se pierde al cerrar / no persiste
- El estado de una sesión a medias (qué ejercicio iba, respuestas parciales) — al volver, se empieza una sesión nueva. (Posible mejora futura: reanudar sesión; **fuera de MVP**.)
- Mensajes de feedback, animaciones, barra de progreso de la sesión.

> **Nota de Arquitecto:** el esquema exacto de claves y su namespacing los fija el Arquitecto. Se recomienda un único objeto JSON versionado (`tdp.state.v1`) con migración prevista, en lugar de muchas claves sueltas.

---

## Lo que NO se hace (anti-scope)
- Nada de notificaciones push (sin servidor, y son niños). El recordatorio del hábito es responsabilidad de la familia, no del producto.
- Nada de "vidas" que se agotan ni paywalls de energía (patrón de juego comercial; el producto es gratuito y educativo).
- Nada de comparación social ni ranking.
- Sin recompensas que generen ansiedad por pérdida (la racha se reinicia con tono positivo, no punitivo).

## Consideración de Responsabilidad Social (señalada)
- Evitar **dark patterns**: la racha debe motivar sin generar ansiedad ni dependencia en un niño de 8-9 años. El reinicio de racha debe ser amable. **Señalado para el agente de Responsabilidad Social** en su gate: validar que las mecánicas de hábito son sanas y no explotan compulsión infantil.
