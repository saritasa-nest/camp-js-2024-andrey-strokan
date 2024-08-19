import { AnimeDto } from './anime.dto';

/** All Anime Response DTO. */
export type AllAnimeResponseDto = {

	/** Count. */
	readonly count: number;

	/** Next. */
	readonly next: string | null;

	/** Previous. */
	readonly previous: string | null;

	/** Results. */
	readonly results: AnimeDto[];
};
