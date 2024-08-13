// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-unused-vars
interface ParentNode {

	/** Get element by selector. */
	getElementBySelector<E extends Element = Element>(selector: string): E;
}

Element.prototype.getElementBySelector = function<E extends Element = Element>(selector: string): E {
	const element = this.querySelector(selector);

	if (!element) {
		throw new Error(`${selector} not found.`);
	}

	return element as E;
};

Document.prototype.getElementBySelector = Element.prototype.getElementBySelector;
DocumentFragment.prototype.getElementBySelector = Element.prototype.getElementBySelector;
