import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
import type { Key } from "readline";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const testInputFile2 = path.join(__dirname, "test-input2.txt");
const testInput2 = fs.readFileSync(testInputFile2, "utf-8");

const part1 = (inpt: string) => {
    const arr = inpt.split("\n");
    let sum = 0;
    for (const line of arr) {
        const nrs = line.match(/\d+/g);
        if (nrs) {
           const n = nrs.join("");
           if (n.length === 1) {
               sum += Number(n.repeat(2));
           } else {
                sum += Number(n[0]! + n[n.length - 1]);

           }
        }
    }
    return sum;
}

const part2 = (inpt: string) => {
    const arr = inpt.split("\n");
     const numberMap = {
        one: "1e", two: "2o", three: "3e", four: "4",
        five: "5e", six: "6", seven: "7n", eight: "8t", nine: "9e"
    } as const;
    let sum = 0;
    const replaced = [];
    const regex = new RegExp(Object.keys(numberMap).join("|"), "gi");
    for (const line of arr) {
        let nrs = line.replaceAll(regex, (matched: any)) => numberMap[matched])
            .replace(regex, (matched: any) => numberMap[matched])
            .replace(/\D/g, "");
        if (nrs.length === 1) {
            nrs = nrs.repeat(2);
        }
        replaced.push(nrs);
        sum += parseInt(nrs[0] + nrs[nrs.length - 1], 10);
    }
    return sum;
}

run({
    part1: {
        tests: [
            {
                input: testInput,
                expected: 142
            },
             {
                input: input,
                expected: 55488
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: testInput2,
                expected: 281
            },
            {
                input: input,
                expected: 55614
            },
        ],
        solution: part2,
    },
})