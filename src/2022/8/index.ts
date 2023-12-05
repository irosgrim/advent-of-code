import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const testInputFile = path.join(__dirname, "test-input.txt");

const input = fs.readFileSync(inputFile, "utf-8");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const isVisible = (y, x, arr, moveY, moveX) => {
  const curr = arr[y][x];
  let scenicScore = 1;
  // left
  if (moveX < 0) {
    for (let i = x; i > 0; i--) {
      scenicScore = x;
      if (+curr <= +arr[y][i - 1]) {
        scenicScore = x + 1 - i;
        return { visible: false, scenicScore: scenicScore };
      }
    }
  }

  // right
  if (moveX > 0) {
    for (let i = x; i < arr[y].length - 1; i++) {
      scenicScore = arr[y].length - 1 - x;
      if (+curr <= +arr[y][i + 1]) {
        scenicScore = i + 1 - x;
        return { visible: false, scenicScore: scenicScore };
      }
    }
  }
  // top
  if (moveY < 0) {
    for (let i = y; i > 0; i--) {
      scenicScore = y;
      if (+curr <= +arr[i - 1][x]) {
        scenicScore = y + 1 - i;

        return { visible: false, scenicScore: scenicScore };
      }
    }
  }
  // bottom
  if (moveY > 0) {
    for (let i = y; i < arr.length - 1; i++) {
      scenicScore = arr[y].length - 1 - y;
      if (+curr <= +arr[i + 1][x]) {
        scenicScore = i + 1 - y;
        return { visible: false, scenicScore: scenicScore };
      }
    }
  }
  return { visible: true, scenicScore: scenicScore };
};

const calculate = (inpt: string) => {
  const arr = (inpt as string).split("\n");
  const rows = arr.length;
  const columns = arr[0].length;

  let v = 0;
  const scenicScores = [];
  const scores2 = Array(rows).fill("");
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const left = isVisible(y, x, arr, 0, -1);
      const right = isVisible(y, x, arr, 0, 1);
      const top = isVisible(y, x, arr, -1, 0);
      const bottom = isVisible(y, x, arr, 1, 0);
      const score =
        left.scenicScore *
        right.scenicScore *
        top.scenicScore *
        bottom.scenicScore;
      scenicScores.push(score);
      scores2[y] += score >= 10000 ? "x" : " ";
      const visible =
        left.visible || right.visible || top.visible || bottom.visible;

      if (visible) {
        v += 1;
      }
    }
  }
  return {
    visible: v,
    maxScenicScore: Math.max(...scenicScores),
  };
};
const part1 = (inpt: string | number) => {
  const r = calculate(inpt as string);
  return r.visible;
};

const part2 = (inpt: string | number) => {
  const r = calculate(inpt as string);
  return r.maxScenicScore;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 21,
      },
      {
        input: input,
        expected: 1672,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 16,
      },
      {
        input: input,
        expected: 327180,
      },
    ],
    solution: part2,
  },
});
