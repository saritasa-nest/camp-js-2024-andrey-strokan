namespace UI.Debug {

	/** Debug info view. */
	export class DebugInfoView {

		/**
		 * Update player's score on html page.
		 * @param newScore Update Score.
		 * @returns Void.
		 */
		public updateScore(newScore: number): void {
			const playerScoreElement = document.getElementBySelector('.debug-info__current-score');
			playerScoreElement.textContent = newScore.toString();
		}

		/**
		 * Add dice value to the history.
		 * @param diceValue Dice value.
		 */
		public addDiceValueToHistory(diceValue: number): void {
			const historyOfDiceValuesElement = document.getElementBySelector('.debug-info__history-of-dice-values');

			const newElement = document.createElement('p');
			newElement.textContent = diceValue.toString();

			newElement.classList.add('debug-info__dice-value');

			historyOfDiceValuesElement.appendChild(newElement);

		}
	}
}
