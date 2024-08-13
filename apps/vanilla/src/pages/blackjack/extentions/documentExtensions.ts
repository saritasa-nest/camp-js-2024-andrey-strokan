interface Document {

	/** Get element by selector. */
	getElementBySelector<E extends Element = Element>(selector: string): E;
}

Document.prototype.getElementBySelector = function<E extends Element = Element>(selector: string): E {
	const element = document.querySelector(selector);

	if (!element) {
		throw new Error(`${selector} not found.`);
	}

	return element as E;
};

interface DocumentFragment {

	/** Get HTMLTemplateElement by selector. */
	getElementBySelector<E extends Element = Element>(selector: string): E;
}

DocumentFragment.prototype.getElementBySelector = Document.prototype.getElementBySelector;

interface HTMLDivElement {

	/** Get HTMLTemplateElement by selector. */
	getElementBySelector<E extends Element = Element>(selector: string): E;
}

HTMLDivElement.prototype.getElementBySelector = Document.prototype.getElementBySelector;
