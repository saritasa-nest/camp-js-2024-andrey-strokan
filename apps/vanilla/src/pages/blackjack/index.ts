import { GameSession } from './game/gameSession';
import { Player } from './game/player';
import { PlayerType } from './game/enums/playerType';

document.addEventListener('DOMContentLoaded', async() => {

	const gameSession = new GameSession([
		await Player.create('Avdey', PlayerType.RealPlayer),
		await Player.create('E12XR', PlayerType.Computer),
		await Player.create('Denis', PlayerType.RealPlayer),
		await Player.create('Andrey', PlayerType.RealPlayer),
		await Player.create('mr. Robot', PlayerType.Computer),
	]);
});
