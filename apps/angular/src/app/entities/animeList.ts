import { Anime } from './anime';

/** Anime list. */
export type AnimeList = {

	/** Anime count. */
	commonCount: number;

	/** Page's anime list. */
	pageData: Anime[];
};
