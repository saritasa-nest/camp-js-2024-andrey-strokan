import { DataRangeDto } from './dataRange.dto';

/** Anime DTO. */
export type AnimeDto = {

	/** Id. */
	readonly id: number;

	/** Date and time of record creation. */
	readonly created: string;

	/** Date and time of last edit of the entry. */
	readonly modified: string;

	/** Title English. */
	readonly title_eng: string;

	/** Title Japanese. */
	readonly title_jpn: string;

	/** Image Url. */
	readonly image: string;

	/** When is this anime on air. */
	readonly aired: DataRangeDto;

	/** Type. */
	readonly type: string;

	/** Status. */
	readonly status: string;

	/** Score. */
	readonly score?: number;

	/** User score. */
	readonly user_score?: number;

	/** Studios where the broadcast will take place. */
	readonly studios: string[];

	/** Genres. */
	readonly genres: number[];
};
