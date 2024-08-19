import { AiredDto } from './aired.dto';

/** Anime DTO. */
export type AnimeDto = {

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

	/** Image Url. */
	readonly image: string;

	/** Aired. */
	readonly aired: AiredDto;

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
