import { AiredDTO } from './AiredDTO';

/** Anime DTO. */
export type AnimeDTO = {

	/** Id. */
	id: number;

	/** Created. */
	created: string;

	/** Modified. */
	modified: string;

	/** Title english. */
	title_eng: string;

	/** Title Japan. */
	title_jpn: string;

	/** Anime image. */
	image: string;

	/** Aired. */
	aired: AiredDTO;

	/** Type. */
	type: string;

	/** Status. */
	status: string;

	/** Score. */
	score: number | null;

	/** User score. */
	user_score: number | null;

	/** Studios. */
	studios: string[];

	/** Genres. */
	genres: number[];
};
