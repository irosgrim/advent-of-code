#!/bin/bash
export $(grep -v '^#' .env | xargs)
YEAR=$1
DAY=$2

function print_yellow {
  printf "\e[33;1m%s\n" "$1"
}
function print_green {
  printf "\e[32m$1\e[m\n"
}
function print_red {
  echo -e "\033[1;31m$1\033[0m"
}


function create_files {
    print_green "Creating the files from __template directory into $SRC"
    PARENT_DIR=$(pwd)
    mkdir $SRC
    cd $SRC
    cp -a $PARENT_DIR/__template/. .

    DAY_NO_ZEROS="$(echo $DAY | sed 's/^0*//')"
    PUZZLE_URL="https://adventofcode.com/${YEAR}/day/${DAY_NO_ZEROS}/input"
    echo $PUZZLE_URL
    PUZZLE_FILE="input.txt"

    curl "${PUZZLE_URL}" -H "cookie: session=${AOC_SESSION_COOKIE}" -o "${PUZZLE_FILE}"
    print_green "✨ DONE"
    print_yellow "Solving $SRC"
    $PARENT_DIR/continue_day.sh $YEAR $DAY
}

function continue_day {
    if [ -d "$SRC" ]; then
        print_yellow "$SRC Directory exists. Checking if empty" 
        if [ -z "$(ls -A $SRC)" ]; then
            create_files
        else
            print_green "✧✦✧ Starting up ./src/$YEAR/$DAY"
            ./continue_day.sh $YEAR $DAY
        fi
    else
        create_files
    fi
}

if [ -z "$YEAR" ] && [ -z "$DAY" ]
    then
        echo "No argument supplied"
    else
        SRC="src/$YEAR/$DAY"
fi

continue_day
