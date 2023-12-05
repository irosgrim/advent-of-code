import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const solve = (inpt: string, top = 1) => {
  const arr = inpt.split("\n\n").map((x) => x.split("\n").map(Number));
  const elfs = [];

  for (let i = 0; i < arr.length; i++) {
    const currentElf = arr[i];
    let caloriesForElf = 0;
    for (let food = 0; food < currentElf.length; food++) {
      caloriesForElf += currentElf[food];
    }
    elfs.push({ elfIndex: i, total: caloriesForElf });
  }
  const sortedElfsByCalories = elfs.sort((a, b) => b.total - a.total);

  return sortedElfsByCalories
    .slice(0, top)
    .reduce((acc, curr) => (acc += curr.total), 0);
};
const part1 = (inpt: string) => {
  const r = solve(inpt, 1);

  return r;
};

const part2 = (inpt: string) => {
  const r = solve(inpt, 3);

  return r;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 24000,
      },
      {
        input: input,
        expected: 69795,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 45000,
      },
      {
        input: input,
        expected: 208437,
      },
    ],
    solution: part2,
  },
});
