import { BaseEventData } from '../../observer/baseEventData';

/** Called when Player won. */
export class PlayerWonEventData extends BaseEventData {

	/** @inheritdoc */
	public override eventName: 'PlayerWon' = 'PlayerWon';
}
