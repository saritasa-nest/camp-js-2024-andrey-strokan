/** Mapper base. */
export type Mapper<TIn, TOut> = {

	/**
	 * Map from In type to Out type.
	 * @param object In type.
	 * @returns Out type.
	 */
	map(original: TIn): TOut;
};
