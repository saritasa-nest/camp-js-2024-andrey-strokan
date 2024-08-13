import { BaseEventData } from '../../observer/baseEventData';

/**  Called when Dice thrown. */
export class DiceThrownEventData extends BaseEventData {

	/**  @inheritdoc */
	public override eventName: 'DiceThrown' = 'DiceThrown';

	/** Dice value. */
	public readonly diceValue: number;

	public constructor(diceValue: number) {
		super();
		this.diceValue = diceValue;
	}
}
