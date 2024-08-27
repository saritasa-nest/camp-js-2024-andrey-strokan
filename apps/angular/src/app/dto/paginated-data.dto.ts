/** Paginated data DTO. */
export type PaginatedDataDto<T> = {

	/** Count. */
	readonly count: number;

	/** Next. */
	readonly next?: string;

	/** Previous. */
	readonly previous?: string;

	/** Results. */
	readonly results: T[];
};
