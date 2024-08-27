/** Api side key type. */
export enum ApiSideKeyAnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'MOVIE',
	Special = 'SPECIAL',
	ONA = 'ONA',
	Music = 'MUSIC',
	PromotionalVideos = 'PROMOTIONAL_VIDEOS',
	Unknown = 'UNKNOWN',
}

/** Displayed anime type. */
export enum DisplayedAnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	ONA = 'ONA',
	Music = 'Music',
	PromotionalVideos = 'Promotional Videos',
	Unknown = 'Unknown',
}

/**
 * Map from ApiSideKey to DisplayedAnimeType.
 * @param type Api side anime type.
 * @returns Displayed anime type.
 */
export function toDisplayedType(type: ApiSideKeyAnimeType): DisplayedAnimeType {
	switch (type) {
		case ApiSideKeyAnimeType.TV: return DisplayedAnimeType.TV;
		case ApiSideKeyAnimeType.OVA: return DisplayedAnimeType.OVA;
		case ApiSideKeyAnimeType.Movie: return DisplayedAnimeType.Movie;
		case ApiSideKeyAnimeType.Special: return DisplayedAnimeType.Special;
		case ApiSideKeyAnimeType.ONA: return DisplayedAnimeType.ONA;
		case ApiSideKeyAnimeType.Music: return DisplayedAnimeType.Music;
		case ApiSideKeyAnimeType.PromotionalVideos: return DisplayedAnimeType.PromotionalVideos;
		case ApiSideKeyAnimeType.Unknown: return DisplayedAnimeType.Unknown;
		default: throw new Error('Unknown Anime Type');
	}
}

/**
 * Map from DisplayedAnimeType to ApiSideKey.
 * @param type Api side anime type.
 * @returns Displayed anime type.
 */
export function toApiSideKey(type: DisplayedAnimeType): ApiSideKeyAnimeType {
	switch (type) {
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
