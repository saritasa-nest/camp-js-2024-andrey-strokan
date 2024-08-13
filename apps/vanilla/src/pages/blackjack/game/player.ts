namespace Game {

	/** Player. */
	export class Player implements ObserverCore.Observer<DiceThrownEventData> {

		private readonly view: UI.PlayerView;

		private readonly scoreToWin = 21;

		private currentScore: number;

		private readonly playerScoreUpdatedEventNotifier = new ObserverCore.Notifier<PlayerScoreUpdatedEventData>();

		private readonly playerWonEventNotifier = new ObserverCore.Notifier<PlayerWonEventData>();

		/** Observer registrar of playerScoreUpdatedEvent. */
		public playerScoreUpdatedEventObserversRegistrar: ObserverCore.ObserversRegistrar<PlayerScoreUpdatedEventData> =
			this.playerScoreUpdatedEventNotifier;

		/** Observer registrar of playerWonEvent. */
		public playerWonEventObserversRegistrar: ObserverCore.ObserversRegistrar<PlayerWonEventData> =
			this.playerWonEventNotifier;

		/** Player type. */
		public readonly playerType: PlayerType;

		private constructor(view: UI.PlayerView, playerType: PlayerType) {
			this.view = view;
			this.currentScore = 0;
			this.view.updateScore(this.currentScore);
			this.playerType = playerType;
		}

		/** @inheritdoc */
		public update(message: DiceThrownEventData): void {
			this.addScore(message.diceValue);

			if (this.currentScore >= this.scoreToWin) {
				this.view.setState(Game.PlayerState.Winner);
				this.playerWonEventNotifier.notify(new Game.PlayerWonEventData());
			}

			this.playerScoreUpdatedEventNotifier.notify(new Game.PlayerScoreUpdatedEventData());
		}

		/**
		 * Set state.
		 * @param newState New State.
		 */
		public setState(newState: Game.PlayerState): void {
			this.view.setState(newState);
		}

		/**
		 * Create player.
		 * @param playerName Player name.
		 * @param playerType Player type.
		 */
		public static async create(playerName: string, playerType: PlayerType): Promise<Player> {
			const view = await UI.PlayerView.create(playerName, playerType);
			const player = new Player(view, playerType);
			return player;
		}

		private addScore(score: number): void {
			this.currentScore += score;
			this.view.updateScore(this.currentScore);

			this.view.addDiceValueToHistory(score);
		}
	}
}
