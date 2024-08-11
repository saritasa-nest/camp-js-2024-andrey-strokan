namespace Game {

	/**
	 * Called when Player score updated.
	 */
	export class PlayerScoreUpdatedEventData extends ObserverCore.BaseEventData {

		/**
		 * @inheritdoc
		 */
		public override eventName: 'PlayerScoreUpdated' = 'PlayerScoreUpdated';
	}
}
