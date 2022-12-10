import fs from "fs";
import * as path from 'path';
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const move = (cmd: string): [number, number] => {
    const [direction, amount] = cmd.split(" ");
    //  amount: [y, x]
    switch (direction) {
        case "U":
            return [-(amount), 0];
        case "D":
            return [+amount, 0];
        case "L":
            return [0, -(amount)];
        case "R":
            return [0, +amount];
        default:
            return [0, 0];
    }
}

const solve = (inpt: string) => {
    const arr = inpt.split("\n");

    for(const cmd of arr) {
        console.log(move(cmd));

    }
    return arr;
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
        ],
        solution: part2,
    },
})