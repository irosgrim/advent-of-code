import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const values = {
  X: 1,
  Y: 2,
  Z: 3,
};

const POINTS = {
  LOST: 0,
  DRAW: 3,
  WIN: 6,
};
// elf move - my move
// A: "X", // rock
// B: "Y", // paper
// C: "Z", // scissors

/// part 1:
const moves = {
  AX: POINTS.DRAW + values.X,
  AY: POINTS.WIN + values.Y,
  AZ: POINTS.LOST + values.Z,
  BX: POINTS.LOST + values.X,
  BY: POINTS.DRAW + values.Y,
  BZ: POINTS.WIN + values.Z,
  CX: POINTS.WIN + values.X,
  CY: POINTS.LOST + values.Y,
  CZ: POINTS.DRAW + values.Z,
};
/// part 2:
/// X - lose
/// Y - draw
/// Z - win
const movesRound2 = {
  AX: POINTS.LOST + values.Z,
  AY: POINTS.DRAW + values.X,
  AZ: POINTS.WIN + values.Y,
  BX: POINTS.LOST + values.X,
  BY: POINTS.DRAW + values.Y,
  BZ: POINTS.WIN + values.Z,
  CX: POINTS.LOST + values.Y,
  CY: POINTS.DRAW + values.Z,
  CZ: POINTS.WIN + values.X,
};

const make = (inpt, round = 1) => {
  const arr = inpt.split("\n").map((x) => x[0] + x[2]);
  const a = arr.map((x) => {
    return {
      move: x,
      points: round === 2 ? movesRound2[x] : moves[x],
    };
  });
  const total = a.reduce((acc, curr) => (acc += curr.points), 0);
  return total;
};

const part1 = (inpt: string) => {
  const r = make(inpt, 1);
  return r;
};

const part2 = (inpt: string) => {
  const r = make(inpt, 2);
  return r;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 15,
      },
      {
        input: input,
        expected: 13526,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 12,
      },
      {
        input: input,
        expected: 14204,
      },
    ],
    solution: part2,
  },
});
