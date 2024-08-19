import { AnimeDto } from './anime.dto';

/** Anime Response DTO. */
export type AnimeResponseDto = {

	/** Count. */
	readonly count: number;

	/** Next. */
	readonly next: string | null;

	/** Previous. */
	readonly previous: string | null;

	/** Results. */
	readonly results: AnimeDto[];
};
