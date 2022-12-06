const input = Deno.readTextFileSync('./input.txt');

type Marker = {
	message: 14;
	packet: 4;
};

function findMarker(input: string, type: keyof Marker) {
	const size = type === 'message' ? 14 : 4;

	for (let i = 0; i < input.length - size; i++) {
		const slice = new Set([...input.slice(i, i + size)]);

		if (Array.from(slice).length === size) return i + size;
	}
	return -1;
}

const partOne = findMarker(input, 'packet');
const partTwo = findMarker(input, 'message');

console.log({ partOne });
console.log({ partTwo });
