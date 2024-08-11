namespace Game {

	/**
	 * Called when Player won.
	 */
	export class PlayerWonEventData extends ObserverCore.BaseEventData {

		/**
		 * @inheritdoc
		 */
		public override eventName: 'PlayerWon' = 'PlayerWon';
	}
}
