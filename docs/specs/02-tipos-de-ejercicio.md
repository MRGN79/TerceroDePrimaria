# Tipos de ejercicio

> Catálogo de mecánicas de ejercicio para niños de 8-9 años.
> Cada tipo declara: cómo funciona, materias donde encaja, viabilidad imprimible y notas de accesibilidad.

## Principios para 8-9 años

- **Una instrucción, una acción.** Enunciados de una frase corta. Vocabulario simple.
- **Sin penalización dura.** Un fallo no "castiga"; ofrece reintento o pista. La diversión está por encima de la nota.
- **Feedback inmediato y celebratorio** en cada respuesta (ver gamificación).
- **Sin tiempo bajo presión por defecto.** Puede haber un modo "contrarreloj" opcional y festivo, nunca el modo principal.
- **Objetivos táctiles grandes** (≥ 44x44 px) y mucho espacio: manos pequeñas, posible uso en tablet.

---

## 1. Opción múltiple (`multiple_choice`)
- **Cómo funciona:** enunciado + 3-4 opciones; el niño toca/clica la correcta. 1 respuesta correcta.
- **Encaja en:** todas las materias.
- **Imprimible:** Sí (rodear/marcar la opción correcta).
- **A11y:** opciones como `radio` accesibles; navegable por teclado (flechas + Enter); no depender solo del color para marcar correcto/incorrecto (icono + texto).

## 2. Verdadero / Falso (`true_false`)
- **Cómo funciona:** afirmación + dos botones grandes (Verdadero/Falso), idealmente con icono (pulgar arriba/abajo).
- **Encaja en:** Ciencias, Sociales, Lengua (reglas), Mates (afirmaciones).
- **Imprimible:** Sí (marcar V o F).
- **A11y:** botones con etiqueta textual, no solo icono.

## 3. Completar huecos (`fill_blank`)
- **Cómo funciona:** frase con un hueco; el niño escribe o elige de un banco de palabras. Para 8-9 años se prefiere **banco de palabras** (tocar) frente a teclear, para reducir fricción y errores ortográficos accidentales.
- **Encaja en:** Lengua (ortografía, gramática), Inglés, Ciencias (vocabulario).
- **Imprimible:** Sí (escribir en el hueco).
- **A11y:** si hay escritura, input con label claro; si es banco de palabras, opciones accesibles por teclado.

## 4. Respuesta numérica (`numeric_answer`)
- **Cómo funciona:** operación o problema; el niño introduce el número con un **teclado numérico en pantalla** (grande, festivo) o teclea.
- **Encaja en:** Matemáticas (operaciones, problemas, medida).
- **Imprimible:** Sí (escribir el resultado).
- **A11y:** teclado en pantalla navegable por teclado físico también; admite borrar; validación clara.

## 5. Relacionar / emparejar (`matching`)
- **Cómo funciona:** dos columnas; unir cada elemento de la izquierda con su pareja de la derecha (tocar A luego B, o trazar línea).
- **Encaja en:** Lengua (sinónimos, sustantivo/género), Inglés (palabra-imagen), Ciencias (concepto-definición), Mates (operación-resultado).
- **Imprimible:** Sí (trazar líneas con lápiz).
- **A11y:** modo de emparejado por selección secuencial (no solo arrastre); foco visible; cada par anunciable.

## 6. Ordenar / secuenciar (`ordering`)
- **Cómo funciona:** elementos desordenados que el niño coloca en orden correcto (números de menor a mayor, palabras para formar una frase, pasos de un proceso, orden alfabético).
- **Encaja en:** Mates (ordenar números), Lengua (ordenar frase, orden alfabético), Ciencias (ciclo del agua, fases).
- **Imprimible:** Sí (numerar 1-2-3 o reescribir en orden).
- **A11y:** además de arrastrar, permitir mover con botones "subir/bajar" accesibles por teclado.

## 7. Arrastrar y soltar / clasificar (`drag_drop`)
- **Cómo funciona:** arrastrar elementos a cubos/categorías (clasificar animales vertebrados/invertebrados, par/impar, sólido/líquido/gas).
- **Encaja en:** Ciencias, Sociales, Mates (clasificación), Lengua (familias de palabras).
- **Imprimible:** Parcial — se convierte en "une con flechas a la caja correcta" o "escribe en qué grupo va". Marcar `printable: true` con variante adaptada.
- **A11y:** **siempre** ofrecer alternativa sin arrastre (seleccionar elemento + seleccionar destino con teclado/toque). El arrastre puro no es accesible por sí solo.

## 8. Selección sobre imagen / hotspot (`image_hotspot`)
- **Cómo funciona:** una imagen (un reloj, un mapa, una figura geométrica, el cuerpo humano) con zonas tocables; el niño toca la zona correcta ("toca la hora y media", "toca el corazón", "toca el vértice").
- **Encaja en:** Mates (reloj, geometría), Ciencias (cuerpo, plantas), Sociales (mapa, cardinales).
- **Imprimible:** Sí (rodear/señalar en la imagen impresa).
- **A11y:** zonas con etiqueta textual; navegables por teclado; texto alternativo de la imagen.

## 9. Colorear / dibujar guiado (`coloring`)
- **Cómo funciona:** principalmente **imprimible**; colorear según consigna ("colorea de rojo los números pares"), simetría, completar dibujo. En pantalla, versión simplificada de pintar zonas con paleta.
- **Encaja en:** Mates (pares/impares, simetría), Plástica transversal, motivación festiva.
- **Imprimible:** Sí (ideal en papel).
- **A11y:** en pantalla, la actividad de colorear es complementaria, nunca bloqueante para progresar; consigna en texto.

---

## Resumen de viabilidad imprimible

| Tipo | Online | Imprimible | Notas |
|---|---|---|---|
| `multiple_choice` | ✅ | ✅ | Rodear opción |
| `true_false` | ✅ | ✅ | Marcar V/F |
| `fill_blank` | ✅ | ✅ | Escribir / banco |
| `numeric_answer` | ✅ | ✅ | Escribir resultado |
| `matching` | ✅ | ✅ | Trazar líneas |
| `ordering` | ✅ | ✅ | Numerar |
| `drag_drop` | ✅ | ⚠️ adaptado | Variante "flechas a la caja" |
| `image_hotspot` | ✅ | ✅ | Señalar en imagen |
| `coloring` | ⚠️ simplificado | ✅ ideal | Mejor en papel |

## Prioridad para MVP

**Imprescindibles MVP (4 tipos):** `multiple_choice`, `true_false`, `numeric_answer`, `matching`. Cubren todas las materias y son los más sencillos de implementar bien y de imprimir.

**Segunda ola:** `fill_blank` (banco de palabras), `ordering`.

**Tercera ola:** `drag_drop`, `image_hotspot`, `coloring`.
