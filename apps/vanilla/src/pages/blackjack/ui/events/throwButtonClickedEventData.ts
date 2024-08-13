import { BaseEventData } from '../../observer/baseEventData';

/** Throw button clicked event. */
export class ThrowButtonClickedEventData extends BaseEventData {

	/** @inheritdoc */
	public override eventName: 'ThrowButtonClicked' = 'ThrowButtonClicked';
}
