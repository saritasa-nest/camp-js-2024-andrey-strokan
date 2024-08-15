import { FilmType } from '../enums/filmType';

/** Anime film. */
export type AnimeFilm = {

	/** Image source URL. */
	imageSourceURL: string;

	/** Title English. */
	titleEnglish: string;

	/** Title Japan. */
	titleJapan: string;

	/** Aired start. */
	airedStart: Date;

	/** Type. */
	filmType: FilmType;
};
