document.addEventListener('DOMContentLoaded', async() => {

	const gameSession = new Game.GameSession([
		await Game.Player.create('Avdey', Game.PlayerType.RealPlayer),
		await Game.Player.create('E12XR', Game.PlayerType.Computer),
		await Game.Player.create('Denis', Game.PlayerType.RealPlayer),
		await Game.Player.create('Andrey', Game.PlayerType.RealPlayer),
		await Game.Player.create('mr. Robot', Game.PlayerType.Computer),
	]);
});
