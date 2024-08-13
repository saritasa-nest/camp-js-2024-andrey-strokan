namespace UI {

	/** Game view. */
	export class GameView {

		private throwButtonClickedEventNotifier =
			new ObserverCore.Notifier<UI.ThrowButtonClickedEventData>();

		private passButtonClickedEventNotifier =
			new ObserverCore.Notifier<UI.PassButtonClickedEventData>();

		/** ObserversRegistrar of throwButtonClickedEventNotifier. */
		public readonly throwButtonClickedEventObserverRegistrar:
		ObserverCore.ObserversRegistrar<UI.ThrowButtonClickedEventData> = this.throwButtonClickedEventNotifier;

		/** ObserversRegistrar of passButtonClickedEventNotifier. */
		public readonly passButtonClickedEventObserverRegistrar:
		ObserverCore.ObserversRegistrar<UI.PassButtonClickedEventData> = this.passButtonClickedEventNotifier;

		public constructor() {
			const throwDiceButtonElement = document.getElementBySelector('.throw-dice');
			throwDiceButtonElement.addEventListener('click', () => {
				this.throwButtonClickedEventNotifier.notify(new UI.ThrowButtonClickedEventData());
			});

			const passButtonElement = document.getElementBySelector('.pass');
			passButtonElement.addEventListener('click', () => {
				this.passButtonClickedEventNotifier.notify(new UI.PassButtonClickedEventData());
			});
		}

		/** Finish game. */
		public finishGame(): void {
			const throwDiceButtonElement = document.getElementBySelector<HTMLButtonElement>('throw-dice');
			throwDiceButtonElement.disabled = true;

			const passButtonElement = document.getElementBySelector<HTMLButtonElement>('.pass');
			passButtonElement.disabled = true;
		}
	}
}
