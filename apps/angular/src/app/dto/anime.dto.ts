import { AnimeStatus } from '../enums/anime-status';
import { AnimeType } from '../enums/anime-type';

import { DateRangeDto } from './date-range.dto';

/** Anime DTO. */
export type AnimeDto = {

	/** Id. */
	readonly id: number;

	/** Date and time of record creation. */
	readonly created: string;

	/** Date and time of last edit of the entry. */
	readonly modified: string;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Image URL. */
	readonly image: string;

	/** When is this anime on air. */
	readonly aired: DateRangeDto;

	/** Type. */
	readonly type: AnimeType;

	/**
	 * The current status of the anime.
	 * It can be Airing, Finished or Not yet aired.
	 */
	readonly status: AnimeStatus;

	/** World score of this anime. */
	readonly score?: number;

	/** How users rated this broadcast. */
	readonly user_score?: number;

	/** Studios where the broadcast will take place. */
	readonly studios: string[];

	/** Genres. */
	readonly genres: number[];
};
