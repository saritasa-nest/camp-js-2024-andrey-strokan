import { BaseEventData } from '../../observer/baseEventData';

/** Roll button clicked event. */
export class RollButtonClickedEventData extends BaseEventData {

	/** @inheritdoc */
	public override eventName: 'RollButtonClicked' = 'RollButtonClicked';
}
