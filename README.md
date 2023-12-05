Create `.env` file in the root of the folder:

```
AOC_SESSION_COOKIE=your session cookie
```

To start or continue solving a specific day run `yarn solve <year> <day>`.
Example:
`yarn solve 2023 1` 
`yarn solve 2015 12`

This will create the boilerplate code for the year/day in `src/year/day`, or if the folder already exists, it assumes that you want to continue or start solving.

The code responsible for testing your solution is inside `src/year/day/index.ts`.

```javascript
run({
  part1: {
    tests: [
      {
        input: 42,
        expected: 42,
      },
      {
        input: testInput,
        expected: expected_result,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: 42,
        expected: 42,
      },
    ],
    solution: part2,
  },
});
```

For solving, provide the correct input values for for each part:


```javascript
{
    input: testInput,
    expected: <expectedResult>,
},
```