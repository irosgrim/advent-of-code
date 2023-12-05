import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

console.log(`Solving: ${__dirname.slice(__dirname.indexOf("src") + 4)}`);

const part1 = (inpt: string) => {
  const arr: any[][] = inpt.split("\n").map(x => {
    return x.split(": ")[1].split(" | ");
  });

  let sum = 0;

  for(let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = arr[i][j].split(" ").filter((x: string) => x !== "").map((x: string) => parseInt(x, 10));
    }
  }
  for (const card of arr) {
    const [winners, actual] = card as number[][];
    const totals = actual.reduce((acc, curr) => {
      if (winners.indexOf(curr) > -1) {
        acc.push(Math.pow(2, acc.length))
      }
      return acc;
    }, [] as number[]);

    if (totals.length) {
      sum += Math.max(...totals);
    }
  }
  return sum;
};

const part2 = (inpt: string) => {
  const arr: any[][] = inpt.split("\n").map(x => {
    return x.split(": ")[1].split(" | ");
  });

  const cardCopies = [];

  for(let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = arr[i][j].split(" ").filter((x: string) => x !== "").map((x: string) => parseInt(x, 10));
    }
    cardCopies.push(1);
  }

  for (const [cardIndex, card] of arr.entries()) {
    const [winners, actual] = card as number[][];
    const totals = actual.reduce((acc, curr) => {
      if (winners.indexOf(curr) > -1) {
        acc.push(Math.pow(2, acc.length))
      }
      return acc;
    }, [] as number[]);
    
    if (totals.length) {
      const currentCardCopies = cardCopies[cardIndex];
      const startIndex = cardIndex + 1;
      const endIndex = cardIndex <= arr.length - 1 ? cardIndex + totals.length : arr.length - 1;

      for (let i = startIndex; i <= endIndex; i++) {
        cardCopies[i] += currentCardCopies;
      }
    }
  }
  return cardCopies.reduce((acc, curr) => acc+=curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13,
      },
       {
        input: input,
        expected: 27454,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 30,
      },
      {
        input: input,
        expected: 6857330,
      },
    ],
    solution: part2,
  },
});
