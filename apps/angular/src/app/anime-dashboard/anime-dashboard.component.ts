import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, switchMap, tap, combineLatest, Subscription } from 'rxjs';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSortModule, Sort } from '@angular/material/sort';

import { AnimeService } from '../services/anime.service';
import { Anime } from '../entities/anime';

import { Anime } from '../entities/anime';
import { SortConfig } from '../types/sortConfig';
import { PaginationConfig } from '../types/paginationConfig';

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
		MatSortModule,
	],
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent implements OnInit, OnDestroy {

	/** Services. */
	private readonly animeService = inject(AnimeService);

	/** Displayed columns. */
	protected readonly displayedColumns = ['imageSourceURL', 'titleEnglish', 'titleJapanese', 'airedStart', 'type', 'status'] as const;

	/** All anime. */
	protected readonly allAnime$ = this.animeService.getAll();
	/** Page sizes. */
	protected readonly pageSizeOptions = [5, 10, 25];

	/** Subjects. */
	private sortSubject$ = new BehaviorSubject<SortConfig | undefined>(undefined);

	/** Pagination subject. */
	protected paginationSubject$ = new BehaviorSubject<PaginationConfig>({ pageIndex: 0, pageSize: this.pageSizeOptions[0] });

	/** Anime list. */
	protected anime$ = new Observable<Anime[]>();

	/**
	 * Serves to optimize the redrawing of table elements.
	 * @param _index Anime index.
	 * @param anime Anime.
	 * @returns Anime's id.
	 */
	protected trackAnimeById(_index: number, anime: Anime): number {
		return anime.id;
	}

	/** Subscriptions. */
	private subscriptions = new Subscription();

	/** Count of anime. */
	protected animeCount = 0;

	/** @inheritdoc */
	public ngOnInit(): void {

		// Subjects.
		this.anime$ = combineLatest([
			this.sortSubject$,
			this.paginationSubject$,
		]).pipe(
			switchMap(([sortConfig, paginationConfig]) => this.animeService.getAll(sortConfig, paginationConfig)),
		);

		// Subscriptions.
		this.subscriptions.add(this.anime$.subscribe(_animeList => {
			this.animeCount = this.animeService.getCount();
		}));
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		if (this.subscriptions != null) {
			this.subscriptions.unsubscribe();
		}
	}

	/**
	 * Handle page event.
	 * @param e PageEvent.
	 */
	protected handlePageEvent(e: PageEvent): void {
		const paginationConfig: PaginationConfig = {
			pageIndex: e.pageIndex,
			pageSize: e.pageSize,
		};

		this.paginationSubject$.next(paginationConfig);
	}

	/**
	 * On sort clicked.
	 * @param sort Sort.
	 */
	protected onSortClicked(sort: Sort): void {

		// Mapping Sort to SortConfig.

		if (sort.direction === '') {
			this.sortSubject$.next(undefined);
			return;
		}

		const sortConfig: SortConfig = {
			sortField: sort.active,
			sortOrder: sort.direction,
		};

		this.sortSubject$.next(sortConfig);
	}
}
