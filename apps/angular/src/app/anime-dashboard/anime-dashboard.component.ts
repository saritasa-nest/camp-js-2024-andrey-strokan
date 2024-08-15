import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { AnimeFilm } from './types/animeFilm';
import { FilmType } from './enums/filmType';

/** Anime dashboard. */
@Component({
	selector: 'camp-anime-dashboard',
	standalone: true,
	imports: [CommonModule, MatTableModule, DatePipe],
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent {

	/** Displayed columns. */
	public displayedColumns: string[] = ['imageSourceURL', 'titleEnglish', 'titleJapan', 'airedStart', 'filmType'];

	/** Anime films. */
	public animeFilms: AnimeFilm[] = [
		{
			imageSourceURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/94/NarutoCoverTankobon1.jpg/220px-NarutoCoverTankobon1.jpg',
			titleEnglish: 'Naruto',
			titleJapan: 'ナルト',
			airedStart: new Date(1999, 9, 21),
			filmType: FilmType.Anime,
		},
		{
			imageSourceURL: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg',
			titleEnglish: 'Attack on Titan',
			titleJapan: '進撃の巨人',
			airedStart: new Date(2013, 11, 19),
			filmType: FilmType.Horror,
		},
	];
}
