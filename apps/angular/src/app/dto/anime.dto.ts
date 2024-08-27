import { DataRangeDto } from './dataRange.dto';

/** Anime DTO. */
export type AnimeDto = {

	/** Id. */
	readonly id: number;

	/** Created. */
	readonly created: string;

	/** Modified. */
	readonly modified: string;

	/** Title English. */
	readonly title_eng: string;

	/** Title Japanese. */
	readonly title_jpn: string;

	/** Image Url. */
	readonly image: string;

	/** Aired. */
	readonly aired: DataRangeDto;

	/** Type. */
	readonly type: string;

	/** Status. */
	readonly status: string;

	/** Score. */
	readonly score?: number;

	/** User score. */
	readonly user_score?: number;

	/** Studios. */
	readonly studios: string[];

	/** Genres. */
	readonly genres: number[];
};
