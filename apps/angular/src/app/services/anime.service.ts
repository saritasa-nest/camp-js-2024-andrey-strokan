import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map, tap } from 'rxjs/operators';

import { Anime } from '../entities/anime';

import { AllAnimeResponseDto } from '../dto/allAnimeResponse.dto';

import { SortConfig } from '../types/sortConfig';
import { PaginationConfig } from '../types/paginationConfig';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private readonly baseUrl = 'https://api.camp-js.saritasa.rocks';

	private readonly animeEndpoint = 'api/v1/anime/anime/';

	private readonly http = inject(HttpClient);

	/** Anime count. */
	private animeCount = 0;

	/**
	 * Get all anime request.
	 * @param sortConfig Sort config.
	 * @param paginationConfig Pagination config.
	 */
	public getAll(sortConfig?: SortConfig, paginationConfig?: PaginationConfig): Observable<Anime[]> {
		let params = new HttpParams();

		if (sortConfig != null) {
			params = params.set('ordering', `${sortConfig.sortOrder === 'asc' ? '' : '-'}${sortConfig.sortField}`);
		}

		if (paginationConfig != null) {
			params = params.set('limit', paginationConfig.pageSize);
			params = params.set('offset', paginationConfig.pageIndex * paginationConfig.pageSize);
		}

		const url = new URL(this.animeEndpoint, this.baseUrl);
		url.search = params.toString();

		return this.http.get<AllAnimeResponseDto>(url.toString()).pipe(
			tap(response => {
				this.animeCount = response.count;
			}),
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

	/** Get anime count. */
	public getCount(): number {
		return this.animeCount;
	}
}
