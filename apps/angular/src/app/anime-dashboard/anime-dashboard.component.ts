import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, switchMap, map, tap, shareReplay, combineLatest, Subscription } from 'rxjs';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSortModule, Sort } from '@angular/material/sort';

import { AnimeService } from '../services/anime.service';
import { Anime } from '../entities/anime';

import { Anime } from '../entities/anime';

import { AnimeData } from '../entities/animeData';

import { SortConfig } from '../types/sortConfig';
import { PaginationConfig } from '../types/paginationConfig';
import { ApiSideKeyAnimeType, DisplayedAnimeType, toApiSideKey } from '../enums/animeType';

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
		MatSelectModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
	],
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent implements OnInit, OnDestroy {
	/** Services. */
	protected filteringTypes = new FormControl<DisplayedAnimeType[] | undefined>(undefined);

	/** Displayed anime types. */
	protected readonly displayedAnimeTypes: DisplayedAnimeType[] = [
		DisplayedAnimeType.TV,
		DisplayedAnimeType.OVA,
		DisplayedAnimeType.Movie,
		DisplayedAnimeType.Special,
		DisplayedAnimeType.ONA,
		DisplayedAnimeType.Music,
		DisplayedAnimeType.PromotionalVideos,
		DisplayedAnimeType.Unknown,
	];

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

	private paginationConfig: PaginationConfig = { pageIndex: 0, pageSize: this.pageSizeOptions[0] };

	/** Pagination subject. */
	protected paginationSubject$ = new BehaviorSubject<PaginationConfig>(this.paginationConfig);

	/** Type Filter subject. */
	private typeFilterSubject$ = new BehaviorSubject<ApiSideKeyAnimeType[] | undefined>(undefined);

	/** Search subject. */
	// protected searchSubject$ = new BehaviorSubject<string>();

	/** Anime list. */
	protected animeOnPage$ = new Observable<Anime[]>();

	/** Total count of Anime. */
	protected totalAnimeCount$ = new Observable<number>();

	private subscription: Subscription = new Subscription();
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

		this.filteringTypes.valueChanges.subscribe(
			() => {
				if (this.filteringTypes.value == null) {
					this.typeFilterSubject$.next(undefined);
					return;
				}

				const apiKeys = this.filteringTypes.value.map<ApiSideKeyAnimeType>(item => toApiSideKey(item));
				this.typeFilterSubject$.next(apiKeys);
			},
		);

		// Subjects.
		this.animeData$ = combineLatest([
			this.sortSubject$,
			this.paginationSubject$,
			this.typeFilterSubject$,
		]).pipe(
			switchMap(
				([
					sortConfig,
					paginationConfig,
					typeFilterConfig,
				]) => this.animeService.getAll(sortConfig, paginationConfig, typeFilterConfig),
			),
			shareReplay({ bufferSize: 1, refCount: true }),
		);

		this.animeOnPage$ = this.animeData$.pipe(
			map(animeList => animeList.pageData),
		);

		this.totalAnimeCount$ = this.animeData$.pipe(
			map(animeList => animeList.totalCount),
		);

		this.subscription.add(this.typeFilterSubject$.subscribe(() => {
			this.paginationConfig.pageIndex = 0;
			this.paginationSubject$.next(this.paginationConfig);
		}));
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
		// Mapping PageEvent to PaginationConfig.
		this.paginationConfig.pageIndex = e.pageIndex;
		this.paginationConfig.pageSize = e.pageSize;
		this.paginationSubject$.next(this.paginationConfig);
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
