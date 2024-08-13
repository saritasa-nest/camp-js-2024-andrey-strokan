namespace Game {

	/**  Called when Dice thrown. */
	export class DiceThrownEventData extends ObserverCore.BaseEventData {

		/**  @inheritdoc */
		public override eventName: 'DiceThrown' = 'DiceThrown';

		/** Dice value. */
		public readonly diceValue: number;

		public constructor(diceValue: number) {
			super();
			this.diceValue = diceValue;
		}
	}
}
