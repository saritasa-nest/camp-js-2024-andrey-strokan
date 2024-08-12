namespace ObserverCore {

	/**
	 * Observers registrar.
	 */
	export type ObserversRegistrar<T extends BaseEventData> = {

		/**
		 * Attach observer.
		 * @param observer Observer.
		 */
		attach(observer: ObserverCore.Observer<T>): void;

		/**
		 * Detach observer.
		 * @param observer Observer.
		 */
		detach(observer: ObserverCore.Observer<T>): void;
	};
}
