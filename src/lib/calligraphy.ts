const JOKE_KEYS = Array.from({ length: 15 }, (_, i) => `calligraphy:joke.${i + 1}`);

export function pickCalligraphyJokes(count: number, rng: () => number): string[] {
  const shuffled = [...JOKE_KEYS].sort(() => rng() - 0.5);
  return shuffled.slice(0, Math.min(count, JOKE_KEYS.length));
}
