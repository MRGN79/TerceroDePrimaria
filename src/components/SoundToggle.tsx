/*
 * SoundToggle (§A11Y-SOUND-02). Control de mute visible, ≥60×60px, icono
 * inequívoco (altavoz / altavoz tachado) + estado textual. Persistente
 * (Frontend lo guarda en localStorage). Estado por icono + texto, no solo visual.
 */
import { useTranslation } from "react-i18next";
import { Icon } from "./Icon";
import styles from "./SoundToggle.module.css";

type SoundToggleProps = {
  muted: boolean;
  onToggle?: () => void;
};

export function SoundToggle({ muted, onToggle }: SoundToggleProps) {
  const { t } = useTranslation("settings");
  const stateLabel = muted ? t("sound.off") : t("sound.on");

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={onToggle}
      aria-pressed={!muted}
      aria-label={stateLabel}
    >
      <Icon name={muted ? "sound-off" : "sound-on"} size={28} aria-hidden="true" />
      <span className={styles.label}>{stateLabel}</span>
    </button>
  );
}
