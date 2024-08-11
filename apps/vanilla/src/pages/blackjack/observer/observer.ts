namespace ObserverCore {

	/**
	 * Observer.
	 */
	export type Observer<T extends BaseEventData> = {

		/**
		 * Update subjects.
		 * @param message
		 */
		update(message: T): void;
	};
}
