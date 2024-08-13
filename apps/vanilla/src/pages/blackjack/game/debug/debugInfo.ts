import { Observer } from '../../observer/observer';
import { DebugInfoView } from '../../ui/debug/debugInfoView';
import { DiceThrownEventData } from '../events/diceThrownEventData';

/**  Debug info. */
export class DebugInfo implements Observer<DiceThrownEventData> {

	private readonly view: DebugInfoView;

	private currentScore: number;

	public constructor() {
		this.currentScore = 0;
		this.view = new DebugInfoView();
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
