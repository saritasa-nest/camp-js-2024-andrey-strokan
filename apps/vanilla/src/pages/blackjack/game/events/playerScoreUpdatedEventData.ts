import { BaseEventData } from '../../observer/baseEventData';

/** Called when Player score updated. */
export class PlayerScoreUpdatedEventData extends BaseEventData {

	/** @inheritdoc */
	public override readonly eventName = 'PlayerScoreUpdated';
}
