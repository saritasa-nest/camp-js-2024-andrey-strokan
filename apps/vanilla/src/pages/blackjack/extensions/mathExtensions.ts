/**
 * Return random value from range [minValue, maxValue].
 * @param minValue Min value.
 * @param maxValue Max value.
 * @returns Random value.
 */
export function randomRange(minValue: number, maxValue: number): number {
	const minCeiled = Math.ceil(minValue);
	const maxFloored = Math.floor(maxValue);
	const result = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
	return result;
}
