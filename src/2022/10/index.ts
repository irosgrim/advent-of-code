import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const currentCycle = (cmd: [string, number?]) => {
  switch (cmd[0]) {
    case "noop":
      return 1;
    case "addx":
      return 2;
  }
};

const solve = (inpt: string) => {
  const arr = inpt.split("\n").map((x) => x.split(" ") as [string, number?]);
  let x = 1;
  let cycle = 1;
  let sum = 0;
  let row = "";
  for (const line of arr) {
    const cycles = currentCycle(line);
    const lineValue = +line[1];

    for (const c of Array(cycles)) {
      const col = (cycle - 1) % 40;
      row += x - 1 <= col && col <= x + 1 ? "#" : " ";
      if (col === 39) {
        row += "*";
      }
      if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
        sum += cycle * x;
      }
      cycle++;
    }

    x += cycles === 2 ? lineValue : 0;
  }
  return { sum, row };
};
const part1 = (inpt: string) => {
  const r = solve(inpt);
  return r.sum;
};

const part2 = (inpt: string) => {
  const r = solve(inpt);
  for (let i = 0; i < r.row.length; i += 41) {
    console.log(r.row.substring(i, i + 40));
  }
  return "EALGULPG";
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13140,
      },
      {
        input: input,
        expected: 17840,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: "EALGULPG",
      },
      {
        input: input,
        expected: "EALGULPG",
      },
    ],
    solution: part2,
  },
});
