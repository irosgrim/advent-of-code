import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const solve = (inpt: string, chunkSize = 4) => {
  // const chunkSize = 14;
  for (let i = 0; i < inpt.length; i++) {
    const chunk = new Set([...inpt.substring(i, i + chunkSize)]);
    const size = chunk.size;
    if (size === chunkSize) {
      return i + chunkSize;
    }
  }
};

const part1 = (inpt: string) => {
  const r = solve(inpt);
  return r;
};

const part2 = (inpt: string) => {
  const r = solve(inpt, 14);
  return r;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 7,
      },
      {
        input: input,
        expected: 1779,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
        expected: 19,
      },
      {
        input: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 23,
      },
      {
        input: input,
        expected: 2635,
      },
    ],
    solution: part2,
  },
});
