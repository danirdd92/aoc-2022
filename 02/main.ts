// lose 0, draw 3, win 6

const movesMap = {
	A: 'X', // Rock
	B: 'Y', // Paper
	C: 'Z', // Scissors
} as const;

type MovesMap = typeof movesMap;

const options = {
	X: 1,
	Y: 2,
	Z: 3,
} as const;

const intentMap = {
	X: 0,
	Y: 3,
	Z: 6,
} as const;

const input = (await Deno.readTextFile('./input.txt')).split('\n');
let score = 0;

for (const match of input) {
	const [opponent, you] = match.split(' ');
	//@ts-ignore
	const result = getMatchResult(opponent, you);
	score += result;
}

console.log('part 1: ', score);

score = 0;
for (const match of input) {
	const [opponent, intent] = match.split(' ');
	//@ts-ignore
	const result = getMatchIntentResult(opponent, intent);
	score += result;
}

console.log('part 2: ', score);
function getMatchResult(opponent: keyof MovesMap, you: 'X' | 'Y' | 'Z'): number {
	let matchOutcome = 0;
	const mv = movesMap[opponent];
	// draw -> 3
	if (mv === you) matchOutcome = 3;
	else if (you === 'X') {
		matchOutcome = mv === 'Y' ? 0 : 6;
	} else if (you === 'Y') {
		matchOutcome = mv === 'X' ? 6 : 0;
	} else if (you === 'Z') {
		matchOutcome = mv === 'X' ? 0 : 6;
	}
	const result = matchOutcome + options[you];
	return result;
}

function getMatchIntentResult(opponent: keyof MovesMap, intent: 'X' | 'Y' | 'Z'): number {
	let choiceValue = 0;
	const mv = movesMap[opponent];
	const intentMv = intentMap[intent];

	// rock 1, paper 2, scissors 3
	//  X         Y        Z

	switch (intentMv) {
		case 0: {
			choiceValue = mv === 'X' ? 3 : mv === 'Y' ? 1 : 2;
			break;
		}
		case 3: {
			choiceValue = options[mv];
			break;
		}
		case 6: {
			choiceValue = mv === 'X' ? 2 : mv === 'Y' ? 3 : 1;
			break;
		}
	}

	return choiceValue + intentMv;
}
