import { ThrowButtonClickedEventData } from '../ui/events/throwButtonClickedEventData';

import { randomRange } from '../utils/mathUtils';

import { Notifier } from '../observer/notifier';
import { ObserversRegistrar } from '../observer/observersRegistrar';
import { Observer } from '../observer/observer';

import { DiceRollEventData } from './events/diceRollEventData';


/** Game dice. */
export class Dice implements Observer<ThrowButtonClickedEventData> {

	private readonly minValue = 1;

	private readonly maxValue: number;

	private readonly rollEventNotifier = new Notifier<DiceRollEventData>();

	/** @inheritdoc */
	public readonly observersRegistrar: ObserversRegistrar<DiceRollEventData> = this.rollEventNotifier;

	public constructor(maxValue: number) {
		this.maxValue = maxValue;
	}

	/** Roll dice. */
	public roll(): void {
		const newDiceValue = randomRange(this.minValue, this.maxValue);
		this.rollEventNotifier.notify(new DiceRollEventData(newDiceValue));
	}

	/** @inheritdoc */
	public update(): void {
		this.roll();
	}
}
