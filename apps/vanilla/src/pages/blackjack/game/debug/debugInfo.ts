import { Observer } from '../../observer/observer';
import { DebugInfoView } from '../../ui/debug/debugInfoView';
import { DiceRollEventData } from '../events/diceRollEventData';

/** Debug info. */
export class DebugInfo implements Observer<DiceRollEventData> {

	private readonly view: DebugInfoView;

	private currentScore: number;

	public constructor() {
		this.currentScore = 0;
		this.view = new DebugInfoView();
		this.view.updateScore(this.currentScore);
	}

	/** @inheritdoc */
	public update(message: DiceRollEventData): void {
		this.addScore(message.diceValue);
	}

	private addScore(score: number): void {
		this.currentScore += score;
		this.view.updateScore(this.currentScore);

		this.view.addDiceValueToHistory(score);
	}
}
