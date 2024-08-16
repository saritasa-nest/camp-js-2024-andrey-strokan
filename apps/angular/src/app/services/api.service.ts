import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AnimeResponseDTO } from '../DTOs/AnimeResponseDTO';

/** Api service. */
@Injectable()
export class ApiService {

	private apiUrl = 'https://api.camp-js.saritasa.rocks';

	private allAnimeEndpoint = 'api/v1/anime/anime/';

	public constructor(private http: HttpClient) {}

	/** Get all anime request. */
	public getAllAnimeFilms(): Observable<AnimeResponseDTO> {
		return this.http.get<AnimeResponseDTO>(`${this.apiUrl}/${this.allAnimeEndpoint}`);
	}
}
