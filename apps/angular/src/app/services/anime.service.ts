import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AllAnimeResponseDto } from '../dto/allAnimeResponse.dto';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private apiUrl = 'https://api.camp-js.saritasa.rocks';

	private allAnimeEndpoint = 'api/v1/anime/anime/';

	public constructor(private http: HttpClient) {}

	/** Get all anime request. */
	public getAll(): Observable<AllAnimeResponseDto> {
		return this.http.get<AllAnimeResponseDto>(`${this.apiUrl}/${this.allAnimeEndpoint}`);
	}
}
