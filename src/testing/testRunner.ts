import { Colors, Config } from "./types";

export const run = (config: Config) => {
  const { part1, part2 } = config;
  for (const [i, part] of [part1, part2].entries()) {
    console.log(Colors.FgYellow, "TESTING PART ", i + 1, Colors.Reset);
    if (part.tests.length === 0) {
      console.log(Colors.FgBlue, `   ❖ No tests`, Colors.Reset);
    }
    for (const test of part.tests) {
      const startTime = performance.now();
      const { input, expected } = test;
      const SUT = part.solution(input);
      if (SUT === expected) {
        console.log(Colors.FgCyan, `   ✓ Expected: ${expected}`, Colors.Reset);
      } else {
        console.log(
          Colors.FgRed,
          `   ❌ Expected: ${expected}. Got: ${SUT}`,
          Colors.Reset,
        );
      }
      const endTime = performance.now();
      const elapsed = endTime - startTime;
      console.log(
        Colors.FgMagenta,
        `         ⌛︎ Took ${elapsed} ms`,
        Colors.Reset,
      );
    }
  }
};
