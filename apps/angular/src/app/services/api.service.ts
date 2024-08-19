import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AnimeResponseDto } from '../dto/animeResponse.dto';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class ApiService {

	private apiUrl = 'https://api.camp-js.saritasa.rocks';

	private allAnimeEndpoint = 'api/v1/anime/anime/';

	public constructor(private http: HttpClient) {}

	/** Get all anime request. */
	public getAllAnimeFilms(): Observable<AnimeResponseDto> {
		return this.http.get<AnimeResponseDto>(`${this.apiUrl}/${this.allAnimeEndpoint}`);
	}
}
