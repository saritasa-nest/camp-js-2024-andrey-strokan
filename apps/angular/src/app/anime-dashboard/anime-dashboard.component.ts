import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription, map } from 'rxjs';

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

	/** Services. */
	private readonly apiService = inject(AnimeService);

	/** Displayed columns. */
	protected readonly displayedColumns = ['imageSourceURL', 'titleEnglish', 'titleJapan', 'airedStart', 'type', 'status'] as const;

	/** All anime. */
	protected readonly allAnime$ = this.apiService.getAll();

	/** Visible anime. */
	protected visibleAnime$ = new Observable<Anime[]>();

	/** Count of anime. */
	protected animeCount = 0;

	/** Page size. */
	protected pageSize = 0;

	/** Current page. */
	protected pageIndex = 0;

	/** Page sizes. */
	protected pageSizeOptions = [5, 10, 25];

	/** Show page size options. */
	protected showPageSizeOptions = true;

	private subscription: Subscription = new Subscription();

	/** @inheritdoc */
	public ngOnInit(): void {
		this.subscription = this.allAnime$.subscribe(allAnime => {
			this.animeCount = allAnime.length;
		});

		this.pageSize = this.pageSizeOptions[0];
		this.updateVisibleAnime();
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

		this.updateVisibleAnime();
	}

	private updateVisibleAnime(): void {
		this.visibleAnime$ = this.allAnime$.pipe(
			map(allAnime => allAnime.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)),
		);
	}
}
