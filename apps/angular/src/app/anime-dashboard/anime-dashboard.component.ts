import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AnimeService } from '../services/anime.service';

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

	/** Services. */
	private readonly apiService = inject(AnimeService);

	/** Displayed columns. */
	protected readonly displayedColumns = ['imageSourceURL', 'titleEnglish', 'titleJapan', 'airedStart', 'type', 'status'] as const;

	/** All anime. */
	protected readonly allAnime$ = this.apiService.getAll();

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
