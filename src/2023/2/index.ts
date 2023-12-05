import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");

const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const testInputFile2 = path.join(__dirname, "test-input2.txt");
const testInput2 = fs.readFileSync(testInputFile2, "utf-8");

console.log(`Solving: ${__dirname.slice(__dirname.indexOf("src") + 4)}`);

const part1 = (inpt: string | number) => {
  const cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let total = 0;
  const arr = inpt.toString().split("\n");
  for (const gameNr of arr) {
    const valid = [
      gameNr.match(/\d+(?=\sred)/g)!.every((x) => Number(x) <= cubes.red),
      gameNr.match(/\d+(?=\sgreen)/g)!.every((x) => Number(x) <= cubes.green),
      gameNr.match(/\d+(?=\sblue)/g)!.every((x) => Number(x) <= cubes.blue),
    ].every((x) => x === true);

    if (valid) {
      total += Number(gameNr.substring(0, gameNr.indexOf(":")).split(" ")[1]);
    }
  }

  return total;
};

const part2 = (inpt: string | number) => {
  const arr = inpt.toString().split("\n");
  const cubeValues = {
    red: [],
    green: [],
    blue: [],
  };
  let total = 0;
  for (const gameNr of arr) {
    const red = Math.max(...gameNr.match(/\d+(?=\sred)/g)!.map(Number)) || 1;
    const green =
      Math.max(...gameNr.match(/\d+(?=\sgreen)/g)!.map(Number)) || 1;
    const blue = Math.max(...gameNr.match(/\d+(?=\sblue)/g)!.map(Number)) || 1;
    total += red * green * blue;
  }

  return total;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 8,
      },
      {
        input: input,
        expected: 2105,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput2,
        expected: 2286,
      },
      {
        input: input,
        expected: 72422,
      },
    ],
    solution: part2,
  },
});
