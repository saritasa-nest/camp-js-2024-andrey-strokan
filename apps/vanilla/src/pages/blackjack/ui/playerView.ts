namespace UI {

	/** Player view. */
	export class PlayerView {

		private readonly playerId: string;

		private constructor(playerId: string) {
			this.playerId = playerId;
		}

		/**
		 * Create player view.
		 * @param playerName Player name.
		 * @param playerType Player type.
		 */
		public static async create(playerName: string, playerType: Game.PlayerType): Promise<PlayerView> {
			const finalPlayerName = (playerType === Game.PlayerType.Computer) ? `${playerName} (computer)` : playerName;

			const playerId = finalPlayerName.replaceAll(/[ ().]/g, '_');

			const playerView = new PlayerView(playerId);
			await playerView.createPlayer(finalPlayerName, playerId);
			return playerView;
		}

		/**
		 * Update player's score on html page.
		 * @param newScore Update Score.
		 * @returns Void.
		 */
		public updateScore(newScore: number): void {
			const playerScoreElement = document.getElementBySelector(`#${this.playerId}.player__current-score`);
			playerScoreElement.textContent = newScore.toString();
		}

		/**
		 * Add dice value to the history.
		 * @param diceValue Dice value.
		 */
		public addDiceValueToHistory(diceValue: number): void {
			const newElement = document.createElement('p');
			newElement.textContent = diceValue.toString();
			newElement.classList.add('player__dice-value');

			const historyOfDiceValuesElement = document.getElementBySelector(`#${this.playerId}.player__history-of-dice-values`);
			historyOfDiceValuesElement.appendChild(newElement);
		}

		/**
		 * Set state.
		 * @param newState New state.
		 * @returns Void.
		 */
		public setState(newState: Game.PlayerState): void {
			const playerElement = document.getElementBySelector(`#${this.playerId}.player`);

			playerElement.classList.remove(Game.PlayerState.Winner);
			playerElement.classList.remove(Game.PlayerState.MakesAMove);
			playerElement.classList.remove(Game.PlayerState.Waiting);

			switch (newState) {
				case Game.PlayerState.Waiting:
					playerElement.classList.add(Game.PlayerState.Waiting);
					break;
				case Game.PlayerState.MakesAMove:
					playerElement.classList.add(Game.PlayerState.MakesAMove);
					break;
				case Game.PlayerState.Winner:
					playerElement.classList.add(Game.PlayerState.Winner);
					break;
				default: throw new Error('Not implemented.');
			}
		}

		private async createPlayer(playerName: string, playerId: string): Promise<void> {
			try {
				const response = await fetch('./ui/player.html');

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.text();

				const tempDiv = document.createElement('div');
				tempDiv.innerHTML = data;

				const templateElement = tempDiv.getElementBySelector<HTMLTemplateElement>('#player-template');

				const templateContent = templateElement.content;
				const playerNameElement = templateContent.getElementBySelector('.player__name');
				playerNameElement.textContent = playerName;

				// Current player.
				const playerElement = templateContent.getElementBySelector('.player');
				playerElement.id = playerId;

				// Current score.
				const playerCurrentScoreElement = templateContent.getElementBySelector('.player__current-score');
				playerCurrentScoreElement.id = playerId;

				// History of dice values.
				const playerHistoryOfDiceValuesElement = templateContent.getElementBySelector('.player__history-of-dice-values');
				playerHistoryOfDiceValuesElement.id = playerId;

				const contentDiv = document.getElementsByClassName('players')[0];
				if (contentDiv) {
					contentDiv.appendChild(document.importNode(templateContent, true));
				} else {
					console.error('Element with id="content" not found in document.');
				}
			} catch (error) {
				console.error('Error loading template:', error);
			}
		}
	}
}
