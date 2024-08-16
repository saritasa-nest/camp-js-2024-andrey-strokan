import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { AnimeResponseDTO } from '../DTOs/AnimeResponseDTO';
import { AnimeDTO } from '../DTOs/AnimeDTO';

import { ApiService } from '.././services/api.service';

/** Anime dashboard. */
@Component({
	selector: 'camp-anime-dashboard',
	standalone: true,
	imports: [CommonModule, MatTableModule, DatePipe],
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent implements OnInit {

	/** Displayed columns. */
	public displayedColumns: string[] = ['imageSourceURL', 'titleEnglish', 'titleJapan', 'airedStart', 'filmType'];

	/** Anime films. */
	public animeFilms: AnimeDTO[] = [];

	public constructor(private apiService: ApiService) {}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.apiService.getAllAnimeFilms()
			.subscribe(
				(data: AnimeResponseDTO) => {
					this.animeFilms = data.results;
				},
			);
	}
}
