/*
 * Contexto y hook de acceso al estado de juego. Separado del proveedor (.tsx)
 * para que el módulo del componente sólo exporte componentes (Fast Refresh).
 */
import { createContext, useContext } from "react";
import type { PersistedState, Language } from "@/lib/storage";
import type {
  SessionConsolidation,
  ConsolidationResult,
} from "./consolidation";

export interface GameStore {
  state: PersistedState;
  storageAvailable: boolean;
  setLanguage: (lang: Language) => void;
  setSound: (on: boolean) => void;
  setReducedMotion: (on: boolean) => void;
  setProfile: (avatarId: string, nicknameId: string | null, nicknameCustom?: string | null) => void;
  clearData: () => void;
  hasProfile: boolean;
  consolidateSession: (c: SessionConsolidation) => ConsolidationResult;
  removeFailedExerciseIds: (ids: string[]) => void;
}

export const GameContext = createContext<GameStore | null>(null);

export function useGameStore(): GameStore {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameStore must be used within GameProvider");
  return ctx;
}
