interface MinPair {
	firstMin: number;
	secondMin: number;
}

interface MaxPair {
	firstMax: number;
	secondMax: number;
}

const input = (await Deno.readTextFile('./input.txt')).split('\n');
const pairs = input.map((line) => line.split(','));

const sumOfContainedPairs = pairs.reduce((acc, curr) => {
	if (curr.length === 2) {
		const [first, second] = curr;
		const [firstMin, firstMax] = first.split('-').map((num) => parseInt(num));
		const [secondMin, secondMax] = second.split('-').map((num) => parseInt(num));
		const min = { firstMin, secondMin };
		const max = { firstMax, secondMax };
		acc += comparePairs(min, max);
	}

	return acc;
}, 0);

const sumOfOverlappingPairs = pairs.reduce((acc, curr) => {
	if (curr.length === 2) {
		const [first, second] = curr;
		const [firstMin, firstMax] = first.split('-').map((num) => parseInt(num));
		const [secondMin, secondMax] = second.split('-').map((num) => parseInt(num));
		const firstRange = range(firstMin, firstMax);
		const secondRange = range(secondMin, secondMax);
		acc += compareRanges(firstRange, secondRange);
	}

	return acc;
}, 0);

console.log({ sumOfContainedPairs });
console.log({ sumOfOverlappingPairs });

function comparePairs(min: MinPair, max: MaxPair): number {
	if (min.firstMin >= min.secondMin && max.firstMax <= max.secondMax) return 1;
	if (min.firstMin <= min.secondMin && max.firstMax >= max.secondMax) return 1;
	return 0;
}

function compareRanges(a: number[], b: number[]): number {
	const res = a.filter((num) => b.find((x) => x === num));

	if (res.length === 0) return 0;

	return 1;
}

function range(start: number, end: number) {
	const arr = [...Array(end).keys()].slice(start);
	arr.push(end);
	return arr;
}
