# Catálogo de materias y temas — 3º de primaria (LOMLOE)

> Estructura de contenido. Define la taxonomía sobre la que se construyen los ejercicios.
> Alineado al currículo LOMLOE de Educación Primaria (RD 157/2022) y al desarrollo de la Comunidad de Madrid para 3º.
> Cada tema lleva un identificador estable para usarse como clave de datos y de i18n.

## Modelo de datos del catálogo (taxonomía)

```
Materia (subject)
  └── Bloque (block)        ← agrupación curricular
        └── Tema (topic)    ← unidad seleccionable por el niño
              └── Ejercicios (items)  ← contenido concreto (producción posterior)
```

- `subject.id`, `block.id`, `topic.id` son estables y sirven de clave i18n: ej. `content.math.numbers.title`.
- Cada `topic` declara: nivel (`grade3` | `grade4_preview`), tipos de ejercicio compatibles, y si tiene versión imprimible.

---

## A. Matemáticas (`math`)

### Bloque: Números y numeración (`numbers`)
- `numbers.read_write` — Lectura y escritura de números hasta 4-5 cifras (decenas y centenas de millar introductorias).
- `numbers.place_value` — Valor posicional: unidades, decenas, centenas, unidades de millar.
- `numbers.compare_order` — Comparar y ordenar números (>, <, =), ordenar series.
- `numbers.rounding` — Redondeo a la decena y a la centena más próxima.
- `numbers.even_odd` — Números pares e impares.
- `numbers.ordinals` — Números ordinales (1.º a 30.º aprox.).

### Bloque: Operaciones (`operations`)
- `operations.add_carry` — Sumas con llevadas (hasta 3-4 cifras).
- `operations.sub_borrow` — Restas con llevadas.
- `operations.times_tables` — Tablas de multiplicar (del 1 al 10).
- `operations.multiply` — Multiplicación por una cifra; introducción a dos cifras.
- `operations.division_intro` — División exacta y con resto: concepto de reparto, división por una cifra.
- `operations.mental_math` — Cálculo mental (estrategias: dobles, mitades, sumar 9/11).
- `operations.estimation` — Estimación de resultados.

### Bloque: Resolución de problemas (`problems`)
- `problems.one_step` — Problemas de un paso (suma/resta/multiplicación/división).
- `problems.two_step` — Problemas de dos pasos.
- `problems.money` — Problemas con dinero (euros y céntimos).

### Bloque: Medida (`measurement`)
- `measurement.length` — Longitud: m, cm, km (introducción).
- `measurement.mass` — Masa: kg, g.
- `measurement.capacity` — Capacidad: l, ml.
- `measurement.time` — Tiempo: leer el reloj (en punto, y media, cuartos), horas/minutos, calendario.
- `measurement.money_coins` — Monedas y billetes de euro, equivalencias.

### Bloque: Geometría (`geometry`)
- `geometry.lines` — Tipos de líneas (recta, curva, poligonal) y posiciones (paralelas, perpendiculares — introducción).
- `geometry.plane_shapes` — Figuras planas: triángulo, cuadrado, rectángulo, círculo; lados y vértices.
- `geometry.polygons` — Polígonos y sus elementos.
- `geometry.3d_intro` — Cuerpos geométricos básicos (cubo, esfera, prisma) — introducción.
- `geometry.symmetry` — Simetría sencilla.

### Bloque: Datos y azar (`data`)
- `data.pictograms` — Lectura de pictogramas y tablas sencillas.
- `data.bar_charts` — Gráficos de barras simples.

---

## B. Lengua Castellana (`spanish`)

> Contenido específico del idioma castellano; **no se traduce** (D-1).

### Bloque: Vocabulario (`vocabulary`)
- `vocabulary.synonyms_antonyms` — Sinónimos y antónimos.
- `vocabulary.word_families` — Familias de palabras.
- `vocabulary.augmentatives_diminutives` — Aumentativos y diminutivos.
- `vocabulary.polysemy` — Palabras polisémicas (introducción).

### Bloque: Ortografía (`spelling`)
- `spelling.syllables` — Sílabas, separación, sílaba tónica.
- `spelling.ca_que_qui_co_cu` — Uso de c/qu, g/gu/gü.
- `spelling.r_rr` — Sonido fuerte y suave de la r / rr.
- `spelling.mp_mb` — Reglas mp / mb.
- `spelling.za_ce_ci_zo_zu` — z/c ante vocal.
- `spelling.capital_letters` — Mayúsculas: inicio, nombres propios, después de punto.
- `spelling.accent_intro` — Acentuación: tilde y palabras agudas/llanas/esdrújulas (introducción).

### Bloque: Gramática (`grammar`)
- `grammar.noun` — El sustantivo: común/propio, género y número.
- `grammar.adjective` — El adjetivo: concordancia.
- `grammar.article` — Determinantes/artículos.
- `grammar.verb_intro` — El verbo: pasado, presente, futuro (introducción).
- `grammar.sentence` — La oración: sujeto y predicado (introducción).

### Bloque: Comprensión y expresión (`reading_writing`)
- `reading_writing.comprehension` — Comprensión lectora de textos cortos.
- `reading_writing.sentence_order` — Ordenar palabras para formar oraciones / ordenar frases en un texto.
- `reading_writing.alphabetical` — Orden alfabético y uso del diccionario (introducción).
- `reading_writing.text_types` — Distinguir tipos de texto (cuento, noticia, receta) — introducción.

