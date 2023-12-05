import { argv } from "node:process";
import fs from "node:fs";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { spawn } from "node:child_process";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config();

if (argv.length < 2) {
  console.log("Please provide the year and day as arguments");
  process.exit(1);
}

const [year, day] = argv.slice(2);
if (parseInt(year) < 2015 || parseInt(year) > new Date().getFullYear()) {
  console.log(
    `Please provide a year between 2015 and ${new Date().getFullYear()}`,
  );
  process.exit(1);
}

if (parseInt(day) < 1 || parseInt(day) > 25) {
  console.log(`Please provide a day between 1 and 25`);
  process.exit(1);
}

const getInput = async (year: number, day: number) => {
   const puzzleUrl = `https://adventofcode.com/${year}/day/${day}/input`;
    const f = await fetch(puzzleUrl, {
      headers: {
        cookie: `session=${process.env.AOC_SESSION_COOKIE}`,
      },
    });
    return f.text();
}

const createFiles = async (sourceDir: string, destinationDir: string) => {
  try {
    await fs.mkdirSync(destinationDir, { recursive: true });
    const files = await fs.readdirSync(sourceDir);
    await fs.mkdirSync(destinationDir, { recursive: true });

    for (const file of files) {
      const sourceFile = path.join(sourceDir, file);
      const destFile = path.join(destinationDir, file);
      await fs.copyFileSync(sourceFile, destFile);
    }

    const inputFile = `${__dirname}/${year}/${day}/input.txt`;
    const data = await getInput(+year, +day);

    await fs.writeFileSync(inputFile, data);

    console.log(`✨ DONE creating files`);
  } catch (error) {
    console.error("Error copying files:", error);
  }
};

(async () => {
  const folderExists = await fs.existsSync(`src/${year}/${day}`);

  if (!folderExists) {
    console.log(`src/${year}/${day} does not exist`);
    const rl = readline.createInterface({ input, output });
    rl.question(
      "The day doesnt exist, you want to create it? ",
      async (answer) => {
        if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
          console.log(
            `Creating the files from src/__template directory into src/${year}/${day}`,
          );
          await createFiles("src/__template", `src/${year}/${day}`);
        } else {
          console.log("Exiting...");
          process.exit(1);
        }
        rl.close();
      },
    );
  } else {
    const inputFile = `${__dirname}/${year}/${day}/input.txt`;
    const inputFileExists =  await fs.existsSync(inputFile);
    
    if (!inputFileExists) {
      const data = await getInput(+year, +day);
      await fs.writeFileSync(inputFile, data);
    }
    
    const watchPath = `src/${year}/${day}`;
    const command = `ts-node ${watchPath} ${watchPath}/index.ts`;

    spawn(command, {
      stdio: "inherit",
      shell: true,
      detached: true,
    });
  }
})();
