import { BaseEventData } from './baseEventData';
import { Observer } from './observer';

/** Observers registrar. */
export type ObserversRegistrar<T extends BaseEventData> = {

	/**
	 * Attach observer.
	 * @param observer Observer.
	 */
	attach(observer: Observer<T>): void;

	/**
	 * Detach observer.
	 * @param observer Observer.
	 */
	detach(observer: Observer<T>): void;
};
