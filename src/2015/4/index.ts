import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

console.log(`Solving: ${__dirname.slice(__dirname.indexOf("src") + 4)}`);

const part1 = (inpt: string | number) => {
  return inpt;
};

const part2 = (inpt: string | number) => {
  return inpt;
};

run({
  part1: {
    tests: [
      {
        input: 42,
        expected: 42,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: 42,
        expected: 42,
      },
    ],
    solution: part2,
  },
});
