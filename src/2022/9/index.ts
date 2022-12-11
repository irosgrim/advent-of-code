import fs from "fs";
import * as path from 'path';
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const goto = (cmd: string): [number, number] => {
    const [direction, amount] = cmd.split(" ");
    //  amount: [x, y]
    switch (direction) {
        case "U":
            return [0, +(amount)];
        case "D":
            return [0, -amount,];
        case "L":
            return [-(amount), 0];
        case "R":
            return [+amount, 0];
        default:
            return [0, 0];
    }
}

const move = (from: [number, number], to: [number, number]): [number, number] => {
    return [from[0] + to[0], from[1] + to[1]];
}

const solve = (inpt: string) => {
    // [x,y]
    const arr = inpt.split("\n");
    const [head, tail] = ["H", "T"];
    
    return 0;
}

const part1 = (inpt: string) => {
    const r = solve(inpt);
    return r;
}

const part2 = (inpt: string) => {
    return inpt;
}

run({
    part1: {
        tests: [
            {
                input: testInput,
                expected: 13
            },
        ],
        solution: part1
    },
    part2: {
        tests: [
        ],
        solution: part2,
    },
})