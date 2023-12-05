import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const solve = (inpt: string) => {
  const arr = inpt.split("\n");
  const movesIndex = arr.findIndex((x) => x.length === 0);

  const input = arr
    .slice(0, movesIndex)
    .map((x) => x.match(/.{1,4}/g).map((y) => y[1]));
  const moves = arr
    .slice(movesIndex + 1, arr.length)
    .map((x) => x.match(/\d+/g).map(Number));

  const move = (amount, from, to, part = "one") => {
    const f = [...from];
    const t = [...to];
    if (amount && from && to) {
      let slice = f.splice(0, amount).reverse();
      if (part === "two") {
        slice = slice.reverse();
      }
      t.unshift(...slice);
    }
    return {
      from: f,
      to: t,
    };
  };

  const crates = input[0].map((v, i) =>
    input.map((row) => row[i]).filter((x) => x !== " "),
  );

  const run = (part = "one") => {
    const cr = [...crates];
    for (const m of moves) {
      const r = move(m[0], cr[m[1] - 1], cr[m[2] - 1], part);
      cr[m[1] - 1] = r.from;
      cr[m[2] - 1] = r.to;
    }
    return cr;
  };

  const part1 = run("one")
    .map((x) => x[0] || "")
    .join("");
  const part2 = run("two")
    .map((x) => x[0] || "")
    .join("");
  return {
    firstPart: part1,
    secondPart: part2,
  };
};

const part1 = (inpt: string) => {
  const { firstPart } = solve(inpt);
  return firstPart;
};

const part2 = (inpt: string) => {
  const { secondPart } = solve(inpt);
  return secondPart;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: "CMZ",
      },
      {
        input: input,
        expected: "VCTFTJQCG",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: "MCD",
      },
      {
        input: input,
        expected: "GCFGLDNJZ",
      },
    ],
    solution: part2,
  },
});
