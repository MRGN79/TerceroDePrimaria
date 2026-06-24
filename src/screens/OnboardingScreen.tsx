/*
 * ONBOARDING — elegir avatar y apodo (flujos §1). Solo en el primer arranque.
 * Lista CERRADA (D-2), nunca texto libre. Saltable: el default deja jugar igual.
 * Selección por toque/teclado; estado por borde + ✓, no solo color.
 */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageLayout, Button, Mascot, Icon } from "@/components";
import { AVATARS, NICKNAMES, DEFAULT_AVATAR, DEFAULT_NICKNAME } from "@/lib/profile";
import styles from "./OnboardingScreen.module.css";

type OnboardingScreenProps = {
  onComplete: (avatarId: string, nicknameId: string) => void;
};

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { t } = useTranslation(["onboarding", "content", "common"]);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);

  const finish = (skip: boolean) => {
    if (skip) {
      onComplete(DEFAULT_AVATAR, DEFAULT_NICKNAME);
    } else {
      onComplete(avatar ?? DEFAULT_AVATAR, nickname ?? DEFAULT_NICKNAME);
    }
  };

  return (
    <PageLayout width="wide">
      <div className={styles.root}>
        <Mascot expression="happy" size="md" />

        <section aria-labelledby="ob-avatar" className={styles.step}>
          <h2 id="ob-avatar" className={styles.heading}>
            {t("onboarding:avatar.heading")}
          </h2>
          <ul className={styles.grid} role="list">
            {AVATARS.map((a) => {
              const selected = avatar === a.id;
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    className={[styles.choice, selected ? styles.selected : ""]
                      .filter(Boolean)
                      .join(" ")}
                    aria-pressed={selected}
                    onClick={() => setAvatar(a.id)}
                  >
                    <span className={styles.emoji} aria-hidden="true">
                      {a.emoji}
                    </span>
                    <span className={styles.choiceName}>{t(a.nameKey)}</span>
                    {selected ? (
                      <span className={styles.tick} aria-hidden="true">
                        <Icon name="check" size={20} />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="ob-nick" className={styles.step}>
          <h2 id="ob-nick" className={styles.heading}>
            {t("onboarding:nickname.heading")}
          </h2>
          <ul className={styles.chips} role="list">
            {NICKNAMES.map((n) => {
              const selected = nickname === n.id;
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    className={[styles.chip, selected ? styles.selected : ""]
                      .filter(Boolean)
                      .join(" ")}
                    aria-pressed={selected}
                    onClick={() => setNickname(n.id)}
                  >
                    {selected ? (
                      <Icon name="check" size={18} aria-hidden="true" />
                    ) : null}
                    {t(n.labelKey)}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" onClick={() => finish(false)}>
            {t("onboarding:continue")}
          </Button>
          <Button variant="ghost" size="lg" onClick={() => finish(true)}>
            {t("onboarding:skip")}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
