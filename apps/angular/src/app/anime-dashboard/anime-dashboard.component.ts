import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { AnimeService } from '../services/anime.service';

/** Anime dashboard. */
@Component({
	selector: 'camp-anime-dashboard',
	standalone: true,
	imports: [CommonModule, MatTableModule, DatePipe],
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent {

	/** Services. */
	private readonly apiService = inject(AnimeService);

	/** Displayed columns. */
	protected readonly displayedColumns = ['imageSourceURL', 'titleEnglish', 'titleJapanese', 'airedStart', 'type', 'status'] as const;

	/** All anime. */
	protected readonly allAnime$ = this.apiService.getAll();
}
