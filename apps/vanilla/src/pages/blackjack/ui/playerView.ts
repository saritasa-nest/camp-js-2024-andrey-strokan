import { PlayerType } from '../game/enums/playerType';
import { PlayerState } from '../game/enums/playerState';
import { getElementBySelector } from '../extensions/documentExtensions';

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
	public static async create(playerName: string, playerType: PlayerType): Promise<PlayerView> {
		const finalPlayerName = (playerType === PlayerType.Computer) ? `${playerName} (computer)` : playerName;

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
		const playerScoreElement = getElementBySelector(document, `#${this.playerId}.player__current-score`);
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

		const historyOfDiceValuesElement = getElementBySelector(document, `#${this.playerId}.player__history-of-dice-values`);
		historyOfDiceValuesElement.appendChild(newElement);
	}

	/**
	 * Set state.
	 * @param newState New state.
	 * @returns Void.
	 */
	public setState(newState: PlayerState): void {
		const playerElement = getElementBySelector(document, `#${this.playerId}.player`);

		playerElement.classList.remove(PlayerState.Winner);
		playerElement.classList.remove(PlayerState.MakesAMove);
		playerElement.classList.remove(PlayerState.Waiting);

		switch (newState) {
			case PlayerState.Waiting:
				playerElement.classList.add(PlayerState.Waiting);
				break;
			case PlayerState.MakesAMove:
				playerElement.classList.add(PlayerState.MakesAMove);
				break;
			case PlayerState.Winner:
				playerElement.classList.add(PlayerState.Winner);
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

			const templateElement = getElementBySelector<HTMLTemplateElement>(tempDiv, '#player-template');

			const templateContent = templateElement.content;
			const playerNameElement = getElementBySelector(templateContent, '.player__name');
			playerNameElement.textContent = playerName;

			// Current player.
			const playerElement = getElementBySelector(templateContent, '.player');
			playerElement.id = playerId;

			// Current score.
			const playerCurrentScoreElement = getElementBySelector(templateContent, '.player__current-score');
			playerCurrentScoreElement.id = playerId;

			// History of dice values.
			const playerHistoryOfDiceValuesElement = getElementBySelector(templateContent, '.player__history-of-dice-values');
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
