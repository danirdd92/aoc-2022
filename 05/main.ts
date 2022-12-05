interface StackMap {
	[key: number]: string[];
}

const input = Deno.readTextFileSync('./input.txt')
	.split('\n')
	.filter((line) => line.length !== 0);

const stacksIndex = input.findIndex((line) => line.includes('1'));
const instructionsIndex = input.findIndex((line) => line.includes('move'));

const stackLevels = input
	.slice(0, stacksIndex)
	.map((level) => Array.from(new Array(Math.ceil(level.length / 4)), (_, i) => level.slice(i * 4 + 1, i * 4 + 2))) // from top to buttom
	.reverse(); // reverse so array starts at buttom

const stackMap = stackLevels.reduce((acc: StackMap, curr) => {
	curr.forEach((val, index) => {
		if (acc[index + 1] && val !== ' ') {
			//  has key
			acc[index + 1] = [...acc[index + 1], val];
		} else if (!acc[index + 1] && val !== ' ') {
			// no key
			acc[index + 1] = [val];
		}
	});
	return acc;
}, {});

const instructions = input.slice(instructionsIndex).map((line) => {
	const [move, from, to] = line.match(/(\d+)/g) || [];
	return {
		move: Number(move),
		from: Number(from),
		to: Number(to),
	};
});

instructions.forEach(({ move, from, to }) => {
	applyInstructions(move, from, to, true);
});

function applyInstructions(move: number, from: number, to: number, newCrateMoverVer: boolean) {
	const slice = newCrateMoverVer ? stackMap[from].splice(-move) : stackMap[from].splice(-move).reverse();
	stackMap[to] = stackMap[to].concat(slice);
}

let answer1 = '';
const map = new Map(Object.entries(stackMap));
map.forEach((val) => {
	answer1 += val.at(-1);
});
console.log({ answer1 });
