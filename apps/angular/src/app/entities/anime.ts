import { AnimeStatus } from '../enums/anime-status';
import { AnimeType } from '../enums/anime-type';

/** Anime. */
export type Anime = {

	/** Id. */
	readonly id: number;

	/** Image source. */
	readonly imageSourceURL: string;

	/** English title. */
	readonly titleEnglish: string;

	/** Japanese title. */
	readonly titleJapanese: string;

	/** Aired start. */
	readonly airedStart: Date;

	/** Type. */
	readonly type: AnimeType;

	/**
	 * The current status of the anime.
	 * It can be Airing, Finished or Not yet aired.
	 */
	readonly status: AnimeStatus;
};
