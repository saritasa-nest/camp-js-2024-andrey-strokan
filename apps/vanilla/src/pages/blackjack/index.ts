import { GameSession } from './game/gameSession';
import { Player } from './game/player';
import { PlayerType } from './game/enums/playerType';

document.addEventListener('DOMContentLoaded', async() => {

	const gameSession = new GameSession(await Promise.all([
		Player.create('Avdey', PlayerType.RealPlayer),
		Player.create('E12XR', PlayerType.Computer),
		Player.create('Denis', PlayerType.RealPlayer),
		Player.create('Andrey', PlayerType.RealPlayer),
		Player.create('mr. Robot', PlayerType.Computer),
	]));
});
