/**
 * Get element by selector.
 * @param from ParentNode.
 * @param selector Selector.
 * @returns Element.
 */
export function getElementBySelector<E extends Element = Element>(from: ParentNode, selector: string): E {
	const element = from.querySelector(selector);

	if (element == null) {
		throw new Error(`${selector} not found.`);
	}

	return element as E;
}
