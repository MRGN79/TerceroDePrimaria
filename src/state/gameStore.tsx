/*
 * Proveedor de estado global de gamificación y preferencias. Envuelve la capa de
 * persistencia (lib/storage) y expone acciones de alto nivel. Es el ÚNICO punto
 * que toca localStorage; los componentes consumen vía useGameStore (gameContext).
 *
 * Scope deliberadamente pequeño: sólo lo que debe sobrevivir entre pantallas y
 * sesiones. El estado efímero de una sesión vive en useSession, no aquí.
 */
import {
  useCallback,
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
  defaultState,
  type PersistedState,
  type Language,
} from "@/lib/storage";
import { localDateKey } from "@/lib/streak";
import { applyConsolidation, type SessionConsolidation } from "./consolidation";
import { GameContext, type GameStore } from "./gameContext";

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

  const setProfile = useCallback(
    (avatarId: string, nicknameId: string | null, nicknameCustom: string | null = null) => {
      setState((s) => ({ ...s, profile: { avatarId, nicknameId, nicknameCustom } }));
    },
    [],
  );

  const clearData = useCallback(() => {
    const fresh = defaultState();
    stateRef.current = fresh;
    setState(fresh);
  }, []);

  const consolidateSession = useCallback<GameStore["consolidateSession"]>(
    (c: SessionConsolidation) => {
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
      clearData,
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
      clearData,
      consolidateSession,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
