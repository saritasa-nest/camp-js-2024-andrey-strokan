import { AnimeDto } from './anime.dto';

/** All Anime Response DTO. */
export type AllAnimeResponseDto = {

	/** Count. */
	readonly count: number;

	/** Next. */
	readonly next?: string;

	/** Previous. */
	readonly previous?: string;

	/** Results. */
	readonly results: AnimeDto[];
};
