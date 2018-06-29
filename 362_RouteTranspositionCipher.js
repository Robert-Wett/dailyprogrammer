const chalk = require('chalk');

const setBoard = (width=9, height=3, message="WE ARE DISCOVERED. FLEE AT ONCE") => {
    const grid = [];
    const msg = message.toUpperCase().replace(/[\W_]+/g, '');
    let idx = 0;
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let ii = 0; ii < width; ii++) {
            if (msg[idx]) {
                row.push(msg[idx++]);
            } else {
                row.push('X');
            }
        }
        grid.push(row);
    }

    return grid;
}

const down = (grid, coords, steps, firstStep) => {
    let xCoord = firstStep ? 0 : coords.x + 1;
    let yCoord = firstStep ? grid[0].length - 1 : coords.y;
    let curChar = grid[xCoord] ? grid[xCoord][yCoord] : null;
    if (!curChar) return;
    while (curChar) {
        steps.push(curChar);
        grid[xCoord][yCoord] = null;
        curChar = grid[xCoord + 1] && grid[xCoord + 1].some(Boolean) ? grid[++xCoord][yCoord] : null;
    }
    coords.x = xCoord;
    coords.y = yCoord;
}

const left = (grid, coords, steps, firstStep) => {
    let xCoord = firstStep ? 0 : coords.x
    let yCoord = firstStep ? grid[0].length - 1 : coords.y - 1;
    let curChar = grid[xCoord][yCoord] ? grid[xCoord][yCoord] : null;
    if (!curChar) return;
    while (curChar) {
        steps.push(curChar);
        grid[xCoord][yCoord] = null;
        curChar = grid[xCoord][yCoord - 1] ? grid[xCoord][--yCoord] : null;
    }
    coords.x = xCoord;
    coords.y = yCoord;
}

const up = (grid, coords, steps) => {
    let xCoord = coords.x - 1
    let yCoord = coords.y;
    let curChar = grid[xCoord] ? grid[xCoord][yCoord] : null;
    if (!curChar) return;
    while (curChar) {
        steps.push(curChar);
        grid[xCoord][yCoord] = null;
        curChar = grid[xCoord - 1] && grid[xCoord - 1].some(Boolean) ? grid[--xCoord][yCoord] : null;
    }
    coords.x = xCoord;
    coords.y = yCoord;
}

const right = (grid, coords, steps) => {
    let xCoord = coords.x;
    let yCoord = coords.y + 1;
    let curChar = grid[xCoord][yCoord] ? grid[xCoord][yCoord] : null;
    if (!curChar) return;
    while (curChar) {
        steps.push(curChar);
        grid[xCoord][yCoord] = null;
        curChar = grid[xCoord][yCoord + 1] ? grid[xCoord][++yCoord] : null;
    }
    coords.x = xCoord;
    coords.y = yCoord;
}

const isEmpty = g => !g.some(row => row.some(Boolean));

const clockwise = (x, y, message) => {
    const grid = setBoard(x, y, message);
    const coords = { x: 0, y: 0 };
    const steps = [];

    down(grid, coords, steps, true);
    left(grid, coords, steps, true);
    while(true) {
        up(grid, coords, steps);
        if (isEmpty(grid)) break;
        right(grid, coords, steps);
        if (isEmpty(grid)) break;
        down(grid, coords, steps);
        if (isEmpty(grid)) break;
        left(grid, coords, steps);
        if (isEmpty(grid)) break;
    }

    return steps.join('');
}

const counterClockwise = (x, y, message) => {
    const grid = setBoard(x, y, message);
    const coords = { x: 0, y: 0 };
    const steps = [];

    left(grid, coords, steps, true);
    down(grid, coords, steps, true);
    while(true) {
        right(grid, coords, steps);
        if (isEmpty(grid)) break;
        up(grid, coords, steps);
        if (isEmpty(grid)) break;
        left(grid, coords, steps);
        if (isEmpty(grid)) break;
        down(grid, coords, steps);
        if (isEmpty(grid)) break;
    }

    return(steps.join(''));
}

const testIt = () => {
    [
        {
            message: "WE ARE DISCOVERED. FLEE AT ONCE",
            expected: 'CEXXECNOTAEOWEAREDISLFDEREV',
            width: 9,
            height: 3,
            fn: clockwise
        },
        {
            message: "why is this professor so boring omg",
            expected: 'TSIYHWHFSNGOMGXIRORPSIEOBOROSS',
            width: 6,
            height: 5,
            fn: counterClockwise
        },
        {
            message: "Solving challenges on r/dailyprogrammer is so much fun!!",
            expected: 'CGNIVLOSHSYMUCHFUNXXMMLEGNELLAOPERISSOAIADRNROGR',
            width: 8,
            height: 6,
            fn: counterClockwise
        },
        {
            message: "For lunch let's have peanut-butter and bologna sandwiches",
            expected: 'LHSENURBGAISEHCNNOATUPHLUFORCTVABEDOSWDALNTTEAEN',
            width: 4,
            height: 12,
            fn: clockwise
        },
        {
            message: "I've even witnessed a grown man satisfy a camel",
            expected: 'IGAMXXXXXXXLETRTIVEEVENWASACAYFSIONESSEDNAMNW',
            width: 9, 
            height: 5,
            fn: clockwise
        },
        {
            message: "Why does it say paper jam when there is no paper jam?",
            expected: 'YHWDSSPEAHTRSPEAMXJPOIENWJPYTEOIAARMEHENAR',
            width: 3,
            height: 14,
            fn: counterClockwise
        }
    ].forEach(({ expected, width, height, message, fn }) => {
        let actual = fn(width, height, message);
        if (actual === expected) {
            console.log(chalk.hex('#bada55').bold.bgHex('#222222')(`Passed ${fn.name} case for '${message}'`));
            console.log(chalk.white('>') + chalk.white.inverse(actual) + '\n');
        } else {
            console.log(chalk.red.bold.bgHex('#222222')(`FAILED case for ${fn.name} - '${message}'`));
            console.log(`Wanted: ${expected}`);
            console.log(`Got: ${actual}`);
        }
    })
}

testIt();
