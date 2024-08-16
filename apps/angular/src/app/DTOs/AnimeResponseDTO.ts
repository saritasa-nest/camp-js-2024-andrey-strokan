import { AnimeDTO } from './AnimeDTO';

/** Anime Response DTO. */
export type AnimeResponseDTO = {

	/** Count. */
	count: number;

	/** Next. */
	next: string | null;

	/** Previous. */
	previous: string | null;

	/** Results. */
	results: AnimeDTO[];
};
