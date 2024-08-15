import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeFilm } from './interfaces/animeFilm';

/** Anime dashboard. */
@Component({
	selector: 'camp-anime-dashboard',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent {

	/** Anime films. */
	public animeFilms: AnimeFilm[] = [
		{ titleEng: 'f1', airedStart: new Date(2001, 4, 23) },
		{ titleEng: 'f2', airedStart: new Date(2006, 2, 11) },
	];
}
