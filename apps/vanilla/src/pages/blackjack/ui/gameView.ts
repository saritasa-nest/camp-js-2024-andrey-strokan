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
			const throwDiceButtonElement = document.getElementById('throw-dice');
			if (throwDiceButtonElement) {
				throwDiceButtonElement.addEventListener('click', () => {
					this.throwButtonClickedEventNotifier.notify(new UI.ThrowButtonClickedEventData());
				});
			}

			const passButtonElement = document.getElementById('pass');
			if (passButtonElement) {
				passButtonElement.addEventListener('click', () => {
					this.passButtonClickedEventNotifier.notify(new UI.PassButtonClickedEventData());
				});
			}
		}

		/** Finish game. */
		public finishGame(): void {
			const throwDiceButtonElement = document.getElementById('throw-dice') as HTMLButtonElement;
			if (throwDiceButtonElement) {
				throwDiceButtonElement.disabled = true;
			}

			const passButtonElement = document.getElementById('pass') as HTMLButtonElement;
			if (passButtonElement) {
				passButtonElement.disabled = true;
			}

			const restartButtonElement = document.getElementById('restart') as HTMLButtonElement;
			if (restartButtonElement) {
				restartButtonElement.hidden = false;
			}
		}
	}
}
