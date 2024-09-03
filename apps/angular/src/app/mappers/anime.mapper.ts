import { inject, Injectable } from '@angular/core';

import { AnimeDto } from '../dto/anime.dto';
import { Anime } from '../entities/anime';

import { Mapper } from './baseClasses/mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

/**
 * Anime mapper.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper implements Mapper<AnimeDto, Anime> {

	private readonly animeTypeMapper = inject(AnimeTypeMapper);

	/** @inheritdoc */
	public map(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			created: dto.created,
			modified: dto.modified,
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			imageSourceURL: dto.image,
			aired: { start: dto.aired.start, end: dto.aired.end },
			type: this.animeTypeMapper.map(dto.type),
			status: dto.status,
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		};
	}
}
