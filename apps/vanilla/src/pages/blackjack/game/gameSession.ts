import { Observer } from '../observer/observer';

import { PassButtonClickedEventData } from '../ui/events/passButtonClickedEventData';
import { GameView } from '../ui/gameView';

import { PlayerState } from './enums/playerState';
import { PlayerType } from './enums/playerType';

import { PlayerScoreUpdatedEventData } from './events/playerScoreUpdatedEventData';
import { PlayerWonEventData } from './events/playerWonEventData';

import { Dice } from './dice';
import { Player } from './player';

import { DebugInfo } from './debug/debugInfo';

/** Game session. */
export class GameSession implements Observer<PlayerScoreUpdatedEventData>,
Observer<PassButtonClickedEventData>,
Observer<PlayerWonEventData> {

	private readonly gameView: GameView;

	private readonly debugInfo: DebugInfo;

	private readonly players: readonly Player[];

	private readonly dice: Dice;

	private currentPlayerIndex: number;

	private isGameFinished = false;

	public constructor(players: readonly Player[]) {
		this.dice = new Dice(6);

		this.debugInfo = new DebugInfo();
		this.dice.observersRegistrar.attach(this.debugInfo);

		this.gameView = new GameView();
		this.gameView.throwButtonClickedEventObserverRegistrar.attach(this.dice);
		this.gameView.passButtonClickedEventObserverRegistrar.attach(this);

		this.players = players;
		this.currentPlayerIndex = 0;

		players.forEach(player => {
			player.playerWonEventObserversRegistrar.attach(this);
			this.players[this.currentPlayerIndex].setState(PlayerState.Waiting);
		});

		this.dice.observersRegistrar.attach(this.players[this.currentPlayerIndex]);
		this.players[this.currentPlayerIndex].playerScoreUpdatedEventObserversRegistrar.attach(this);
		this.players[this.currentPlayerIndex].setState(PlayerState.MakesAMove);

		if (this.players[this.currentPlayerIndex].playerType === PlayerType.Computer) {
			this.dice.throw();
		}
	}

	/** @inheritdoc */
	public update(message: PlayerScoreUpdatedEventData |
	PassButtonClickedEventData |
	PlayerWonEventData): void {

		if (this.isGameFinished) {
			return;
		}

		if (message instanceof PlayerWonEventData) {
			this.finishGame();
			return;
		}

		this.next();
	}

	private finishGame(): void {
		this.gameView.finishGame();
		this.isGameFinished = true;

		this.players[this.currentPlayerIndex].playerScoreUpdatedEventObserversRegistrar.detach(this);
		this.dice.observersRegistrar.detach(this.players[this.currentPlayerIndex]);
	}

	private next(): void {
		if (this.isGameFinished) {
			return;
		}

		this.players[this.currentPlayerIndex].setState(PlayerState.Waiting);
		this.players[this.currentPlayerIndex].playerScoreUpdatedEventObserversRegistrar.detach(this);
		this.dice.observersRegistrar.detach(this.players[this.currentPlayerIndex]);

		this.currentPlayerIndex++;
		if (this.currentPlayerIndex === this.players.length) {
			this.currentPlayerIndex = 0;
		}

		this.dice.observersRegistrar.attach(this.players[this.currentPlayerIndex]);
		this.players[this.currentPlayerIndex].playerScoreUpdatedEventObserversRegistrar.attach(this);
		this.players[this.currentPlayerIndex].setState(PlayerState.MakesAMove);

		if (this.players[this.currentPlayerIndex].playerType === PlayerType.Computer) {
			this.dice.throw();
		}
	}
}
