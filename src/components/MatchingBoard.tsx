/*
 * MatchingBoard (§3.8) — componente CRÍTICO de accesibilidad.
 *
 * 🚨 CONDICIÓN DURA A11Y-KBD-02: el emparejado se hace por SELECCIÓN SECUENCIAL
 * clic-clic / toque-toque (seleccionar origen → seleccionar destino = empareja).
 * Cada elemento es un <button> enfocable real con nombre accesible. El estado de
 * selección se comunica por BORDE GRUESO + aria-pressed + ICONO, no solo color.
 * Un matching solo-drag está BLOQUEADO en el gate. Esta estructura NO usa arrastre.
 *
 * Presentacional: la LÓGICA de emparejamiento (qué está seleccionado, qué par se
 * forma, anuncio aria-live) la implementa Frontend. Aquí se entrega la estructura,
 * los estados visuales y los hooks de props para que Frontend conecte el estado.
 *
 * Frontend pasa, por columna, los items con su estado visual ya calculado:
 *   selected:  el item está actualmente seleccionado (origen pendiente de destino)
 *   matched:   ya emparejado (se muestra el conector / marca)
 *   pairLabel: índice/etiqueta del par para distinguir conectores SIN color (forma)
 */
import { Icon } from "./Icon";
import styles from "./MatchingBoard.module.css";

export type MatchItem = {
  id: string;
  label: string;
  selected?: boolean;
  matched?: boolean;
  /** etiqueta del par (número/forma) para distinguir sin color (A11Y-COLOR-04) */
  pairLabel?: string;
};

type MatchingBoardProps = {
  /** texto de instrucción (i18n: quiz.answer.matching.instruction) */
  instruction: string;
  left: MatchItem[];
  right: MatchItem[];
  /** Frontend conecta la selección de un item */
  onSelect?: (side: "left" | "right", id: string) => void;
};

function Column({
  side,
  items,
  onSelect,
}: {
  side: "left" | "right";
  items: MatchItem[];
  onSelect?: (side: "left" | "right", id: string) => void;
}) {
  return (
    <ul className={styles.column} role="list">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className={[
              styles.item,
              item.selected ? styles.selected : "",
              item.matched ? styles.matched : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={item.selected ?? false}
            onClick={() => onSelect?.(side, item.id)}
          >
            <span className={styles.itemLabel}>{item.label}</span>
            {item.matched ? (
              <span className={styles.pairBadge} aria-hidden="true">
                {item.pairLabel ?? <Icon name="check" size={20} />}
              </span>
            ) : null}
            {item.selected ? (
              <span className={styles.selectedMark} aria-hidden="true">
                <Icon name="chevron-right" size={20} />
              </span>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function MatchingBoard({
  instruction,
  left,
  right,
  onSelect,
}: MatchingBoardProps) {
  return (
    <div className={styles.root}>
      <p className={styles.instruction}>{instruction}</p>
      <div className={styles.board}>
        <Column side="left" items={left} onSelect={onSelect} />
        <Column side="right" items={right} onSelect={onSelect} />
      </div>
    </div>
  );
}
