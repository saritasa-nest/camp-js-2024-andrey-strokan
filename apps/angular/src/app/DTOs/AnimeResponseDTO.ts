import { AnimeDTO } from './AnimeDTO';

/** Anime Response DTO. */
export type AnimeResponseDTO = {

	/** Count. */
	readonly count: number;

	/** Next. */
	readonly next: string | null;

	/** Previous. */
	readonly previous: string | null;

	/** Results. */
	readonly results: AnimeDTO[];
};
