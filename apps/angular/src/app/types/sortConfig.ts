import { AnimeSortField } from '../enums/anime-sort-field';

/** Sort config. */
export type SortConfig = {

	/** Sort field. */
	sortField: AnimeSortField;

	/** Sort order. */
	sortOrder: 'asc' | 'desc';
};
