import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

console.log(`Solving: ${__dirname.slice(__dirname.indexOf("src") + 4)}`);

const part1 = (inpt: string | number) => {
  let floor = 0;

  for(let i = 0; i < input.length; i++) {
    if(input[i] === '(') {
      floor += 1;
    }
    if(input[i] === ')') {
      floor -= 1;
    }
  }
  return floor;
};

const part2 = (inpt: string | number) => {
  let floor = 0;
  let firstBasement;

  for(let i = 0; i < input.length; i++) {
    if(input[i] === '(') {
      floor += 1;
    }
    if(input[i] === ')') {
      floor -= 1;
    }
    // part 2
    if(floor === -1 && firstBasement === undefined ) {
      firstBasement = i + 1;
    }
      
  }
  return firstBasement;
};

run({
  part1: {
    tests: [
      {
        input: input,
        expected: 280,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: input,
        expected: 1797,
      },
    ],
    solution: part2,
  },
});
