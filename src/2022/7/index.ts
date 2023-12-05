import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const inputTestFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(inputTestFile, "utf-8");
const input = fs.readFileSync(inputFile, "utf-8");

const format = (inpt: string) => {
  const arr = inpt.split("\n").map((x) => x.split(" "));
  return arr;
};

const makeFS = (input) =>
  input
    .split("\n")
    .concat("$ cd /")
    .map((line) => line.split(" "))
    .filter(([, cmd]) => cmd !== "ls")
    .reduce(
      (cwd, [args0, args1, args2]) => {
        switch (args0) {
          case "$":
            switch (args2) {
              case "..":
                cwd.shift();
                break;
              case "/":
                cwd = cwd.slice(-1);
                break;
              default:
                cwd.unshift(cwd[0][args2]);
            }
            break;
          default:
            cwd[0][args1] = cwd[0][args1] || Number(args0) || {};
        }
        return cwd;
      },
      [{}],
    )[0];
const part1 = (inpt: string | number) => {
  const fs = makeFS(inpt);
  return fs;
};

const part2 = (inpt: string | number) => {
  return inpt;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
});
