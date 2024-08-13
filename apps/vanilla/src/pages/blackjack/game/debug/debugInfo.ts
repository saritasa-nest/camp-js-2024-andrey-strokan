namespace Game.Debug {

	/**  Debug info. */
	export class DebugInfo implements ObserverCore.Observer<DiceThrownEventData> {

		private readonly view: UI.Debug.DebugInfoView;

		private currentScore: number;

		public constructor() {
			this.currentScore = 0;
			this.view = new UI.Debug.DebugInfoView();
			this.view.updateScore(this.currentScore);
		}

		/** @inheritdoc */
		public update(message: DiceThrownEventData): void {
			this.addScore(message.diceValue);
		}

		private addScore(score: number): void {
			this.currentScore += score;
			this.view.updateScore(this.currentScore);

			this.view.addDiceValueToHistory(score);
		}
	}
}
