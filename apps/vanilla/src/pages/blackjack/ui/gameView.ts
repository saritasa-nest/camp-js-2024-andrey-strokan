import { ObserversRegistrar } from '../observer/observersRegistrar';
import { Notifier } from '../observer/notifier';

import { getElementBySelector } from '../extensions/documentExtensions';

import { PassButtonClickedEventData } from './events/passButtonClickedEventData';
import { ThrowButtonClickedEventData } from './events/throwButtonClickedEventData';

/** Game view. */
export class GameView {

	private throwButtonClickedEventNotifier =
		new Notifier<ThrowButtonClickedEventData>();

	private passButtonClickedEventNotifier =
		new Notifier<PassButtonClickedEventData>();

	/** ObserversRegistrar of throwButtonClickedEventNotifier. */
	public readonly throwButtonClickedEventObserverRegistrar:
	ObserversRegistrar<ThrowButtonClickedEventData> = this.throwButtonClickedEventNotifier;

	/** ObserversRegistrar of passButtonClickedEventNotifier. */
	public readonly passButtonClickedEventObserverRegistrar:
	ObserversRegistrar<PassButtonClickedEventData> = this.passButtonClickedEventNotifier;

	public constructor() {
		const throwDiceButtonElement = getElementBySelector(document, '.throw-dice');
		throwDiceButtonElement.addEventListener('click', () => {
			this.throwButtonClickedEventNotifier.notify(new ThrowButtonClickedEventData());
		});

		const passButtonElement = getElementBySelector(document, '.pass');
		passButtonElement.addEventListener('click', () => {
			this.passButtonClickedEventNotifier.notify(new PassButtonClickedEventData());
		});
	}

	/** Finish game. */
	public finishGame(): void {
		const throwDiceButtonElement = getElementBySelector<HTMLButtonElement>(document, '.throw-dice');
		throwDiceButtonElement.disabled = true;

		const passButtonElement = getElementBySelector<HTMLButtonElement>(document, '.pass');
		passButtonElement.disabled = true;
	}
}
