import fs from "fs";
import * as path from "path";
import { run } from "../../testing/testRunner";
const inputFile = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFile, "utf-8");
const testInputFile = path.join(__dirname, "test-input.txt");
const testInput = fs.readFileSync(testInputFile, "utf-8");

const isUpperCase = (letter) => letter === letter.toUpperCase();

// Function to calculate the priority of each letter in a string
const priority = (str) => {
  const lowercaseA = 96;
  const uppercaseA = 38;
  const strMap = {};

  // Loop through each letter in the string
  for (let i = 0; i < str.length; i++) {
    const letter = str[i];

    // Calculate the value of the letter based on its case
    const value = isUpperCase(letter)
      ? str.charCodeAt(i) - uppercaseA
      : str.charCodeAt(i) - lowercaseA;

    // Check if the letter already exists in the map
    if (strMap[letter]) {
      // If it exists, append the current index to its list of occurrences
      strMap[letter].occurences.push(i);
    } else {
      // If it does not exist, add it to the map with its value and a single occurrence
      strMap[letter] = {
        value,
        occurences: [i],
      };
    }
  }

  return strMap;
};

// Function to split the input into two parts and calculate their priorities
const arr = (inpt: string, part = "part1") => {
  const strArr = inpt.split("\n");
  // Split the input into two parts
  return strArr.map((x) => {
    const half = x.length / 2;
    const first = x.substring(0, half);
    const second = x.substring(half);

    // Calculate the priorities of the two parts
    const firstPriority = priority(first);
    const secondPriority = priority(second);

    // Return the priorities depending on the value of the "part" parameter
    return part === "part1"
      ? [firstPriority, secondPriority]
      : { ...firstPriority, ...secondPriority };
  });
};

// Function to find the repeating letters in two strings
const repeating = (myArr) => {
  // Loop through each pair of strings in the array
  const result = myArr.map(([first, second]) => {
    // Convert the priority map of the first string to a list of entries
    const entries = Object.entries(first);
    let common = {};

    // Loop through each entry
    for (const [key, value] of entries) {
      // Check if the key exists in the second string
      if (second[key]) {
        // If it exists, save it to the common object
        common = value;
        break;
      }
    }

    // Return the common object
    return common;
  });

  // Return the array of common objects
  return result;
};

const repeatingInGroups = (myArr, groupSize = 3) => {
  const newArr = [];
  for (let i = 0; i < myArr.length; i += groupSize) {
    const slice = myArr.slice(i, i + groupSize);
    const o = Object.entries(slice[0]);
    let common = {};
    for (const [key, value] of o) {
      if (slice[1][key] && slice[2][key]) {
        common = value;
        newArr.push(common);
        break;
      }
    }
  }
  return newArr;
};

const part1 = (inpt: string) => {
  const r = repeating(arr(inpt)).reduce((acc, curr) => (acc += curr.value), 0);
  return r;
};

const part2 = (inpt: string) => {
  const r = repeatingInGroups(arr(inpt, "part2"), 3).reduce(
    (acc, curr) => (acc += curr.value),
    0,
  );
  return r;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 157,
      },
      {
        input: input,
        expected: 8298,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 70,
      },
      {
        input: input,
        expected: 2708,
      },
    ],
    solution: part2,
  },
});
