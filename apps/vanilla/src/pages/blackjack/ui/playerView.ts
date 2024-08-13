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
			const selector = `#${this.playerId}.player__current-score`;
			const playerScoreElement = document.querySelector(selector);

			if (!playerScoreElement) {
				return console.error(`${selector} not found.`);
			}

			playerScoreElement.textContent = newScore.toString();
		}

		/**
		 * Add dice value to the history.
		 * @param diceValue Dice value.
		 */
		public addDiceValueToHistory(diceValue: number): void {
			const selector = `#${this.playerId}.player__history-of-dice-values`;
			const historyOfDiceValuesElement = document.querySelector(selector);

			if (!historyOfDiceValuesElement) {
				return console.error(`${selector} not found.`);
			}

			const newElement = document.createElement('p');
			newElement.textContent = diceValue.toString();

			newElement.classList.add('player__dice-value');

			historyOfDiceValuesElement.appendChild(newElement);

		}

		/**
		 * Set state.
		 * @param newState New state.
		 * @returns Void.
		 */
		public setState(newState: Game.PlayerState): void {
			const selector = `#${this.playerId}.player`;
			const playerElement = document.querySelector(selector);

			if (!playerElement) {
				return console.error(`${selector} not found.`);
			}

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

				const templateElement = tempDiv.querySelector<HTMLTemplateElement>('#player-template');
				if (!templateElement) {
					throw new Error('Template with id="player-template" not found in loaded HTML.');
				}

				const templateContent = templateElement.content;
				const playerNameElement = templateContent.querySelector('.player__name');
				if (playerNameElement) {
					playerNameElement.textContent = playerName;
				} else {
					console.error('Element with class="player__name" not found in templateContent.');
				}

				// Current player.
				const playerElement = templateContent.querySelector('.player');

				if (playerElement) {
					playerElement.id = playerId;
				} else {
					console.error('Element with class="player" not found in templateContent.');
				}

				// Current score.
				const playerCurrentScoreElement = templateContent.querySelector('.player__current-score');

				if (playerCurrentScoreElement) {
					playerCurrentScoreElement.id = playerId;
				} else {
					console.error('Element with class="player__current-score" not found in templateContent.');
				}

				// History of dice values.
				const playerHistoryOfDiceValuesElement = templateContent.querySelector('.player__history-of-dice-values');

				if (playerHistoryOfDiceValuesElement) {
					playerHistoryOfDiceValuesElement.id = playerId;
				} else {
					console.error('Element with class="player__history-of-dice-values" not found in templateContent.');
				}

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
