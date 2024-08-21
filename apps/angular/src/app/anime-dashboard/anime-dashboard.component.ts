import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSortModule, Sort } from '@angular/material/sort';

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
		MatSortModule,
	],
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent implements OnInit {

	/** Services. */
	private readonly apiService = inject(AnimeService);

	/** Displayed columns. */
	protected readonly displayedColumns = ['imageSourceURL', 'titleEnglish', 'titleJapan', 'airedStart', 'type', 'status'] as const;

	/** Subjects. */
	private sortSubject$ = new BehaviorSubject<Sort>({ active: '', direction: '' });

	/** Anime list. */
	protected anime$ = new Observable<Anime[]>();

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

		//	this.animeCount = list.length;

		// this.loadAnime();
		this.pageSize = this.pageSizeOptions[0];
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
		this.sortSubject$.next(sort);
	}
}
