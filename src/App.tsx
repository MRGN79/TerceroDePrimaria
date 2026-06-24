/*
 * App: router por estado local (sin react-router; las vistas son pocas y el
 * flujo es lineal). Compatible con hosting estático. Gobierna el gate de
 * onboarding, la navegación entre pantallas y la sincronización de preferencias
 * (idioma, movimiento reducido) con i18n y el DOM.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HomeScreen,
  SubjectSelectScreen,
  BackpackScreen,
} from "@/screens";
import { OnboardingScreen } from "@/screens/OnboardingScreen";
import { SettingsScreen } from "@/screens/SettingsScreen";
import { SessionContainer } from "@/screens/SessionContainer";
import { PrintConfigScreen } from "@/screens/PrintConfigScreen";
import { PrintSheetScreen } from "@/screens/PrintSheetScreen";
import { useGameStore } from "@/state/gameStore";
import type { Materia } from "@content/types";
import {
  buildSubjectVMs,
  buildTopicVMs,
  contentKeyFor,
  type SubjectVM,
} from "@/lib/catalog";
import { buildPrintSheet, type PrintItem } from "@/lib/printSheet";
import { localDateKey } from "@/lib/streak";
import { streakDisplayVariant } from "@/lib/streak";
import { nicknameKey } from "@/lib/profile";
import { BADGES } from "@/lib/badges";

type Route =
  | { name: "home" }
  | { name: "subjects" }
  | { name: "session"; materia: Materia; tema: string | null; isDailyGoal: boolean }
  | { name: "backpack" }
  | { name: "settings" }
  | { name: "print" }
  | { name: "printSheet"; materia: Materia; tema: string | null };

export function App() {
  const { t, i18n } = useTranslation(["common", "content", "backpack"]);
  const store = useGameStore();
  const { state } = store;

  const [route, setRoute] = useState<Route>({ name: "home" });
  // materia seleccionada en flujos de 2 niveles (subjects / print)
  const [selectedSubject, setSelectedSubject] = useState<Materia | null>(null);
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [printItems, setPrintItems] = useState<PrintItem[]>([]);

  // Sincroniza idioma elegido con i18n (si el usuario lo fijó explícitamente).
  useEffect(() => {
    if (state.preferences.language && i18n.language !== state.preferences.language) {
      void i18n.changeLanguage(state.preferences.language);
    }
  }, [state.preferences.language, i18n]);

  // Sincroniza el toggle de movimiento reducido con el DOM (lo lee base.css).
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = state.preferences.reducedMotion
      ? "true"
      : "false";
  }, [state.preferences.reducedMotion]);

  const goHome = useCallback(() => {
    setSelectedSubject(null);
    setRoute({ name: "home" });
  }, []);

  const subjectVMs = useMemo<SubjectVM[]>(() => buildSubjectVMs(t), [t, i18n.language]);

  const dailyGoalDoneToday = state.dailyGoal.lastDoneDate === localDateKey();
  const streakVariant = streakDisplayVariant(state.streak);
  const nickname = t(nicknameKey(state.profile.nicknameId));

  /* ------------------------------ onboarding ------------------------------ */
  if (!store.hasProfile) {
    return (
      <OnboardingScreen
        onComplete={(avatarId, nicknameId) => {
          store.setProfile(avatarId, nicknameId);
          setRoute({ name: "home" });
        }}
      />
    );
  }

  /* -------------------------------- routes -------------------------------- */

  if (route.name === "home") {
    return (
      <HomeScreen
        nickname={nickname}
        totalStars={state.stars.total}
        streakDays={state.streak.current}
        streakVariant={streakVariant}
        dailyGoalDone={dailyGoalDoneToday}
        onStartDailyGoal={() =>
          setRoute({ name: "session", materia: "matematicas", tema: null, isDailyGoal: true })
        }
        onChooseSubject={() => {
          setSelectedSubject(null);
          setRoute({ name: "subjects" });
        }}
        onPrint={() => {
          setSelectedSubject(null);
          setRoute({ name: "print" });
        }}
        onBackpack={() => setRoute({ name: "backpack" })}
        onSettings={() => setRoute({ name: "settings" })}
      />
    );
  }

  if (route.name === "subjects") {
    const topics = selectedSubject ? buildTopicVMs(selectedSubject, t) : null;
    const selectedTitle = selectedSubject
      ? t(`content:${contentKeyFor(selectedSubject)}.title`)
      : undefined;
    return (
      <SubjectSelectScreen
        subjects={subjectVMs.map((s) => ({
          id: s.id,
          titleKey: "",
          zoneKey: "",
          icon: s.icon as SubjectVM["icon"] extends infer T ? T extends string ? import("@/components").IconName : never : never,
          colorToken: s.colorToken,
          soon: s.soon,
        }))}
        topics={topics}
        selectedSubjectTitle={selectedTitle}
        onSelectSubject={(id) => setSelectedSubject(id as Materia)}
        onSelectTopic={(tema) =>
          selectedSubject &&
          setRoute({ name: "session", materia: selectedSubject, tema, isDailyGoal: false })
        }
        onBack={() => (selectedSubject ? setSelectedSubject(null) : goHome())}
        onHome={goHome}
      />
    );
  }

  if (route.name === "session") {
    return (
      <SessionContainer
        materia={route.materia}
        tema={route.tema}
        isDailyGoal={route.isDailyGoal}
        onExit={goHome}
        onHome={goHome}
        onPlayAgain={() => {
          setSelectedSubject(null);
          setRoute({ name: "subjects" });
        }}
      />
    );
  }

  if (route.name === "backpack") {
    const badgeVMs = BADGES.map((b) => {
      const unlockedOn = state.badges.unlocked[b.id];
      return {
        id: b.id,
        name: t(b.nameKey),
        locked: !unlockedOn,
        unlockedOn,
        colorToken: b.colorToken,
      };
    });
    return (
      <BackpackScreen
        nickname={nickname}
        totalStars={state.stars.total}
        currentStreak={state.streak.current}
        bestStreak={state.streak.longest}
        badges={badgeVMs}
        onHome={goHome}
      />
    );
  }

  if (route.name === "settings") {
    return (
      <SettingsScreen
        language={(state.preferences.language ?? (i18n.language as "en" | "es")) === "es" ? "es" : "en"}
        sound={state.preferences.sound}
        reducedMotion={state.preferences.reducedMotion}
        onLanguage={store.setLanguage}
        onSound={store.setSound}
        onReducedMotion={store.setReducedMotion}
        onHome={goHome}
        onBack={goHome}
      />
    );
  }

  if (route.name === "print") {
    const topics = selectedSubject ? buildTopicVMs(selectedSubject, t) : null;
    const selectedTitle = selectedSubject
      ? t(`content:${contentKeyFor(selectedSubject)}.title`)
      : undefined;
    return (
      <PrintConfigScreen
        subjects={subjectVMs}
        topics={topics}
        selectedSubjectTitle={selectedTitle}
        includeSolutions={includeSolutions}
        onSelectSubject={(id) => setSelectedSubject(id as Materia)}
        onSelectTopic={(tema) => {
          if (!selectedSubject) return;
          setPrintItems(buildPrintSheet(selectedSubject, tema));
          setRoute({ name: "printSheet", materia: selectedSubject, tema });
        }}
        onToggleSolutions={setIncludeSolutions}
        onCreate={() => {
          if (!selectedSubject) return;
          setPrintItems(buildPrintSheet(selectedSubject, null));
          setRoute({ name: "printSheet", materia: selectedSubject, tema: null });
        }}
        canCreate={selectedSubject !== null}
        onBack={() => (selectedSubject ? setSelectedSubject(null) : goHome())}
        onHome={goHome}
      />
    );
  }

  if (route.name === "printSheet") {
    const subjectTitle = t(`content:${contentKeyFor(route.materia)}.title`);
    const topicTitle = route.tema
      ? buildTopicVMs(route.materia, t).find((tp) => tp.id === route.tema)?.title ?? subjectTitle
      : t("content:label.surpriseMix");
    return (
      <PrintSheetScreen
        subjectTitle={subjectTitle}
        topicTitle={topicTitle}
        items={printItems}
        includeSolutions={includeSolutions}
        onBack={() => setRoute({ name: "print" })}
        onHome={goHome}
      />
    );
  }

  return null;
}
