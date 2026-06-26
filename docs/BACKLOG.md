# Backlog de producto

Items anotados para implementar en el futuro, ordenados por aparición. No implican prioridad; el orden lo decide el usuario.

---

## Contenido

- **Ampliar catálogo a 250 preguntas por asignatura (pendiente: Matemáticas, Inglés, Ciencias).** Lengua ya está a 256 ejercicios. Quedan las otras materias.

- **Nueva "asignatura": Introducción a 4º de Primaria.** Una materia especial que sirva de puente entre 3º y 4º, con ejercicios de los temas que se verán en 4º.

---

## Perfil y onboarding

- **Ampliar a 12 los personajes disponibles.** Actualmente hay 4 opciones en el onboarding. Diseñar y añadir 8 personajes más con sus avatares en los tamaños xs/sm/md/lg.

---

## Vista de impresión

- **Espacio para escribir las respuestas en la hoja impresa.** Cada ejercicio debe incluir una línea o recuadro en blanco donde el niño pueda escribir a mano. Actualmente el layout de impresión no reserva ese espacio.

- **Soluciones en página separada (tras salto de página).** El bloque de soluciones debe ir precedido de un `page-break-before` CSS para que quede en una hoja física independiente. Así los padres pueden imprimir, guardar la hoja de soluciones y entregar al niño solo la hoja de preguntas sin que las respuestas estén a la vista.

- **Dibujos para colorear en el espacio sobrante.** Si al maquetar la hoja impresa quedan zonas en blanco (al final de una página, entre secciones, etc.), rellenarlas con un dibujo sencillo y gracioso que el niño pueda colorear. Los dibujos deben ser líneas limpias (estilo libro de colorear), temáticos o neutros, y no interferir con el contenido del ejercicio.
