import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Sort } from '@angular/material/sort';

import { map } from 'rxjs/operators';

import { Anime } from '../entities/anime';

import { AllAnimeResponseDto } from '../dto/allAnimeResponse.dto';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private readonly baseUrl = 'https://api.camp-js.saritasa.rocks';

	private readonly animeEndpoint = 'api/v1/anime/anime/';

	private readonly http = inject(HttpClient);

	/**
	 * Get all anime request.
	 * @param sort Sort.
	 * @param limit Limit.
	 */
	public getAll(sort: Sort, limit?: number): Observable<Anime[]> {
		let params = new HttpParams();

		if (sort.direction !== '') {
			params = params.set('ordering', `${sort.direction === 'asc' ? '' : '-'}${sort.active}`);
		}

		if (limit != null) {
			params = params.set('limit', limit);
		}

		const url = new URL(this.animeEndpoint, this.baseUrl);
		url.search = params.toString();

		return this.http.get<AllAnimeResponseDto>(url.toString()).pipe(
			map(response => response.results),
			map(animeDtoArray => animeDtoArray.map(item => ({
				imageSourceURL: item.image,
				titleEnglish: item.title_eng,
				titleJapan: item.title_jpn,
				airedStart: new Date(item.aired.start),
				type: item.type,
				status: item.status,
			} as Anime))),
		);
	}
}
