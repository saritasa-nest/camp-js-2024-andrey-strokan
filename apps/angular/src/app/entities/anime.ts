import { ApiSideKeyAnimeType } from '../enums/animeType';

/** Anime. */
export type Anime = {

	/** Id. */
	readonly id: number;

	/** Image source. */
	readonly imageSourceURL: string;

	/** Title english. */
	readonly titleEnglish: string;

	/** Title Japanese. */
	readonly titleJapanese: string;

	/** Aired start. */
	readonly airedStart: Date;

	/** Type. */
	readonly type: ApiSideKeyAnimeType;

	/** Status. */
	readonly status: string;
};
