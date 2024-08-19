import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { AnimeService } from '../services/anime.service';
import { AnimeFilm } from '../entities/animeFilm';

/** Anime dashboard. */
@Component({
	selector: 'camp-anime-dashboard',
	standalone: true,
	imports: [CommonModule, MatTableModule, DatePipe],
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent implements OnInit {

	/** Services. */
	private readonly apiService = inject(AnimeService);

	/** Displayed columns. */
	public displayedColumns: string[] = ['imageSourceURL', 'titleEnglish', 'titleJapan', 'airedStart', 'filmType', 'filmStatus'];

	/** Anime films. */
	public animeFilms: AnimeFilm[] = [];

	/** @inheritdoc */
	public ngOnInit(): void {
		this.apiService.getAll()
			.subscribe(
				animeFilms => {
					this.animeFilms = animeFilms;
				},
			);
	}
}
