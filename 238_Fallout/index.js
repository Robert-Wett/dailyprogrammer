const fs = require('fs');
const term = require('terminal-kit').terminal;

class GameModel {
	constructor() {
		this.dict = {};
		this.difficultyMapping = {
			'Very Easy': {
				bounds: [4, 6],
				amount: 7,
				guesses: 6
			},
			'Easy': {
				bounds: [5, 8],
				amount: 7,
				guesses: 5
			},
			'Average': {
				bounds: [7, 10],
				amount: 10,
				guesses: 5
			},
			'Hard': {
				bounds: [10, 13],
				amount: 12,
				guesses: 4
			},
			'Very Hard': {
				bounds: [13, 15],
				amount: 15,
				guesses: 3
			}
		};

		this.numGuesses;
	}


	generateDictionary() {
		let d = require('./resources/bucketedDict');
		if (d) {
			return Promise.resolve(this.dict = d);
		}
		if (Object.keys(this.dict).length) {
			return Promise.resolve(this.dict);
		}

		return new Promise((resolve, reject) => {
			fs.readFile('./resources/enable1.txt', (err, data) => {
				if (err) {
					return reject(err);
				}
				return resolve(String(data).split('\n').map(t => t.trim()));
			});
		})
		.then(rawDict => {
			rawDict.forEach(word => {
				const len = word.length;
				if (len < 4 || len > 15) return;
				this.dict[len] = (this.dict[len] || []).concat([word]);
			});

			return Promise.resolve(this.dict);
		})

	}

	prepareGame(difficulty='Average') {
		return this.generateDictionary().then(d => {
			this.numGuesses = this.difficultyMapping[difficulty].guesses;
			let wordCount = this.difficultyMapping[difficulty].amount;
			let bank = [];
			for (let i = 0; i < wordCount; i++) {
				let wordBounds = getRandomArbitrary(
					this.difficultyMapping[difficulty].bounds[0],
					this.difficultyMapping[difficulty].bounds[1]
				);
				bank.push(d[wordBounds][getRandomInt(d[wordBounds].length)])
			}
			return Promise.resolve({ bank, targetWord: bank[getRandomInt(bank.length)] });
		});
	}
}

let game = new GameModel();

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function getScore(word, target) {
	let max = Math.min(word.length, target.length),
		score = 0;
	for (let i = 0; i < max; i++) {
		if (word[i] === target[i]) score+= 1;
	}
	return score;
}

let guessedWords = [];
let numGuesses = {
	'Very Easy': 6,
	'Easy': 5,
	'Average': 5,
	'Hard': 4,
	'Very Hard': 3
}
const setChoices = (wordBank, targetWord) => {
	term.clear();
	if (game.numGuesses === 0) {
		term.clear();
		term.drawImage('./resources/gameOver.jpg',
			{
				shrink: {
					width: term.width,
					height: term.height
				}
			},
			(e) => {

			});
		term.bold.red.blink('EVERYONE IS DEAD\n\n');
		return;
	}
	if (guessedWords.length) {
		var spew = require('util').inspect;
		term.bold.white("Incorrect Guesses:\n");
		guessedWords.forEach(w => {
			let score = getScore(w[0], targetWord);
			term.red(w+': ' + score +'\n');
		});
	}
	term.bold.green(`\n\nYou Have ${game.numGuesses} Guesses Left\n`)
	term.bold.green(`-------------------------------\n`)
	term.singleColumnMenu(wordBank, (err, res) => {
		if (res.selectedText.toLowerCase() === targetWord.toLowerCase()) {
			term.clear();
			term.bold.green.blink("YOU GOT IT PAL\n\n");
			term.drawImage('./resources/freeRealEstate.png',
				{
					shrink: {
						width: term.width * .9,
						height: term.height * .9,
					}
				},
				(e) => { }
			);
		} else {
			game.numGuesses--;
			guessedWords.push(wordBank.splice(wordBank.indexOf(res.selectedText), 1));
			setTimeout(() => {
				term.clear();
				setChoices(wordBank, targetWord);
			}, 200);
		}
	});
}

module.exports = GameModel;


term.clear();

term(` _____ _    _     _     ___  _   _ _____ 
|  ___/ \\  | |   | |   / _ \\| | | |_   _|
| |_ / _ \\ | |   | |  | | | | | | | | |  
|  _/ ___ \\| |___| |__| |_| | |_| | | |  
|_|/_/   \\_\\_____|_____\\___/ \\___/  |_|  
                                         \n`);

term.cyan('Please choose a difficulty to continue:');
term.grabInput({ mouse: 'button' }) ;

term.on('key', function (name, matches, data) {
	// Detect CTRL-C and exit 'manually'
	if (name === 'CTRL_C' || name === 'q') {
		term.clear();
		term.grabInput(false);
		process.exit();
	}
});

term.singleColumnMenu(Object.keys(game.difficultyMapping), (err, response) => {
	term('\n').eraseLineAfter.green('Starting game with difficulty: ' + response.selectedText);
	game.prepareGame(response.selectedText).then(g => {
		setChoices(g.bank, g.targetWord);
	});
})