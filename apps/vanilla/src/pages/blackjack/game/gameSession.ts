namespace Game {

	/**
	 * Game session.
	 */
	export class GameSession implements ObserverCore.Observer<PlayerScoreUpdatedEventData>,
	ObserverCore.Observer<UI.PassButtonClickedEventData>,
	ObserverCore.Observer<Game.PlayerWonEventData> {

		private readonly gameView: UI.GameView;

		private readonly players: Player[];

		private readonly dice: Dice;

		private currentPlayerIndex: number;

		private isGameFinished = false;

		public constructor(players: Player[]) {
			this.dice = new Game.Dice(6);

			this.gameView = new UI.GameView();
			this.gameView.throwButtonClickedEventObserverRegistrar.attach(this.dice);
			this.gameView.passButtonClickedEventObserverRegistrar.attach(this);

			this.players = players;
			this.currentPlayerIndex = 0;

			players.forEach(player => {
				player.playerWonEventObserversRegistrar.attach(this);
				this.players[this.currentPlayerIndex].setState(Game.PlayerState.Waiting);
			});

			this.dice.observersRegistrar.attach(this.players[this.currentPlayerIndex]);
			this.players[this.currentPlayerIndex].playerScoreUpdatedEventObserversRegistrar.attach(this);
			this.players[this.currentPlayerIndex].setState(Game.PlayerState.MakesAMove);

			if (this.players[this.currentPlayerIndex].playerType === Game.PlayerType.Computer) {
				this.dice.throw();
			}
		}

		/**
		 * @inheritdoc
		 */
		public update(message: Game.PlayerScoreUpdatedEventData |
		UI.PassButtonClickedEventData |
		Game.PlayerWonEventData): void {

			if (this.isGameFinished) {
				return;
			}

			if (message instanceof Game.PlayerWonEventData) {
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

			this.players[this.currentPlayerIndex].setState(Game.PlayerState.Waiting);
			this.players[this.currentPlayerIndex].playerScoreUpdatedEventObserversRegistrar.detach(this);
			this.dice.observersRegistrar.detach(this.players[this.currentPlayerIndex]);

			this.currentPlayerIndex++;
			if (this.currentPlayerIndex === this.players.length) {
				this.currentPlayerIndex = 0;
			}

			this.dice.observersRegistrar.attach(this.players[this.currentPlayerIndex]);
			this.players[this.currentPlayerIndex].playerScoreUpdatedEventObserversRegistrar.attach(this);
			this.players[this.currentPlayerIndex].setState(Game.PlayerState.MakesAMove);

			if (this.players[this.currentPlayerIndex].playerType === Game.PlayerType.Computer) {
				this.dice.throw();
			}
		}
	}
}
