import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

console.log(`Solving: ${__dirname.slice(__dirname.indexOf("src") + 4)}`);
  
// '^': [0, 1],
// 'v': [0, -1],
// '>': [1, 0],
// '<': [-1, 0],

const changeDirection = (dir: string, currentPosition: number[]) => {
    switch(dir) {
        case '^':
            currentPosition[1]++; 
            break;
        case 'v':
            currentPosition[1]--;  
            break;
        case '>':
            currentPosition[0]++; 
            break;
        case '<':
            currentPosition[0]--;  
            break;
    }
}

const part1 = (inpt: string) => {
  const startPosition = [0, 0];
  const houses = {
      [startPosition[0] + '-' + startPosition[1]] : 1,
    };
  const currentPosition = [...startPosition];
        
  for(let i = 0; i < inpt.length; i++) {
    changeDirection(inpt[i], currentPosition);
    const dropPresent = houses[currentPosition[0] + '-' + currentPosition[1]] !== undefined ? houses[currentPosition[0] + '-' + currentPosition[1]] + 1 : 1;
    houses[currentPosition[0] + '-' + currentPosition[1]] = dropPresent;
  }
  return Object.values(houses).filter(x => x >= 1).length;
};

const part2 = (inpt: string) => {
  const startPosition = [0, 0];

  const houses = {
    [startPosition[0] + ' ' + startPosition[1]] : 1,
  };
  const housesRobo = {
    [startPosition[0] + ' ' + startPosition[1]] : 1,
  };

  const currentPositionSanta = [...startPosition];
  const currentPositionRobo = [...startPosition];
        
  for(let i = 0; i < inpt.length; i++) {
    if(i % 2 === 0) {
      changeDirection(inpt[i], currentPositionSanta);
      const dropPresent = houses[currentPositionSanta[0] + ' ' + currentPositionSanta[1]] !== undefined ? houses[currentPositionSanta[0] + ' ' + currentPositionSanta[1]] + 1 : 1;
      houses[currentPositionSanta[0] + ' ' + currentPositionSanta[1]] = dropPresent;
    } else {
      changeDirection(inpt[i], currentPositionRobo);
      const dropPresent = housesRobo[currentPositionRobo[0] + ' ' + currentPositionRobo[1]] !== undefined ? housesRobo[currentPositionRobo[0] + ' ' + currentPositionRobo[1]] + 1 : 1;
      housesRobo[currentPositionRobo[0] + ' ' + currentPositionRobo[1]] = dropPresent;
    }
  }
    
  const housesTotal = {
    ...houses,
    ...housesRobo,
  }
    return Object.values(housesTotal).filter(x => x >= 1).length;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 4,
      },
      {
        input: input,
        expected: 2081,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `^v^v^v^v^v`,
        expected: 11,
      },
      {
        input: input,
        expected: 2341,
      },
    ],
    solution: part2,
  },
});
