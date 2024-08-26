import { Anime } from './anime';

/** Anime data. */
export type AnimeData = {

	/** Anime total count. */
	totalCount: number;

	/** Types. */
	types: string[];

	/** Page's anime list. */
	pageData: Anime[];
};
