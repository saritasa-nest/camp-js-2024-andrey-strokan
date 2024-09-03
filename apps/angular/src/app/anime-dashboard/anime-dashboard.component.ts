import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, switchMap, map, shareReplay, combineLatest, Subscription } from 'rxjs';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSortModule, Sort } from '@angular/material/sort';

import { AnimeService } from '../services/anime.service';
import { Anime } from '../entities/anime';

import { AnimeData } from '../entities/anime-data';

import { SortConfig } from '../types/sortConfig';
import { PaginationConfig } from '../types/paginationConfig';
import { ApiSideKeyAnimeType, DisplayedAnimeType } from '../enums/anime-type';
import { AnimeTypeMapper } from '../mappers/anime-type.mapper';
import { AnimeTableColumn } from '../enums/anime-table-column';
import { AnimeSortFieldMapper } from '../mappers/anime-sort-field.mapper';
import { AnimeTableColumnMapper } from '../mappers/anime-table-column.mapper';

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
		NgOptimizedImage,
	],
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent implements OnInit, OnDestroy {

	/** Anime table column.  */
	protected animeTableColumn = AnimeTableColumn;

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
	] as const;

	/** Page sizes. */
	protected readonly pageSizeOptions = [5, 10, 25] as const;

	/** Displayed columns. */
	protected readonly displayedColumns = [
		AnimeTableColumn.ImageSourceURL,
		AnimeTableColumn.TitleEnglish,
		AnimeTableColumn.TitleJapanese,
		AnimeTableColumn.AiredStart,
		AnimeTableColumn.Type,
		AnimeTableColumn.Status,
	] as const;

	private readonly animeService = inject(AnimeService);

	private readonly animeTypeMapper = inject(AnimeTypeMapper);

	private readonly animeSortFieldMapper = inject(AnimeSortFieldMapper);

	private readonly animeTableColumnMapper = inject(AnimeTableColumnMapper);

	private readonly sortSubject$ = new BehaviorSubject<SortConfig | undefined>(undefined);

	private readonly paginationConfig: PaginationConfig = { pageIndex: 0, pageSize: this.pageSizeOptions[0] };

	private readonly typeFilterSubject$ = new BehaviorSubject<ApiSideKeyAnimeType[] | undefined>(undefined);

	private readonly subscriptions = new Subscription();

	private animeData$ = new Observable<AnimeData>();

	/** Filtering types Control. */
	protected readonly filteringTypes = new FormControl<DisplayedAnimeType[] | undefined>(undefined);

	/** Search string Control. */
	protected readonly searchString = new FormControl<string>('');

	/** Pagination subject. */
	protected readonly paginationSubject$ = new BehaviorSubject<PaginationConfig>(this.paginationConfig);

	/** Search subject. */
	protected readonly searchSubject$ = new BehaviorSubject<string>('');

	/** Anime count. */
	protected readonly animeCount$ = new Observable<number>();

	/** Anime list on page. */
	protected animeOnPage$ = new Observable<Anime[]>();

	/** Total count of Anime. */
	protected totalAnimeCount$ = new Observable<number>();

	/** @inheritdoc */
	public ngOnInit(): void {

		this.subscriptions.add(this.filteringTypes.valueChanges.subscribe(
			() => {
				if (this.filteringTypes.value == null) {
					this.typeFilterSubject$.next(undefined);
					return;
				}

				const apiKeys = this.filteringTypes.value.map<ApiSideKeyAnimeType>(item => this.animeTypeMapper.map(item));
				this.typeFilterSubject$.next(apiKeys);
			},
		));

		this.subscriptions.add(this.searchString.valueChanges.subscribe(
			() => {
				if (this.searchString.value != null) {
					this.searchSubject$.next(this.searchString.value);
				}
			},
		));

		// Subjects.
		this.animeData$ = combineLatest([
			this.sortSubject$,
			this.paginationSubject$,
			this.typeFilterSubject$,
			this.searchSubject$,
		]).pipe(
			switchMap(
				([
					sortConfig,
					paginationConfig,
					typeFilterConfig,
					searchString,
				]) => this.animeService.getAll(sortConfig, paginationConfig, typeFilterConfig, searchString),
			),
			shareReplay({ bufferSize: 1, refCount: true }),
		);

		this.animeOnPage$ = this.animeData$.pipe(
			map(animeList => animeList.pageData),
		);

		this.totalAnimeCount$ = this.animeData$.pipe(
			map(animeList => animeList.totalCount),
		);

		this.subscriptions.add(this.searchSubject$.subscribe(() => {
			this.resetPageIndex();
		}));

		this.subscriptions.add(this.typeFilterSubject$.subscribe(() => {
			this.resetPageIndex();
		}));
	}

	private resetPageIndex(): void {
		this.paginationConfig.pageIndex = 0;
		this.paginationSubject$.next(this.paginationConfig);
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
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
			sortField: this.animeSortFieldMapper.map(this.animeTableColumnMapper.map(sort.active)),
			sortOrder: sort.direction,
		};

		this.sortSubject$.next(sortConfig);
	}

	/**
	 * Serves to optimize the redrawing of table elements.
	 * @param _index Anime index.
	 * @param anime Anime.
	 * @returns Anime's id.
	 */
	protected trackAnimeById(_index: number, anime: Anime): number {
		return anime.id;
	}
}
