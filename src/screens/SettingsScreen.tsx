/*
 * AJUSTES — idioma y sonido (flujos §8). Cambios al momento y persistidos.
 * El contenido de Lengua/Inglés/Natural Science no se traduce (D-1, D-5).
 */
import { useTranslation } from "react-i18next";
import { PageLayout, AppHeader, ToggleSwitch, Button, Icon } from "@/components";
import type { Language } from "@/lib/storage";
import styles from "./SettingsScreen.module.css";

type SettingsScreenProps = {
  language: Language;
  sound: boolean;
  reducedMotion: boolean;
  onLanguage: (lang: Language) => void;
  onSound: (on: boolean) => void;
  onReducedMotion: (on: boolean) => void;
  onHome: () => void;
  onBack: () => void;
};

export function SettingsScreen({
  language,
  sound,
  reducedMotion,
  onLanguage,
  onSound,
  onReducedMotion,
  onHome,
  onBack,
}: SettingsScreenProps) {
  const { t } = useTranslation("settings");

  return (
    <PageLayout
      width="narrow"
      header={<AppHeader title={t("title")} onBack={onBack} onHome={onHome} />}
    >
      <div className={styles.root}>
        <fieldset className={styles.group}>
          <legend className={styles.legend}>{t("language.label")}</legend>
          <div className={styles.langRow} role="radiogroup" aria-label={t("language.label")}>
            <Button
              variant={language === "es" ? "primary" : "secondary"}
              size="lg"
              onClick={() => onLanguage("es")}
              aria-pressed={language === "es"}
            >
              {language === "es" ? <Icon name="check" size={22} aria-hidden="true" /> : null}
              {t("language.es")}
            </Button>
            <Button
              variant={language === "en" ? "primary" : "secondary"}
              size="lg"
              onClick={() => onLanguage("en")}
              aria-pressed={language === "en"}
            >
              {language === "en" ? <Icon name="check" size={22} aria-hidden="true" /> : null}
              {t("language.en")}
            </Button>
          </div>
        </fieldset>

        <ToggleSwitch
          checked={sound}
          label={t("sound.label")}
          stateLabel={sound ? t("sound.on") : t("sound.off")}
          onToggle={() => onSound(!sound)}
        />

        <ToggleSwitch
          checked={reducedMotion}
          label={t("reducedMotion.label")}
          stateLabel={reducedMotion ? t("reducedMotion.on") : t("reducedMotion.off")}
          onToggle={() => onReducedMotion(!reducedMotion)}
        />
      </div>
    </PageLayout>
  );
}
