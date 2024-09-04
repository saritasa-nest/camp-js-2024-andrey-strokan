import { Injectable } from '@angular/core';

import { AnimeTableColumn } from '../enums/anime-table-column';

import { Mapper } from './baseClasses/mapper';

/**
 * Anime mapper.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeTableColumnMapper implements Mapper<string, AnimeTableColumn> {

	/** @inheritdoc */
	public map(input: string): AnimeTableColumn {
		switch (input) {
			case AnimeTableColumn.ImageSourceURL: return AnimeTableColumn.ImageSourceURL;
			case AnimeTableColumn.TitleEnglish: return AnimeTableColumn.TitleEnglish;
			case AnimeTableColumn.TitleJapanese: return AnimeTableColumn.TitleJapanese;
			case AnimeTableColumn.AiredStart: return AnimeTableColumn.AiredStart;
			case AnimeTableColumn.Type: return AnimeTableColumn.Type;
			case AnimeTableColumn.Status: return AnimeTableColumn.Status;

			default: throw new Error('Unknown Anime Type');
		}
	}
}
