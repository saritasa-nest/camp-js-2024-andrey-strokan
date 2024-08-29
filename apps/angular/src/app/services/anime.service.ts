import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

	private readonly animeMapper = inject(AnimeMapper);

	/** Get all anime request. */
	public getAll(): Observable<Anime[]> {
		return this.httpClient.get<PaginationDto<AnimeDto>>(`${environment.animeApiUrl}/${this.allAnimeEndpoint}`).pipe(
			map(response => response.results),
			map(animeDtoArray => animeDtoArray.map(item => this.animeMapper.fromDto(item))),
		);
	}
}
