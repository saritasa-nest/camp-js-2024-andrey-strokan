import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { AnimeMapper } from '../mappers/animeMapper';

import { Anime } from '../entities/anime';

import { PaginatedDataDto } from '../dto/paginatedData.dto';
import { AnimeDto } from '../dto/anime.dto';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private apiUrl = 'https://api.camp-js.saritasa.rocks';

	private allAnimeEndpoint = 'api/v1/anime/anime/';

	public constructor(private http: HttpClient) {}

	/** Get all anime request. */
	public getAll(): Observable<Anime[]> {
		const animeMapper = new AnimeMapper();
		return this.http.get<PaginatedDataDto<AnimeDto>>(`${this.apiUrl}/${this.allAnimeEndpoint}`).pipe(
			map(response => response.results),
			map(animeDtoArray => animeDtoArray.map(item => animeMapper.fromDto(item))),
		);
	}
}
