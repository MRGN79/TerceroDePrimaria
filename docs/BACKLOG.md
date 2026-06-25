# Backlog de producto

Items anotados para implementar en el futuro, ordenados por aparición. No implican prioridad; el orden lo decide el usuario.

---

## Diseño visual

- **Revisión general de estilos.** Pasar por todos los componentes y pantallas con ojo crítico, buscando coherencia, jerarquía y personalidad visual. Incluye revisar tipografía, espaciados, sombras y el sistema de colores.

- **Fondo texturizado personalizado por asignatura.** En lugar de un fondo liso, aplicar una textura sutil (papel, trama geométrica, etc.) que varíe según la materia activa. El tono de color base ya cambia por asignatura; la textura añadiría una capa de identidad visual sin sobrecargar.

---

## Experiencia de sesión

- **Botón "Siguiente" como temporizador automático.** Tras resolver una pregunta (acierto o revelación de solución), el botón "Siguiente" avanza automáticamente pasado un tiempo razonable (~3-4 s en acierto, ~5-6 s tras revelar). El temporizador se visualiza como una barra de progreso o un anillo que se vacía sobre el propio botón. El niño puede pulsar antes de que expire. Movimiento reducido: auto-avance sin animación del temporizador.

---

## Contenido

- **Ampliar catálogo a 250 preguntas por asignatura.** Actualmente hay ~10–20 ejercicios por materia. Hay que redactar y añadir contenido hasta llegar a 250 estáticos + los generados de mates. Trabajo de contenido, no de ingeniería.

- **Nueva "asignatura": Introducción a 4º de Primaria.** Una materia especial que sirva de puente entre 3º y 4º, con ejercicios de los temas que se verán en 4º.

---

## Gamificación

- **Ampliar el catálogo de badges.** Muchas medallas, variadas y frecuentes. El objetivo es que prácticamente cualquier logro (5 aciertos seguidos, primera semana de racha, primera vez en una materia, completar 10 preguntas de inglés, etc.) otorgue un premio. Hace falta revisar el catálogo completo y duplicar o triplicar el número de medallas.

---

## Perfil y onboarding

- **Cambiar el personaje y el apodo fácilmente desde el perfil (mochila o ajustes).** Actualmente el onboarding no es re-accesible sin borrar datos.

- **Apodo de texto libre.** Además de los apodos predefinidos, permitir que el niño escriba su nombre propio. Validar longitud (≤20 caracteres) y filtrar contenido inapropiado básico.

- **Ampliar a 12 los personajes disponibles.** Actualmente hay 4 opciones en el onboarding. Diseñar y añadir 8 personajes más con sus avatares en los tamaños xs/sm/md/lg.

---

## Pie de página

- **Opción para eliminar los datos guardados.** Botón discreto en el pie de página (o en Ajustes). Flujo de doble confirmación: primer clic → modal explicando que se borrarán estrellas, racha, medallas y progreso y que la acción no tiene vuelta atrás → segundo clic para confirmar → localStorage limpio → volver al onboarding.

- **Aviso de privacidad en el pie de página.** Texto breve: "Esta aplicación no envía ningún dato a ningún servidor. Todo se guarda únicamente en este dispositivo." Con enlace o tooltip si se quiere más detalle.
