import { Observer } from '../observer/observer';
import { Notifier } from '../observer/notifier';
import { ObserversRegistrar } from '../observer/observersRegistrar';

import { PlayerView } from '../ui/playerView';

import { PlayerType } from './enums/playerType';
import { PlayerState } from './enums/playerState';

import { DiceThrownEventData } from './events/diceThrownEventData';
import { PlayerScoreUpdatedEventData } from './events/playerScoreUpdatedEventData';
import { PlayerWonEventData } from './events/playerWonEventData';

/** Player. */
export class Player implements Observer<DiceThrownEventData> {

	private readonly view: PlayerView;

	private readonly scoreToWin = 21;

	private currentScore: number;

	private readonly playerScoreUpdatedEventNotifier = new Notifier<PlayerScoreUpdatedEventData>();

	private readonly playerWonEventNotifier = new Notifier<PlayerWonEventData>();

	/** Observer registrar of playerScoreUpdatedEvent. */
	public playerScoreUpdatedEventObserversRegistrar: ObserversRegistrar<PlayerScoreUpdatedEventData> =
		this.playerScoreUpdatedEventNotifier;

	/** Observer registrar of playerWonEvent. */
	public playerWonEventObserversRegistrar: ObserversRegistrar<PlayerWonEventData> =
		this.playerWonEventNotifier;

	/** Player type. */
	public readonly playerType: PlayerType;

	private constructor(view: PlayerView, playerType: PlayerType) {
		this.view = view;
		this.currentScore = 0;
		this.view.updateScore(this.currentScore);
		this.playerType = playerType;
	}

	/** @inheritdoc */
	public update(message: DiceThrownEventData): void {
		this.addScore(message.diceValue);

		if (this.currentScore >= this.scoreToWin) {
			this.view.setState(PlayerState.Winner);
			this.playerWonEventNotifier.notify(new PlayerWonEventData());
		}

		this.playerScoreUpdatedEventNotifier.notify(new PlayerScoreUpdatedEventData());
	}

	/**
	 * Set state.
	 * @param newState New State.
	 */
	public setState(newState: PlayerState): void {
		this.view.setState(newState);
	}

	/**
	 * Create player.
	 * @param playerName Player name.
	 * @param playerType Player type.
	 */
	public static async create(playerName: string, playerType: PlayerType): Promise<Player> {
		const view = await PlayerView.create(playerName, playerType);
		const player = new Player(view, playerType);
		return player;
	}

	private addScore(score: number): void {
		this.currentScore += score;
		this.view.updateScore(this.currentScore);

		this.view.addDiceValueToHistory(score);
	}
}
