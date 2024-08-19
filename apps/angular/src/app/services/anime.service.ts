import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { AnimeFilm } from '../entities/animeFilm';

import { AllAnimeResponseDto } from '../dto/allAnimeResponse.dto';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private apiUrl = 'https://api.camp-js.saritasa.rocks';

	private allAnimeEndpoint = 'api/v1/anime/anime/';

	public constructor(private http: HttpClient) {}

	/** Get all anime request. */
	public getAll(): Observable<AnimeFilm[]> {
		return this.http.get<AllAnimeResponseDto>(`${this.apiUrl}/${this.allAnimeEndpoint}`).pipe(
			map(response => response.results),
			map(animeDtoArray => animeDtoArray.map(item => ({
				imageSourceURL: item.image,
				titleEnglish: item.title_eng,
				titleJapan: item.title_jpn,
				airedStart: new Date(item.aired.start),
				filmType: item.type,
				filmStatus: item.status,
			} as AnimeFilm))),
		);
	}
}
