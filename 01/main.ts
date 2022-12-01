interface ElfMap {
	[key: string]: number;
}

let index = 1;
let sum = 0;

const input = (await Deno.readTextFile('./input.txt')).split('\n').reduce((acc: ElfMap, curr) => {
	if (curr) {
		sum += parseInt(curr);
	} else {
		acc[index] = sum;
		index++;
		sum = 0;
	}
	return acc;
}, {});

const sortedCalories = Object.values(input).toSorted((a, b) => b - a);
const mostCalories = sortedCalories[0];

const topThreeMostCalories = sortedCalories.slice(0, 3).reduce((acc, curr) => {
	acc += curr;
	return acc;
}, 0);

console.log({ mostCalories });
console.log({ topThreeMostCalories });
