/** Date range type. */
export type DateRange = {

	/** Start. */
	readonly start: string;

	/** There is no end date because the process is ongoing and has no specific end date. */
	readonly end?: string;
};
