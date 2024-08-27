import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { AllAnime } from '../entities/all-anime';

import { AnimeMapper } from '../mappers/anime.mapper';

import { PaginationDto } from '../dto/pagination.dto';

import { SortConfig } from '../types/sort-config';
import { PaginationConfig } from '../types/pagination-config';
import { ApiSideKeyAnimeType } from '../enums/anime-type';
import { AnimeDto } from '../dto/anime.dto';

import { environment } from '../../environments/environment';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private readonly animeEndpoint = 'api/v1/anime/anime/';

	private readonly http = inject(HttpClient);

	/**
	 * Get all anime request.
	 * @param sortConfig Sort config.
	 * @param paginationConfig Pagination config.
	 * @param typeFilterConfig Type filter config.
	 * @param searchString Search string.
	 */
	public getAll(sortConfig?: SortConfig,
		paginationConfig?: PaginationConfig,
		typeFilterConfig?: ApiSideKeyAnimeType[],
		searchString?: string): Observable<AllAnime> {

		let params = new HttpParams();

		// Sort.
		if (sortConfig != null) {
			params = params.set('ordering', `${sortConfig.sortOrder === 'asc' ? '' : '-'}${sortConfig.sortField}`);
		}

		// Pagination.
		if (paginationConfig != null) {
			params = params.set('limit', paginationConfig.pageSize);
			params = params.set('offset', paginationConfig.pageIndex * paginationConfig.pageSize);
		}

		// Filter.
		if (typeFilterConfig) {
			params = params.set('type__in', typeFilterConfig.join(','));
		}

		// Search.
		if (searchString) {
			params = params.set('search', searchString);
		}

		const url = new URL(this.animeEndpoint, environment.animeApiUrl);
		url.search = params.toString();

		return this.http.get<PaginationDto<AnimeDto>>(url.toString()).pipe(
			map(response => {
				const totalCount = response.count;
				const animeMapper = new AnimeMapper();
				const pageData = response.results.map(animeDto => animeMapper.fromDto(animeDto));

				return { totalCount, pageData };
			}),
		);
	}
}
