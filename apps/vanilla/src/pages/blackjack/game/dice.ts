/** Game dice. */
export class Dice implements Observer<ThrowButtonClickedEventData> {

	private readonly minValue: number = 1;

	private readonly maxValue: number;

	private readonly diceThrownEventNotifier = new Notifier<DiceThrownEventData>();

	/** @inheritdoc */
	public readonly observersRegistrar: ObserversRegistrar<DiceThrownEventData> = this.diceThrownEventNotifier;

	public constructor(maxValue: number) {
		this.maxValue = maxValue;
	}

	/** Throw dice. */
	public throw(): void {
		const newDiceValue = Math.randomRange(this.minValue, this.maxValue);
		this.diceThrownEventNotifier.notify(new DiceThrownEventData(newDiceValue));
	}

	/** @inheritdoc */
	public update(): void {
		this.throw();
	}
}
