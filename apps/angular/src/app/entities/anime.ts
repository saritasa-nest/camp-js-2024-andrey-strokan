import { AnimeStatus } from '../enums/anime-status';
import { DisplayedAnimeType } from '../enums/anime-type';

import { DateRange } from './date-range';

/** Anime. */
export type Anime = {

	/** Id. */
	readonly id: number;

	/**
	 * Date and time of record creation.
	 * @example 2024-08-01
	 */
	readonly created: string;

	/** Date and time of last edit of the entry. */
	readonly modified: string;

	/** English title. */
	readonly titleEnglish: string;

	/** Japanese title. */
	readonly titleJapanese: string;

	/** Image source. */
	readonly imageSourceURL: string;

	/** When is this anime on air. */
	readonly aired: DateRange;

	/** Type. */
	readonly type: DisplayedAnimeType;

	/**
	 * The current status of the anime.
	 * It can be Airing, Finished or Not yet aired.
	 */
	readonly status: AnimeStatus;

	/** World score of this anime. */
	readonly score?: number;

	/** How users rated this broadcast. */
	readonly userScore?: number;

	/** Studios where the broadcast will take place. */
	readonly studios: string[];

	/** Genres. */
	readonly genres: number[];
};
