import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AnimeMapper } from '../mappers/anime.mapper';

import { AnimeList } from '../entities/animeList';
import { Anime } from '../entities/anime';

import { PaginationDto } from '../dto/pagination.dto';
import { AnimeDto } from '../dto/anime.dto';

import { SortConfig } from '../types/sortConfig';
import { PaginationConfig } from '../types/paginationConfig';

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
	 * @param sortConfig Sort config.
	 * @param paginationConfig Pagination config.
	 */
	public getAll(sortConfig?: SortConfig, paginationConfig?: PaginationConfig): Observable<AnimeData> {
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
			map(response => {
				const commonCount = response.count;

				const pageData = response.results.map(item => ({
					imageSourceURL: item.image,
					titleEnglish: item.title_eng,
					titleJapan: item.title_jpn,
					airedStart: new Date(item.aired.start),
					type: item.type,
					status: item.status,
				} as Anime));

				return { commonCount, pageData };
			}),
			map(response => response.results),
			map(animeDtoArray => animeDtoArray.map(item => animeMapper.fromDto(item))),
		);
	}
}
