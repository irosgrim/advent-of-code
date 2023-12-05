import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

console.log(`Solving: ${__dirname.slice(__dirname.indexOf("src") + 4)}`);

const part1 = (inpt: string) => {
  const allBoxes = inpt.split('\n').map(x => {
    const boxes = x.split('x').map(n => parseInt(n, 10));
    return boxes;
  });
  
  let totalPaper = 0;
  for (const box of allBoxes) {
    const [l, w, h] = box;
    const smallestSide = Math.min(l*w, w*h, h*l);
    totalPaper += 2*l*w + 2*w*h + 2*h*l + smallestSide
  }
  return totalPaper;
};

const part2 = (inpt: string) => {
  const allBoxes = inpt.split('\n').map(x => {
    const boxes = x.split('x').map(n => parseInt(n, 10));
    return boxes;
  });
  
  let totalRibbon = 0;
  for (const box of allBoxes) {
    const [l, w, h] = box;
    const [,a,b] = [l,w,h].sort((a,b) => b - a)
    totalRibbon += 2*a+2*b;
    totalRibbon += l*h*w;
  }
  return totalRibbon;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 101,
      },
       {
        input: input,
        expected: 1588178,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 48,
      },
      {
        input: input,
        expected: 3783758,
      },
    ],
    solution: part2,
  },
});
