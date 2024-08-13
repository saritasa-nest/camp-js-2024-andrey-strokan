namespace ObserverCore {

	/** Base Event type. */
	export class Notifier<T extends BaseEventData> implements ObserversRegistrar<T> {

		private readonly observers: ObserverCore.Observer<T>[] = [];

		/**
		 * Attach observer.
		 * @param observer Observer.
		 */
		public attach(observer: ObserverCore.Observer<T>): void {
			if (this.observers.includes(observer)) {
				return console.error('Observer already attached.');
			}

			this.observers.push(observer);
		}

		/**
		 * Detach observer.
		 * @param observer Observer.
		 */
		public detach(observer: ObserverCore.Observer<T>): void {
			const observerIndex = this.observers.indexOf(observer);
			if (observerIndex === -1) {
				return console.error('Observer was not attached.');
			}

			this.observers.splice(observerIndex, 1);
		}

		/**
		 * Notify observers.
		 * @param message Observer.
		 */
		public notify(message: T): void {
			this.observers.forEach(observer => {
				observer.update(message);
			});
		}
	}
}
