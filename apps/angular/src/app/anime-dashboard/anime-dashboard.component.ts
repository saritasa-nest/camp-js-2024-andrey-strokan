import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AnimeService } from '../services/anime.service';
import { Anime } from '../entities/anime';

/** Anime dashboard. */
@Component({
	selector: 'camp-anime-dashboard',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		DatePipe,
		MatPaginatorModule,
		MatProgressSpinnerModule,
	],
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent implements OnInit, OnDestroy {

	/** Service. */
	private readonly animeService = inject(AnimeService);

	/** Displayed columns. */
	protected readonly displayedColumns = ['imageSourceURL', 'titleEnglish', 'titleJapanese', 'airedStart', 'type', 'status'] as const;

	/** All anime. */
	protected readonly allAnime$ = this.animeService.getAll();

	/**
	 * Serves to optimize the redrawing of table elements.
	 * @param _index Anime index.
	 * @param anime Anime.
	 * @returns Anime's id.
	 */
	protected trackAnimeById(_index: number, anime: Anime): number {
		return anime.id;
	}

	/** Count of anime. */
	protected animeCount = 0;

	/** Page size. */
	protected pageSize = 0;

	/** Current page. */
	protected pageIndex = 0;

	/** Page sizes. */
	protected pageSizeOptions = [5, 10, 25];

	private subscription: Subscription = new Subscription();

	/** @inheritdoc */
	public ngOnInit(): void {
		this.subscription = this.allAnime$.subscribe(allAnime => {
			this.animeCount = allAnime.length;
		});

		this.pageSize = this.pageSizeOptions[0];
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	/**
	 * Handle page event.
	 * @param e PageEvent.
	 */
	protected handlePageEvent(e: PageEvent): void {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
	}
}
