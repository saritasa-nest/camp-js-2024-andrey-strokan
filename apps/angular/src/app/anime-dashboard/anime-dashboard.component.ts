import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, switchMap, Subscription } from 'rxjs';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSortModule, Sort } from '@angular/material/sort';

import { AnimeService } from '../services/anime.service';

import { Anime } from '../entities/anime';
import { SortConfig } from '../services/types/sortConfig';

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
	private readonly apiService = inject(AnimeService);

	/** Displayed columns. */
	protected readonly displayedColumns = ['imageSourceURL', 'title_eng', 'title_jpn', 'aired__startswith', 'type', 'status'] as const;

	/** Subjects. */
	private sortSubject$ = new BehaviorSubject<SortConfig | undefined>(undefined);

	// private paginationSubject$ = new BehaviorSubject<>({ active: '', direction: '' });

	/** Anime list. */
	protected anime$ = new Observable<Anime[]>();

	/** Subscriptions. */
	private subscriptions = new Subscription();

	/** Count of anime. */
	protected animeCount = 0;

	/** Page size. */
	protected pageSize = 0;

	/** Current page. */
	protected pageIndex = 0;

	/** Page sizes. */
	protected pageSizeOptions = [5, 10, 25];

	/** @inheritdoc */
	public ngOnInit(): void {
		this.anime$ = this.sortSubject$.pipe(
			switchMap(sortConfig => this.apiService.getAll(sortConfig)),
		);

		this.subscriptions.add(this.anime$.subscribe(animeList => {
			this.animeCount = animeList.length;
		}));

		this.pageSize = this.pageSizeOptions[0];
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
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
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
