import { BaseEventData } from '../../observer/baseEventData';

/**  Called when Dice roll. */
export class DiceRollEventData extends BaseEventData {

	/**  @inheritdoc */
	public override readonly eventName = 'DiceRoll';

	/** Dice value. */
	public readonly diceValue: number;

	public constructor(diceValue: number) {
		super();
		this.diceValue = diceValue;
	}
}
