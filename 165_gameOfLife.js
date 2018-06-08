let input = `100 17 17
.................
.................
....###...###....
.................
..#....#.#....#..
..#....#.#....#..
..#....#.#....#..
....###...###....
.................
....###...###....
..#....#.#....#..
..#....#.#....#..
..#....#.#....#..
.................
....###...###....
.................
.................`;


class Cell {
    constructor(x, y, on=false) {
        this.x = x;
        this.y = y;
        this.on = on;
        this.nextState = false;
    }
}

class Grid {
    constructor() {
        this.grid = [];
        this.steps = 0;
        this.states = [];
    }

    tick() {
        // Run through and calculate what their next states will be without actually flipping them
        // so that we don't effect how our other cells are in this state of time.
        this.grid.forEach((row, rowIdx) => {
            row.forEach((cell, colIdx) =>{
                let aliveNeighbors = this.getNeighbors(rowIdx, colIdx).filter(cell => cell.on).length;
                if (!cell.on) {
                    cell.nextState = aliveNeighbors === 3 ? true : false;
                    return;
                }

                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    cell.nextState = false;
                    return;
                }

                cell.nextState = cell.on;
            }); 
        });

        // Once they are all calculated we can set them
        this.grid.forEach(row => row.forEach(cell => cell.on = cell.nextState));
    }

    run(stepCount) {
        this.storeCurrentState();
        for (let i = 0; i < this.steps; i++) {
            this.tick();
            this.storeCurrentState();
        }

        let counter = 0;
        let endTimer = setInterval(() => {
            console.log(this.states[counter++]);
            console.log('\n');
            if (counter === this.states.length) {
                clearInterval(endTimer);
            }
        }, 200);
    }


	getNeighbors(x, y) {
		let neighbors = [];
		let xIdx, yIdx;

		// North
		xIdx = x === 0 ? this.grid.length - 1 : x - 1;
		this.grid[xIdx][y].on && neighbors.push(this.grid[xIdx][y]);

		// North East
		xIdx = x === 0 ? this.grid.length - 1 : x - 1;
		yIdx = y + 1 === this.grid[0].length ? 0 : y + 1;
		this.grid[xIdx][yIdx].on && neighbors.push(this.grid[xIdx][yIdx]);

		// East
		yIdx = y + 1 === this.grid[0].length ? 0 : y + 1;
		this.grid[x][yIdx].on && neighbors.push(this.grid[x][yIdx]);

		// South East
		xIdx = x + 1 === this.grid.length ? 0 : x + 1;
		yIdx = y + 1 === this.grid[0].length ? 0 : y + 1;
		this.grid[xIdx][yIdx].on && neighbors.push(this.grid[xIdx][yIdx]);

		// South
		xIdx = x === this.grid.length - 1 ? 0 : x + 1;
		this.grid[xIdx][y].on && neighbors.push(this.grid[xIdx][y]);

		// South West
		xIdx = x + 1 === this.grid.length ? 0 : x + 1;
		yIdx = y - 1 < 0 ? this.grid[0].length - 1 : y - 1;
		this.grid[xIdx][yIdx].on && neighbors.push(this.grid[xIdx][yIdx]);

		// West
		yIdx = y - 1 < 0 ? this.grid[0].length - 1 : y - 1;
		this.grid[x][yIdx].on && neighbors.push(this.grid[x][yIdx]);

		// North West
		xIdx = x - 1 < 0 ? this.grid.length - 1 : x - 1;
		yIdx = y - 1 < 0 ? this.grid[0].length - 1 : y - 1;
		this.grid[xIdx][yIdx].on && neighbors.push(this.grid[xIdx][yIdx]);

		return neighbors;
	}

	buildFromBoard(input) {
		let grid = input.split('\n'),
			[steps, x, y] = grid.shift().split(' ');
		this.steps = steps;


		let newGrid = [];
		grid.forEach((row, rowIdx) => {
			let newRow = [];
			row.split('').forEach((cell, cellIdx) => {
				newRow.push(new Cell(rowIdx, cellIdx, cell === '#'))
			});

			newGrid.push(newRow);
		});

		this.grid = newGrid;
	}

	storeCurrentState() {
		this.states.push(
			this.grid.map(row => {
				return row.map(c => c.on ? '#' : '.').join('');
			})
		)
	}

	print() {
		this.grid.map(row => {
			console.log(row.map(c => c.on ? '#' : '.').join(''));
		});
		console.log('\n')
	}
}

let g = new Grid();
g.buildFromBoard(input);
g.run();
