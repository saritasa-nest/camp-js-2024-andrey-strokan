import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AnimeMapper } from '../mappers/anime.mapper';

import { PaginationDto } from '../dto/pagination.dto';

import { AnimeData } from '../entities/animeData';

import { AnimeDto } from '../dto/anime.dto';

import { SortConfig } from '../types/sortConfig';
import { PaginationConfig } from '../types/paginationConfig';
import { ApiSideKeyAnimeType } from '../enums/animeType';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private readonly allAnimeEndpoint = 'api/v1/anime/anime/';

	private readonly httpClient = inject(HttpClient);

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
		searchString?: string): Observable<AnimeData> {

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

		const url = new URL(this.allAnimeEndpoint, environment.animeApiUrl);
		url.search = params.toString();

		return this.httpClient.get<PaginationDto<AnimeDto>>(url.toString()).pipe(
			map(response => {
				const totalCount = response.count;
				const animeMapper = new AnimeMapper();
				const pageData = response.results.map(animeDto => animeMapper.fromDto(animeDto));
				return { totalCount, pageData };
			}),
		);
	}
}
