require('dotenv').config();
const fs = require("fs");
const fetch = require("node-fetch");
const args = process.argv.slice(2);

const isValidYear = (year) => {
    const currentYear = new Date().getFullYear();
    if (year && !isNaN(year) && year >= 2015 && year <= currentYear) {
        return true;
    }
    return false;
}

const isValidDay = (day) => {
    if(day && !isNaN(day) && day >= 1 && day <= 25) {
        return true;
    }
    return false;
}

const getYearAndDayFromArguments = (args) => {
    if (args.length === 1) {
        const [year, day] = args[0].split("/").map(Number);
        if (isValidYear(year) && isValidDay(day)) {
            return [year, day];
        } else {
            console.log("Required year/day ex. 2022/1");
        }
    } else {
        console.log("You need to specify year/day!");
    }
    return [0, 0]
}

const init = (args) => {
    const [year, day] = getYearAndDayFromArguments(args);
    if (year && day) {
        const path = `./src/${year}`;
        const yearExists = fs.existsSync(path);
        const dayExists = fs.existsSync(`${path}/${day}`);
        if (!yearExists) {
            fs.mkdirSync(path);
        }
        if(!dayExists) {
            fs.mkdirSync(`${path}/${day}`);
        }
        console.log('\x1b[36m%s\x1b[0m', `✨ CREATED ${path}/${day}`);
    }
    // const dayExists = fs.existsSync(`../src/${year}/${day}`)
    // if(!dayExists) {
    //     fs.mkdirSync(`../src/${year}/${day}`);
    // }
}

init(args);