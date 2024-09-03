import { memo, FC } from 'react';
import { Genre } from '@js-camp/core/models/genre';

import styles from './GenreCard.module.css';

/** Props. */
interface Props {

	/** Genre. */
	readonly genre: Genre;
}

/** Card with genre data. */
const GenreCardComponent: FC<Props> = ({ genre }) => (
	<div className={styles.card}>
		<h2>{genre.name}</h2>
		<span>Id - {genre.id}</span>
	</div>
);

/** Genre Card. */
export const GenreCard = memo(GenreCardComponent);
