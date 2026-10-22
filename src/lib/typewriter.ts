export interface TypewriterState {
  word: number;
  chars: number;
  deleting: boolean;
}

export function typewriterStep(
  state: TypewriterState,
  words: readonly string[],
): TypewriterState & { pauseMs: number } {
  const { word, chars, deleting } = state;
  if (!deleting) {
    if (chars >= words[word].length) return { word, chars, deleting: true, pauseMs: 1600 };
    return { word, chars: chars + 1, deleting: false, pauseMs: 70 };
  }
  if (chars <= 0) return { word: (word + 1) % words.length, chars: 0, deleting: false, pauseMs: 300 };
  return { word, chars: chars - 1, deleting: true, pauseMs: 35 };
}
