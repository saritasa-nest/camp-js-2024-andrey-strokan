import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, switchMap, map, shareReplay, combineLatest, Subscription } from 'rxjs';

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSortModule, Sort } from '@angular/material/sort';

import { AnimeService } from '../services/anime.service';
import { Anime } from '../entities/anime';

import { Anime } from '../entities/anime';

import { AnimeData } from '../entities/animeData';

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
export class AnimeDashboardComponent implements OnInit {

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

	/** Anime data. */
	private animeData$ = new Observable<AnimeData>();

	/** Pagination subject. */
	protected paginationSubject$ = new BehaviorSubject<PaginationConfig>({ pageIndex: 0, pageSize: this.pageSizeOptions[0] });

	/** Anime list. */
	protected animeOnPage$ = new Observable<Anime[]>();

	/** Total count of Anime. */
	protected totalAnimeCount$ = new Observable<number>();

	/**
	 * Serves to optimize the redrawing of table elements.
	 * @param _index Anime index.
	 * @param anime Anime.
	 * @returns Anime's id.
	 */
	protected trackAnimeById(_index: number, anime: Anime): number {
		return anime.id;
	}

	/** Anime list. */
	protected animeCount$ = new Observable<number>();

	/** Subscriptions. */
	private subscriptions = new Subscription();

	/** @inheritdoc */
	public ngOnInit(): void {

		// Subjects.
		this.animeData$ = combineLatest([
			this.sortSubject$,
			this.paginationSubject$,
		]).pipe(
			switchMap(
				([sortConfig, paginationConfig]) => this.animeService.getAll(sortConfig, paginationConfig),
			),
			shareReplay({ bufferSize: 1, refCount: true }),
		);

		this.animeOnPage$ = this.animeData$.pipe(
			map(animeList => animeList.pageData),
		);

		this.totalAnimeCount$ = this.animeData$.pipe(
			map(animeList => animeList.totalCount),
		);
	}

	/**
	 * Handle page event.
	 * @param e PageEvent.
	 */
	protected handlePageEvent(e: PageEvent): void {
		// Mapping PageEvent to PaginationConfig.
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
