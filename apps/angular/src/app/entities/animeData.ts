import { Anime } from './anime';

/** Anime data. */
export type AnimeData = {

	/** Anime total count. */
	totalCount: number;

	/** Page's anime list. */
	pageData: Anime[];
};
