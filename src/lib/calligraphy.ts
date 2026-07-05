import { shuffle } from "./session";

const JOKE_KEYS = Array.from({ length: 15 }, (_, i) => `calligraphy:joke.${i + 1}`);

export function pickCalligraphyJokes(count: number, rng: () => number): string[] {
  const shuffled = shuffle(JOKE_KEYS, rng);
  return shuffled.slice(0, Math.min(count, JOKE_KEYS.length));
}
