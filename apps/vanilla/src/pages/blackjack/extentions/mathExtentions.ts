
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Math {

	/** Random random value from range. */
	randomRange(minValue: number, maxValue: number): number;
}

Math.randomRange = function(minValue: number, maxValue: number): number {
	const minCeiled = Math.ceil(minValue);
	const maxFloored = Math.floor(maxValue);
	const result = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
	return result;
};