---

## C. Ciencias Naturales (`science`)

### Bloque: El cuerpo humano (`human_body`)
- `human_body.systems` — Aparatos: digestivo, respiratorio, circulatorio (introducción).
- `human_body.senses` — Los sentidos.
- `human_body.health_habits` — Hábitos saludables: alimentación, higiene, ejercicio.

### Bloque: Seres vivos (`living_things`)
- `living_things.animals` — Clasificación de animales (vertebrados/invertebrados; mamíferos, aves, etc.).
- `living_things.plants` — Las plantas: partes, fotosíntesis (introducción), tipos.
- `living_things.classification` — Seres vivos vs. inertes; criterios de clasificación.

### Bloque: Materia y energía (`matter_energy`)
- `matter_energy.states` — Estados del agua y de la materia (sólido, líquido, gas).
- `matter_energy.materials` — Materiales y sus propiedades.
- `matter_energy.forces_machines` — Fuerzas y máquinas simples (introducción).

### Bloque: Tecnología y entorno (`environment`)
- `environment.recycling` — Reciclaje, residuos, cuidado del entorno.
- `environment.energy_sources` — Fuentes de energía (introducción).

---

## D. Ciencias Sociales (`social`)

### Bloque: El universo y la Tierra (`earth_universe`)
- `earth_universe.universe` — El universo, el Sistema Solar, planetas.
- `earth_universe.earth_movements` — Movimientos de la Tierra: día/noche, estaciones.
- `earth_universe.water` — El agua: ciclo del agua, mares y ríos.
- `earth_universe.weather` — El tiempo atmosférico y el clima (introducción).

### Bloque: El paisaje (`landscape`)
- `landscape.relief` — Formas del relieve (montaña, valle, llanura, costa).
- `landscape.maps` — Planos y mapas, puntos cardinales.

### Bloque: La sociedad (`society`)
- `society.local_government` — Localidad, municipio, ayuntamiento (introducción).
- `society.jobs` — Trabajos y sectores (primario/secundario/terciario — introducción).
- `society.coexistence` — Convivencia, normas, servicios públicos.

### Bloque: El tiempo histórico (`history`)
- `history.time_measure` — Medida del tiempo histórico: pasado/presente, generaciones, siglos (introducción).
- `history.history_intro` — Fuentes históricas y cambios a lo largo del tiempo.

---

## E. Inglés (`english`)

> Asignatura de lengua extranjera. Su contenido **es** en inglés por naturaleza; encaja con el estándar i18n de forma especial (el "idioma de la materia" no cambia con el selector de UI).

### Bloque: Vocabulario (`en_vocabulary`)
- `en_vocabulary.numbers` — Numbers 1-100.
- `en_vocabulary.colors_shapes` — Colors and shapes.
- `en_vocabulary.family` — Family members.
- `en_vocabulary.animals` — Animals.
- `en_vocabulary.food` — Food and drinks.
- `en_vocabulary.body` — Parts of the body.
- `en_vocabulary.classroom` — Classroom objects.
- `en_vocabulary.clothes` — Clothes.

### Bloque: Lenguaje básico (`en_basics`)
- `en_basics.greetings` — Greetings and introductions.
- `en_basics.verb_to_be` — Verb "to be".
- `en_basics.have_got` — "Have got".
- `en_basics.this_that` — This/that, these/those.
- `en_basics.prepositions` — Prepositions of place (in, on, under).

---

## F. Conceptos de 4º como reto (`grade4_preview`)

Marcados visualmente como **"Reto de 4º"** (etiqueta festiva, ej. cohete/estrella dorada). Opcionales, nunca obligatorios para avanzar.

| Materia | Tema de adelanto | id |
|---|---|---|
| Matemáticas | Multiplicación por dos cifras | `math.operations.multiply_two_digits_g4` |
| Matemáticas | División por una cifra con resto (formalizada) | `math.operations.long_division_g4` |
| Matemáticas | Fracciones: concepto, mitad/tercio/cuarto | `math.fractions.intro_g4` |
| Matemáticas | Números decimales (introducción con dinero) | `math.numbers.decimals_g4` |
| Matemáticas | Perímetro de figuras | `math.geometry.perimeter_g4` |
| Lengua | Acentuación: reglas agudas/llanas/esdrújulas | `spanish.spelling.accent_rules_g4` |
| Lengua | El verbo: conjugación regular (presente) | `spanish.grammar.verb_conjugation_g4` |
| Ciencias Nat. | La célula (introducción) | `science.living_things.cells_g4` |
| Ciencias Soc. | Comunidades Autónomas de España | `social.society.autonomous_communities_g4` |
| Inglés | Present simple (afirmativa) | `english.en_basics.present_simple_g4` |

---

## Nota de producción de contenido

Esta taxonomía define **qué** materias y temas existen. La **redacción de los ejercicios concretos** (enunciados, opciones, soluciones) es producción de contenido posterior, que debe:
- Ser original o de fuente con licencia compatible (ver dependencia legal en `00-vision-y-alcance.md`).
- Cargarse como datos estáticos (JSON) — formato exacto a definir por Arquitecto.
- Etiquetar cada ejercicio con: `subject`, `block`, `topic`, `grade`, `exerciseType`, `printable` (bool), `difficulty` (1-3).
