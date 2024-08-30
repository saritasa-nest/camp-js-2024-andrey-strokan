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
			imageSourceURL: dto.image,
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			airedStart: new Date(dto.aired.start),
			type: dto.type,
			status: dto.status,
		};
	}

	/** @inheritdoc */
	public toDto(model: Anime): AnimeDto {
		return {
			id: model.id,
			created: '',
			modified: '',
			title_eng: model.titleEnglish,
			title_jpn: model.titleJapanese,
			image: model.imageSourceURL,
			aired: { start: model.airedStart.toString() },
			type: model.type,
			status: model.status,
			studios: [],
			genres: [],
		};
	}
}
