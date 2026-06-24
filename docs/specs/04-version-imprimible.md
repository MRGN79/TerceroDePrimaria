# Versión imprimible

> Cómo se genera y estructura la ficha de papel. Pensada para que una familia imprima sin fricción.

## Objetivo

Permitir hacer ejercicios **sin pantalla**: el niño (con ayuda de un adulto para imprimir) elige materia y tema, genera una **ficha A4** lista para imprimir, la hace a lápiz y se autocorrige con la **hoja de soluciones**.

> Aunque el producto declara "no hay adulto en escena" en la experiencia online, la **acción de imprimir** la realiza típicamente un adulto. Esto no añade un panel de adultos: es un flujo de generación que cualquiera puede usar. La interfaz sigue siendo para el niño.

## Flujo

```
1. El niño/familia entra en la sección "Para imprimir" (Print zone).
2. Elige MATERIA (Mates, Lengua, Ciencias Nat., Ciencias Soc., Inglés).
3. Elige TEMA dentro de la materia (o "Mezcla sorpresa" del tema/materia).
4. (Opcional) Elige cuántos ejercicios: pocos (5) / normal (10) / muchos (15).
5. (Opcional) Elige dificultad: fácil / normal / con retos de 4º.
6. Pulsa "Crear ficha".
7. Se muestra una vista previa de la ficha A4 lista para imprimir.
8. Pulsa "Imprimir" → diálogo de impresión del navegador.
9. La ficha incluye, al final o en página aparte, la HOJA DE SOLUCIONES.
```

## Estructura de la ficha (A4 vertical)

**Cabecera festiva:**
- Título del producto + ilustración veraniega/festiva ligera (no debe gastar mucha tinta — ver sostenibilidad).
- Línea para "Mi nombre: ____" y "Fecha: ____" (escritura a mano, no se guarda nada).
- Materia y tema de la ficha.

**Cuerpo:**
- Ejercicios numerados, espaciados, con espacio claro para escribir/operar.
- Instrucciones cortas por ejercicio.
- Tipos de ejercicio adaptados a papel (ver `02-tipos-de-ejercicio.md`: opción múltiple para rodear, completar, unir con flechas, operaciones, etc.).

**Pie:**
- Mensaje festivo de ánimo ("¡Tú puedes! 🌞").

**Hoja de soluciones (página separada):**
- Mismo número de ejercicio con la respuesta correcta.
- Pensada para que la familia o el propio niño se autocorrija.
- Se imprime al final; opción de **"incluir soluciones" on/off** por si el adulto quiere darlas aparte.

## Decisiones técnicas (a confirmar por Arquitecto)

- **Generación:** se recomienda **CSS `@media print`** sobre HTML renderizado (sin necesidad de librería PDF). El navegador hace "Imprimir / Guardar como PDF". Más simple, sin dependencias, accesible.
- Alternativa (fuera de MVP): generación de PDF cliente con librería — solo si CSS print resulta insuficiente. Requiere revisión de licencia por el Abogado.
- **Saltos de página** controlados (`break-inside: avoid` en cada ejercicio; soluciones en `break-before: page`).
- **Sin color de fondo** ni grandes manchas de tinta por defecto (sostenibilidad e impresión doméstica B/N). Modo "ahorro de tinta" como opción.
- El contenido de los ejercicios impresos sale del **mismo banco de datos** que la versión online (un solo origen de verdad de contenido).

## Alcance imprimible MVP

- **MVP:** generar ficha de **un tema** elegido, con N ejercicios fijos (10), tipos imprimibles del MVP, con hoja de soluciones, vía CSS print.
- **Después:** "Mezcla sorpresa", elección de cantidad/dificultad, modo ahorro de tinta, fichas temáticas de verano.

## Accesibilidad e inclusión de la ficha

- Tipografía grande y clara (apta para 8-9 años; considerar fuente legible tipo escolar).
- Suficiente espacio en blanco para escribir.
- Buen contraste en impresión B/N.
- No depender del color para entender un ejercicio (quien imprima en B/N debe poder hacerlo todo).

## Sostenibilidad (señalada para Responsabilidad Social)
- Diseño que minimice consumo de tinta (sin fondos pesados, ilustraciones de línea).
- Aprovechar el A4 sin desperdiciar páginas.
