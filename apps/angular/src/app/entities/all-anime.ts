import { Anime } from './anime';

/** All Anime. */
export type AllAnime = {

	/** Anime total count. */
	totalCount: number;

	/** Page's anime list. */
	pageData: Anime[];
};
