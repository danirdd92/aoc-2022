import intersection from 'https://deno.land/x/denodash@0.1.3/src/array/intersection.ts';
const input = (await Deno.readTextFile('./input.txt')).split('\n');

function isLowerCase(char: string): boolean {
	return char === char.toLocaleLowerCase();
}

function convertCharToPriority(char: string): number {
	if (isLowerCase(char)) {
		return char.charCodeAt(0) - 96;
	} else {
		return char.charCodeAt(0) - 38;
	}
}

function getPartOneAnswer() {
	const common = [];

	for (const rucksack of input) {
		const middle = rucksack.length / 2;
		const compart1 = [...rucksack.substring(0, middle)];
		const compart2 = [...rucksack.substring(middle)];

		const intersection = compart1.find((x) => compart2.includes(x));
		common.push(intersection);
	}

	const partA = common.reduce((acc, curr) => {
		if (curr) {
			acc += convertCharToPriority(curr);
		}
		return acc;
	}, 0);

	console.log({ partA });
}

function getPartTwoAnswer() {
	let group: string[] = [];
	const partB = input
		.reduce((acc: string[][], curr, indx) => {
			if ((indx + 1) % 3 === 0) {
				group.push(curr);
				acc.push(group);
				group = [];
			} else {
				group.push(curr);
			}

			return acc;
		}, [])
		.map((group) => {
			let output;

			if (group.length === 3) {
				const [a, b, c] = [...group];
				output = new Set(intersection<string>([...a], [...b], [...c]));
			}
			return output;
		})
		.reduce((acc, curr) => {
			if (curr) {
				const char = [...curr.values()][0];
				acc += convertCharToPriority(char);
			}
			return acc;
		}, 0);

	console.log({ partB });
}
getPartOneAnswer();
getPartTwoAnswer();
