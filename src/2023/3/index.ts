import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

console.log(`Solving: ${__dirname.slice(__dirname.indexOf("src") + 4)}`);

const isNumber = (c: string) => /^\d+$/.test(c);
const isAdjacent = (arr: string[][], i: number, j:number, char = ".") => {
  // up
  if (i > 0 && arr[i - 1][j] !== char && !isNumber(arr[i - 1][j])) return true;
  // down
  if (i < arr.length - 1 && arr[i + 1][j] !== char && !isNumber(arr[i + 1][j])) return true;
  // left
  if (j > 0 && arr[i][j - 1] !== char && !isNumber(arr[i][j - 1])) return true
  // right
  if (j < arr[i].length - 1 && arr[i][j + 1] !== char && !isNumber(arr[i][j + 1])) return true
  // up-left diag
  if (i > 0 && j > 0 && arr[i - 1][j - 1] !== char && !isNumber(arr[i - 1][j - 1])) return true;
  // up-right diag
  if (i > 0 && j < arr[i].length - 1 && arr[i - 1][j + 1] !== char && !isNumber(arr[i - 1][j + 1])) return true;
  // low-left diag
  if (i < arr.length - 1 && j > 0 && arr[i + 1][j - 1] !== char && !isNumber(arr[i + 1][j - 1])) return true;
  // low-right diag
  if (i < arr.length - 1 && j < arr[i].length - 1 && arr[i + 1][j + 1] !== char && !isNumber(arr[i + 1][j + 1])) return true;
}

const part1 = (inpt: string) => {
  const arr: string[][] = inpt.split("\n").map(x => x.split(""));
  const nrs = [];
  let sum = 0;
  let nr = "";
  for (let i = 0; i < arr.length; i++) {
      let valid = false;
      for (let j = 0; j < arr[i].length+1; j++) {
        if (isNumber(arr[i][j])) {
          if(isAdjacent(arr, i, j, ".")) {
            valid = true;
          }
          nr += arr[i][j];
          
        } else {
          if (valid) {
            nrs.push(nr);
            sum += parseInt(nr, 10);
          }
          valid = false;
          
          nr = "";
        }
      }
    }

  return sum;
};


const getNumberGroup = (arr: string[][], row: number, col: number): number => {
    let group = '';

    let start = col;
    while (start > 0 && isNumber(arr[row][start - 1])) {
        start--;
    }
    while (start <= arr[row].length - 1 && isNumber(arr[row][start])) {
        group += arr[row][start];
        start++;
    }

    console.log(group)
    return parseInt(group, 10);
};

const adjacentNumbers = (arr: string[][], i: number, j:number): number => {
  //@ts-ignore
  const adjacence: number[] = [
    (i > 0 && isNumber(arr[i - 1][j])) && getNumberGroup(arr, i - 1, j),
    (i < arr.length - 1 && isNumber(arr[i + 1][j])) && getNumberGroup(arr, i + 1, j),
    (j > 0 && isNumber(arr[i][j - 1])) && getNumberGroup(arr, i, j - 1),
    (j < arr[i].length - 1 && isNumber(arr[i][j + 1])) && getNumberGroup(arr, i, j + 1),
    (i > 0 && j > 0 && isNumber(arr[i - 1][j - 1])) && getNumberGroup(arr, i - 1, j-1),
    (i > 0 && j < arr[i].length - 1 && isNumber(arr[i - 1][j + 1])) && getNumberGroup(arr, i - 1, j + 1),
    (i < arr.length - 1 && j > 0 && isNumber(arr[i + 1][j - 1])) && getNumberGroup(arr, i + 1, j -1 ),
    (i < arr.length - 1 && j < arr[i].length - 1 && isNumber(arr[i + 1][j + 1])) && getNumberGroup(arr, i + 1, j + 1),
  ].filter(x => x !== false);

  const set: number[] = [...new Set(adjacence)];
  return set.length === 2 ? (set[0] * set[1]): 0;
}


const part2 = (inpt: string) => {
  const arr: string[][] = inpt.split("\n").map(x => x.split(""));
  const nrs = [];
  for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === "*") {
          nrs.push(adjacentNumbers(arr, i, j));
        }
      }
    }
  return nrs.reduce((acc, curr) => acc += curr, 0);
};

run({
  part1: {
    tests: [
      // {
      //   input: testInput,
      //   expected: 4361,
      // },
      // {
      //   input: input,
      //   expected: 532445,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 467835,
      },
      {
        input: input,
        expected: 467835,
      },
    ],
    solution: part2,
  },
});
