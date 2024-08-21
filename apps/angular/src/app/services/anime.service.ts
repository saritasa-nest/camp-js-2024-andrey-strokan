import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Sort } from '@angular/material/sort';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AnimeMapper } from '../mappers/anime.mapper';

import { Anime } from '../entities/anime';

import { PaginationDto } from '../dto/pagination.dto';
import { AnimeDto } from '../dto/anime.dto';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private readonly allAnimeEndpoint = 'api/v1/anime/anime/';

	private readonly httpClient = inject(HttpClient);

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
			map(animeDtoArray => animeDtoArray.map(item => animeMapper.fromDto(item))),
		);
	}
}
