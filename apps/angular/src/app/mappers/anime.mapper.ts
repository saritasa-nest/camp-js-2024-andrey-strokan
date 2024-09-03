import { Injectable } from '@angular/core';

import { AnimeDto } from '../dto/anime.dto';
import { Anime } from '../entities/anime';

import { Mapper } from './baseClasses/mapper';

/**
 * Anime mapper.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper implements Mapper<AnimeDto, Anime> {

	/** @inheritdoc */
	public fromDto(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			created: dto.created,
			modified: dto.modified,
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			imageSourceURL: dto.image,
			aired: { start: dto.aired.start, end: dto.aired.end },
			type: dto.type,
			status: dto.status,
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		};
	}

	/** @inheritdoc */
	public toDto(model: Anime): AnimeDto {
		return {
			id: model.id,
			created: model.created,
			modified: model.modified,
			title_eng: model.titleEnglish,
			title_jpn: model.titleJapanese,
			image: model.imageSourceURL,
			aired: { start: model.aired.start, end: model.aired.end },
			type: model.type,
			status: model.status,
			score: model.score,
			user_score: model.userScore,
			studios: model.studios,
			genres: model.genres,
		};
	}
}
