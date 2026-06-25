/*
 * Cálculo de la racha diaria sin servidor (ADR-001 §4).
 * Se compara la fecha LOCAL de hoy ("YYYY-MM-DD") con lastPlayedDate:
 *   - iguales        → ya jugó hoy; la racha no cambia
 *   - diferencia 1d  → current += 1; actualizar longest
 *   - diferencia >1d → racha rota; current = 1
 *   - sin fecha      → primer uso; current = 1
 * Siempre que hubo actividad: lastPlayedDate = hoy.
 *
 * Se usa fecha local (no UTC): la noción de "hoy" del niño es la del dispositivo.
 * Módulo puro y testeable.
 */

export interface StreakState {
  current: number;
  longest: number;
  lastPlayedDate: string | null;
}

/** Devuelve la fecha local de `date` como "YYYY-MM-DD" (no UTC). */
export function localDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Diferencia en días de calendario entre dos claves "YYYY-MM-DD" (b - a). */
export function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = Date.UTC(ay, am - 1, ad);
  const db = Date.UTC(by, bm - 1, bd);
  return Math.round((db - da) / 86_400_000);
}

export type StreakOutcome = "first" | "same-day" | "incremented" | "reset";

export interface StreakResult {
  state: StreakState;
  outcome: StreakOutcome;
}

/**
 * Recalcula la racha al completar una sesión hoy.
 * `todayKey` se inyecta para poder testear sin depender del reloj.
 */
export function advanceStreak(
  prev: StreakState,
  todayKey: string = localDateKey(),
): StreakResult {
  const last = prev.lastPlayedDate;

  if (!last) {
    return {
      state: { current: 1, longest: Math.max(1, prev.longest), lastPlayedDate: todayKey },
      outcome: "first",
    };
  }

  const diff = dayDiff(last, todayKey);

  if (diff === 0) {
    return { state: { ...prev }, outcome: "same-day" };
  }

  if (diff === 1) {
    const current = prev.current + 1;
    return {
      state: {
        current,
        longest: Math.max(current, prev.longest),
        lastPlayedDate: todayKey,
      },
      outcome: "incremented",
    };
  }

  // diff > 1 (o fecha futura por reloj cambiado): la racha se reinicia a 1.
  return {
    state: { current: 1, longest: Math.max(1, prev.longest), lastPlayedDate: todayKey },
    outcome: "reset",
  };
}

/**
 * Determina, sin mutar nada, cómo debe verse la racha en HOME al cargar:
 * - "empty"  → nunca ha jugado
 * - "reset"  → jugó pero perdió la racha (último día > 1 atrás), mensaje amable
 * - "normal" → racha viva (jugó hoy o ayer)
 */
export function streakDisplayVariant(
  state: StreakState,
  todayKey: string = localDateKey(),
): "normal" | "empty" | "reset" {
  if (!state.lastPlayedDate || state.current === 0) return "empty";
  const diff = dayDiff(state.lastPlayedDate, todayKey);
  if (diff <= 1) return "normal";
  return "reset";
}
