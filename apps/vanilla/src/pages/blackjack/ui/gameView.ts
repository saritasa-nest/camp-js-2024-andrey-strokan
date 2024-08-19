import { ObserversRegistrar } from '../observer/observersRegistrar';
import { Notifier } from '../observer/notifier';

import { getElementBySelector } from '../utils/documentUtils';

import { PassButtonClickedEventData } from './events/passButtonClickedEventData';
import { RollButtonClickedEventData } from './events/rollButtonClickedEventData';

/** Game view. */
export class GameView {

	private rollButtonClickedEventNotifier =
		new Notifier<RollButtonClickedEventData>();

	private passButtonClickedEventNotifier =
		new Notifier<PassButtonClickedEventData>();

	/** ObserversRegistrar of rollButtonClickedEventNotifier. */
	public readonly rollButtonClickedEventObserverRegistrar:
	ObserversRegistrar<RollButtonClickedEventData> = this.rollButtonClickedEventNotifier;

	/** ObserversRegistrar of passButtonClickedEventNotifier. */
	public readonly passButtonClickedEventObserverRegistrar:
	ObserversRegistrar<PassButtonClickedEventData> = this.passButtonClickedEventNotifier;

	public constructor() {
		const rollDiceButtonElement = getElementBySelector(document, '.roll-dice');
		rollDiceButtonElement.addEventListener('click', () => {
			this.rollButtonClickedEventNotifier.notify(new RollButtonClickedEventData());
		});

		const passButtonElement = getElementBySelector(document, '.pass');
		passButtonElement.addEventListener('click', () => {
			this.passButtonClickedEventNotifier.notify(new PassButtonClickedEventData());
		});
	}

	/** Finish game. */
	public finishGame(): void {
		const rollDiceButtonElement = getElementBySelector<HTMLButtonElement>(document, '.roll-dice');
		rollDiceButtonElement.disabled = true;

		const passButtonElement = getElementBySelector<HTMLButtonElement>(document, '.pass');
		passButtonElement.disabled = true;
	}
}
