import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AnimeMapper } from '../mappers/anime-mapper';

import { Anime } from '../entities/anime';

import { PaginatedDataDto } from '../dto/paginated-data.dto';
import { AnimeDto } from '../dto/anime-dto';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private readonly allAnimeEndpoint = 'api/v1/anime/anime/';

	private readonly httpClient = inject(HttpClient);

	/** Get all anime request. */
	public getAll(): Observable<Anime[]> {
		const animeMapper = new AnimeMapper();
		return this.httpClient.get<PaginatedDataDto<AnimeDto>>(`${environment.animeApiUrl}/${this.allAnimeEndpoint}`).pipe(
			map(response => response.results),
			map(animeDtoArray => animeDtoArray.map(item => animeMapper.fromDto(item))),
		);
	}
}
