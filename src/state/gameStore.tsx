/*
 * Estado global mínimo de gamificación y preferencias. Envuelve la capa de
 * persistencia (lib/storage) y expone acciones de alto nivel. Es el ÚNICO punto
 * que toca localStorage; los componentes consumen vía hook.
 *
 * Scope deliberadamente pequeño: sólo lo que debe sobrevivir entre pantallas y
 * sesiones. El estado efímero de una sesión vive en useSession, no aquí.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  loadState,
  saveState,
  isStorageAvailable,
  type PersistedState,
  type Language,
} from "@/lib/storage";
import { advanceStreak, localDateKey, type StreakOutcome } from "@/lib/streak";
import { newlyEarnedBadges } from "@/lib/badges";

export interface SessionConsolidation {
  starsEarned: number;
  correctByTopic: Record<string, number>;
  subjectTried: string;
  /** la sesión cuenta como la "misión del día" completada */
  isDailyGoal: boolean;
}

export interface ConsolidationResult {
  streakOutcome: StreakOutcome;
  streakDays: number;
  newBadgeIds: string[];
}

interface GameStore {
  state: PersistedState;
  storageAvailable: boolean;
  setLanguage: (lang: Language) => void;
  setSound: (on: boolean) => void;
  setReducedMotion: (on: boolean) => void;
  setProfile: (avatarId: string, nicknameId: string) => void;
  hasProfile: boolean;
  consolidateSession: (c: SessionConsolidation) => ConsolidationResult;
}

const GameContext = createContext<GameStore | null>(null);

/** Calcula el nuevo estado consolidado y el resultado, de forma pura. */
function applyConsolidation(
  prev: PersistedState,
  c: SessionConsolidation,
  today: string,
): { next: PersistedState; result: ConsolidationResult } {
  const streakResult = advanceStreak(prev.streak, today);

  const correctByTopic = { ...prev.progress.correctByTopic };
  for (const [topic, n] of Object.entries(c.correctByTopic)) {
    correctByTopic[topic] = (correctByTopic[topic] ?? 0) + n;
  }
  const subjectsTried = prev.progress.subjectsTried.includes(c.subjectTried)
    ? prev.progress.subjectsTried
    : [...prev.progress.subjectsTried, c.subjectTried];

  const withProgress: PersistedState = {
    ...prev,
    streak: streakResult.state,
    stars: { total: prev.stars.total + c.starsEarned },
    dailyGoal: {
      lastDoneDate: c.isDailyGoal ? today : prev.dailyGoal.lastDoneDate,
    },
    progress: { correctByTopic, subjectsTried },
  };

  const earned = newlyEarnedBadges(withProgress);
  const unlocked = { ...withProgress.badges.unlocked };
  for (const id of earned) unlocked[id] = today;

  return {
    next: { ...withProgress, badges: { unlocked } },
    result: {
      streakOutcome: streakResult.outcome,
      streakDays: streakResult.state.current,
      newBadgeIds: earned,
    },
  };
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(() => loadState());
  const storageAvailable = useRef(isStorageAvailable()).current;
  const stateRef = useRef(state);
  stateRef.current = state;

  // Persistencia: cada cambio del estado se guarda (degrada en silencio si no hay LS).
  useEffect(() => {
    saveState(state);
  }, [state]);

  const setLanguage = useCallback((language: Language) => {
    setState((s) => ({ ...s, preferences: { ...s.preferences, language } }));
  }, []);

  const setSound = useCallback((sound: boolean) => {
    setState((s) => ({ ...s, preferences: { ...s.preferences, sound } }));
  }, []);

  const setReducedMotion = useCallback((reducedMotion: boolean) => {
    setState((s) => ({ ...s, preferences: { ...s.preferences, reducedMotion } }));
  }, []);

  const setProfile = useCallback((avatarId: string, nicknameId: string) => {
    setState((s) => ({ ...s, profile: { avatarId, nicknameId } }));
  }, []);

  const consolidateSession = useCallback(
    (c: SessionConsolidation): ConsolidationResult => {
      const today = localDateKey();
      const { next, result } = applyConsolidation(stateRef.current, c, today);
      stateRef.current = next;
      setState(next);
      return result;
    },
    [],
  );

  const value = useMemo<GameStore>(
    () => ({
      state,
      storageAvailable,
      setLanguage,
      setSound,
      setReducedMotion,
      setProfile,
      hasProfile: state.profile.avatarId !== null,
      consolidateSession,
    }),
    [
      state,
      storageAvailable,
      setLanguage,
      setSound,
      setReducedMotion,
      setProfile,
      consolidateSession,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameStore(): GameStore {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameStore must be used within GameProvider");
  return ctx;
}
