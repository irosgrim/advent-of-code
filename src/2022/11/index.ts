import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

class Monkey {
  items: number[] = [];
  inspectedItems: number[] = [];
  props: string[] = [];
  name: string = "0";
  divisibleBy = 1;
  constructor(props: string[]) {
    this.items = this.setStartingItems(props[1]);
    this.inspectedItems = [];
    this.props = props;
    this.name = props[0].split(" ")[1].split(":")[0];
    const d = props[3].split(" ");
    this.divisibleBy = +d[d.length - 1];
  }
  throwNextItem(monkeys: { [key: string]: Monkey }, rounds: number) {
    if (this.items.length) {
      const item = this.items.shift();
      this.throwToMonkey(item, monkeys, rounds);
    }
  }
  catchItem(item: number, from: string) {
    this.items.push(item);
  }
  setStartingItems(str: string) {
    const listStart = str.indexOf(": ");
    const items = str
      .substring(listStart + 2)
      .split(", ")
      .map(Number);
    return items;
  }
  setWorryLevel(item: number) {
    const listStart = this.props[2].indexOf(": ");
    const items = this.props[2].substring(listStart).split(" ");
    const [, , , a, op, b] = items;
    if (op) {
      switch (op) {
        case "*":
          if (a === "old" && b !== "old") {
            return item * +b;
          }
          if (a !== "old" && b === "old") {
            return +a * item;
          }
          if (a === "old" && b === "old") {
            return item * item;
          }
          break;
        case "+":
          if (a === "old" && b !== "old") {
            return item + +b;
          }
          if (a !== "old" && b === "old") {
            return +a + item;
          }
          if (a === "old" && b === "old") {
            return item + item;
          }
          break;
        default:
          return 0;
      }

      return 0;
    }
  }
  throwToMonkey(item: number, monkeys: { [key: string]: Monkey }, rounds = 20) {
    const arr = this.props[3].split(" ");
    const nr = +arr[arr.length - 1];
    let divider = 3;
    if (rounds > 20) {
      divider = 1;
      for (const monkey in monkeys) {
        divider *= monkeys[monkey].divisibleBy;
      }
    }
    const newWorryLevel =
      rounds > 20
        ? this.setWorryLevel(item) / divider
        : Math.floor(this.setWorryLevel(item) / divider);
    // const newWorryLevel = this.setWorryLevel(item);

    const throwTo =
      newWorryLevel % nr === 0
        ? this.props[4].split(" ")
        : this.props[5].split(" ");
    const nextMonkey = throwTo[throwTo.length - 1];

    this.inspectedItems.push(newWorryLevel);
    monkeys[nextMonkey].catchItem(newWorryLevel, this.name);
  }
}

const solve = (inpt: string, rounds = 20) => {
  const a = inpt.split("\n");
  const aa = a.filter((x) => x !== "");
  const monkeys: { [key: string]: Monkey } = {};
  for (let i = 0; i < aa.length; i += 6) {
    const chunk = aa.slice(i, i + 6);
    const m = new Monkey(chunk);
    monkeys[i / 6] = m;
  }
  for (let i = 0; i < rounds; i++) {
    for (const m in monkeys) {
      const monkey = monkeys[m];
      while (monkey.items.length > 0) {
        monkey.throwNextItem(monkeys, rounds);
      }
    }
  }
  const topInspected = [];
  for (const monkey in monkeys) {
    topInspected.push(monkeys[monkey].inspectedItems.length);
  }
  const top2 = topInspected.sort((a, b) => b - a);
  return top2[0] * top2[1];
};
const part1 = (inpt: string) => {
  const r = solve(inpt, 20);
  return r;
};

const part2 = (inpt: string) => {
  const r = solve(inpt, 10000);
  return r;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 10605,
      },
      {
        input: input,
        expected: 58056,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
});
