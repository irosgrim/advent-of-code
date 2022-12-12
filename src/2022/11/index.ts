import fs from "fs";
import * as path from 'path';
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

class Monkey  {
    startingItems: number[] = [];
    inspectedItems: {from: string, item: number}[] = [];
    props: string[] = [];
    constructor(props: string[]) {
        this.startingItems =  this.setStartingItems(props[1]);
        this.inspectedItems = [];
        this.props = props;
    }
    throwNextItem() {
        if (this.startingItems.length) {
            const item = this.startingItems.shift();
            this.throwToMonkey(item);
        }
    }
    setStartingItems(str: string) {
        const listStart = str.indexOf(": ");
        const items = str.substring(listStart+2).split(", ").map(Number);
        return items;
    }
    setWorryLevel(item: number, str: string) {
        const listStart = str.indexOf(": ");
        const items = str.substring(listStart).split(" ");
        const [a, op, b] = items;
        if(op) {
            switch(op) {
                case "*":
                    if(a === "old" && b !== "old") {
                        return item * (+b);
                    }
                    if(a !== "old" && b === "old") {
                        return item * item;
                    }
                    break;
                case "+":
                    if(a === "old" && b !== "old") {
                        return item + (+b);
                    }
                    if(a !== "old" && b === "old") {
                        return item + item;
                    }
                    break;
                default:
                    return 0;
            }

            return 0;
        }
    }
    throwToMonkey(item: number) {
        const arr = this.props[3].split(" ");
        const nr = +arr[arr.length - 1];
        const monkeyNr = this.props[0].split(" ")[1].split(":")[0];
        if (item % nr === 0) {
            const throwTo = this.props[4].split(" ");
            this.inspectedItems.push({
                from: monkeyNr,
                item,
            });
            return {to: throwTo[throwTo.length -1]};
        }
        if (item % nr !== 0) {
            const throwTo = this.props[5].split(" ");
            this.inspectedItems.push({
                from: monkeyNr,
                item,
            });
            return {to: throwTo[throwTo.length -1]};
        }
        return 0;
    }
}

const solve = (inpt: string) => {
    const a = inpt.split("\n");
    const aa = a.filter(x => x !== "");
    const monkeys: {[key: string] : Monkey} = {};
    for (let i = 0; i < aa.length; i += 6) {
        const chunk = aa.slice(i, i+6);
        const m = new Monkey(chunk);
        monkeys[i/6] = m;
    }
    console.log(monkeys);
    const rounds = 20;
    let currentRound = 1;
    for (let i = 1; i < rounds; i++) {
        for (const m in monkeys) {
            const monkey = monkeys[m];
            monkey.throwNextItem()
        }
    }
    return 1;
}
const part1 = (inpt: string) => {
    const r = solve(inpt);
    return 1;
}

const part2 = (inpt: string) => {
    return inpt;
}

run({
    part1: {
        tests: [
            {
                input: testInput,
                expected: 42
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: 42,
                expected: 42
            },
        ],
        solution: part2,
    },
})