import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

class Point {
  x = 0;
  y = 0;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  direction(d) {
    switch (d) {
      case "U":
        return { x: 0, y: 1 };
      case "D":
        return { x: 0, y: -1 };
      case "L":
        return { x: -1, y: 0 };
      case "R":
        return { x: 1, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  }
  move(d: string) {
    this.x += this.direction(d).x;
    this.y += this.direction(d).y;
  }
  follow(point: Point) {
    // distance between two points formula, manhattan distance
    const distance = Math.floor(
      Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2),
    );

    if (distance > 1) {
      const dirX = point.x - this.x;
      this.x += Math.abs(dirX) === 2 ? dirX / 2 : dirX;
      const dirY = point.y - this.y;
      this.y += Math.abs(dirY) === 2 ? dirY / 2 : dirY;
    }
  }
  visit(listOfPoints: Set<string>) {
    listOfPoints.add(`x${this.x} y${this.y}`);
  }
}

const solve = (inpt: string, bodySize = 2) => {
  // [x,y]
  const arr = inpt
    .trim()
    .split("\n")
    .map((x) => {
      const xx: [string, number] = x.split(" ") as [string, number];
      xx[1] = +xx[1];
      return xx;
    });
  const body = new Array(bodySize).fill("x").map((x) => new Point(0, 0));
  const head = body[0];
  const tail = body[body.length - 1];
  const tailVisitedPoints: Set<string> = new Set();
  tail.visit(tailVisitedPoints);
  for (let i = 0; i < arr.length; i++) {
    const [cmd, amount] = arr[i];
    for (let m = 0; m < amount; m++) {
      head.move(cmd);
      for (let node = 1; node < body.length; node++) {
        const currentNode = body[node];
        currentNode.follow(body[node - 1]);
      }
      tail.visit(tailVisitedPoints);
    }
  }
  return tailVisitedPoints.size;
};

const part1 = (inpt: string) => {
  const r = solve(inpt, 2);
  return r;
};

const part2 = (inpt: string) => {
  const r = solve(inpt, 10);
  return r;
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
        expected: 5735,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 1,
      },
      {
        input: input,
        expected: 2478,
      },
    ],
    solution: part2,
  },
});
