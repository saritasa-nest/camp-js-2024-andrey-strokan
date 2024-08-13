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
		const throwDiceButtonElement = document.getElementBySelector('.throw-dice');
		throwDiceButtonElement.addEventListener('click', () => {
			this.throwButtonClickedEventNotifier.notify(new ThrowButtonClickedEventData());
		});

		const passButtonElement = document.getElementBySelector('.pass');
		passButtonElement.addEventListener('click', () => {
			this.passButtonClickedEventNotifier.notify(new PassButtonClickedEventData());
		});
	}

	/** Finish game. */
	public finishGame(): void {
		const throwDiceButtonElement = document.getElementBySelector<HTMLButtonElement>('.throw-dice');
		throwDiceButtonElement.disabled = true;

		const passButtonElement = document.getElementBySelector<HTMLButtonElement>('.pass');
		passButtonElement.disabled = true;
	}
}
