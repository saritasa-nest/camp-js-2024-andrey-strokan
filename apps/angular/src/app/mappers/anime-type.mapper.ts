import { Injectable } from '@angular/core';

import { ApiSideKeyAnimeType, DisplayedAnimeType } from '../enums/anime-type';

import { Mapper } from './baseClasses/mapper';

/**
 * Anime type mapper.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeTypeMapper implements Mapper<ApiSideKeyAnimeType | DisplayedAnimeType, DisplayedAnimeType | ApiSideKeyAnimeType> {

	/** @inheritdoc */
	public map(apiSideKeyAnimeType: ApiSideKeyAnimeType): DisplayedAnimeType;

	/** @inheritdoc */
	public map(displayedAnimeType: DisplayedAnimeType): ApiSideKeyAnimeType;

	/** @inheritdoc */
	public map(input: ApiSideKeyAnimeType | DisplayedAnimeType): DisplayedAnimeType | ApiSideKeyAnimeType {

		switch (input) {
			case ApiSideKeyAnimeType.TV: return DisplayedAnimeType.TV;
			case ApiSideKeyAnimeType.OVA: return DisplayedAnimeType.OVA;
			case ApiSideKeyAnimeType.Movie: return DisplayedAnimeType.Movie;
			case ApiSideKeyAnimeType.Special: return DisplayedAnimeType.Special;
			case ApiSideKeyAnimeType.ONA: return DisplayedAnimeType.ONA;
			case ApiSideKeyAnimeType.Music: return DisplayedAnimeType.Music;
			case ApiSideKeyAnimeType.PromotionalVideos: return DisplayedAnimeType.PromotionalVideos;
			case ApiSideKeyAnimeType.Unknown: return DisplayedAnimeType.Unknown;

			case DisplayedAnimeType.TV: return ApiSideKeyAnimeType.TV;
			case DisplayedAnimeType.OVA: return ApiSideKeyAnimeType.OVA;
			case DisplayedAnimeType.Movie: return ApiSideKeyAnimeType.Movie;
			case DisplayedAnimeType.Special: return ApiSideKeyAnimeType.Special;
			case DisplayedAnimeType.ONA: return ApiSideKeyAnimeType.ONA;
			case DisplayedAnimeType.Music: return ApiSideKeyAnimeType.Music;
			case DisplayedAnimeType.PromotionalVideos: return ApiSideKeyAnimeType.PromotionalVideos;
			case DisplayedAnimeType.Unknown: return ApiSideKeyAnimeType.Unknown;

			default: throw new Error('Unknown Anime Type');
		}
	}
}
