import { AireDto } from './aired.dto';

/** Anime DTO. */
export type AnimeDTO = {

	/** Id. */
	readonly id: number;

	/** Created. */
	readonly created: string;

	/** Modified. */
	readonly modified: string;

	/** Title english. */
	readonly title_eng: string;

	/** Title Japan. */
	readonly title_jpn: string;

	/** Anime image. */
	readonly image: string;

	/** Aired. */
	readonly aired: AireDto;

	/** Type. */
	readonly type: string;

	/** Status. */
	readonly status: string;

	/** Score. */
	readonly score: number | null;

	/** User score. */
	readonly user_score: number | null;

	/** Studios. */
	readonly studios: string[];

	/** Genres. */
	readonly genres: number[];
};
