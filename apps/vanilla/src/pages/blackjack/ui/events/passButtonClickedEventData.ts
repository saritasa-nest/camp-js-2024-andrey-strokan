import { BaseEventData } from '../../observer/baseEventData';

/** Pass button clicked event. */
export class PassButtonClickedEventData extends BaseEventData {

	/** @inheritdoc */
	public override readonly eventName = 'PassButtonClicked';
}
