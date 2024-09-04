import { Injectable } from '@angular/core';

import { AnimeSortField } from '../enums/anime-sort-field';

import { AnimeTableColumn } from '../enums/anime-table-column';

import { Mapper } from './baseClasses/mapper';

/**
 * Anime mapper.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeSortFieldMapper implements Mapper<AnimeTableColumn, AnimeSortField> {

	/** @inheritdoc */
	public map(input: AnimeTableColumn): AnimeSortField {
		switch (input) {
			case AnimeTableColumn.TitleEnglish: return AnimeSortField.TitleEnglish;
			case AnimeTableColumn.Status: return AnimeSortField.Status;
			case AnimeTableColumn.AiredStart: return AnimeSortField.AiredStart;

			default: throw new Error('Unknown Anime Type');
		}
	}
}
