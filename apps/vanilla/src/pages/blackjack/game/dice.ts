namespace Game {

	/** Game dice. */
	export class Dice implements ObserverCore.Observer<UI.ThrowButtonClickedEventData> {

		private readonly minValue: number = 1;

		private readonly maxValue: number;

		private readonly diceThrownEventNotifier = new ObserverCore.Notifier<Game.DiceThrownEventData>();

		/** @inheritdoc */
		public readonly observersRegistrar: ObserverCore.ObserversRegistrar<DiceThrownEventData> = this.diceThrownEventNotifier;

		public constructor(maxValue: number) {
			this.maxValue = maxValue;
		}

		/** Throw dice. */
		public throw(): void {
			const minCeiled = Math.ceil(this.minValue);
			const maxFloored = Math.floor(this.maxValue);
			const newDiceValue = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);

			this.diceThrownEventNotifier.notify(new Game.DiceThrownEventData(newDiceValue));
		}

		/** @inheritdoc */
		public update(): void {
			this.throw();
		}
	}
}
