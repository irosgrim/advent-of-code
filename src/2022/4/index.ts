import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const isArrayIncluded = (first, second) =>
  first.every((x) => second.includes(x));
const arrIntersection = (first, second) =>
  first.filter((x) => second.includes(x));

const solve = (inpt: string, part = "first") => {
  const arr = inpt.split("\n").map((x) =>
    x.split(",").map((y) => {
      const nrs = y.split("-");
      const start = Number(nrs[0]);
      const end = Number(nrs[1]);
      const r = range(start, end, 1);
      return {
        start,
        end,
        range: r,
      };
    }),
  );
  const overlapping = [];
  for (let i of arr) {
    const [first, second] = i;
    if (part === "first") {
      if (
        isArrayIncluded(first.range, second.range) ||
        isArrayIncluded(second.range, first.range)
      ) {
        overlapping.push(i);
      }
    } else {
      if (arrIntersection(first.range, second.range).length) {
        overlapping.push(i);
      }
    }
  }
  return overlapping;
};

const part1 = (inpt: string) => {
  const r = solve(inpt);
  return r.length;
};

const part2 = (inpt: string) => {
  const r = solve(inpt, "second");
  return r.length;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 2,
      },
      {
        input: input,
        expected: 571,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 4,
      },
      {
        input: input,
        expected: 917,
      },
    ],
    solution: part2,
  },
});
