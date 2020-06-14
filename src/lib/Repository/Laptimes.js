import Base from './Base.js';

class Laptimes extends Base {
	constructor(round) {
		super(`${round.year}/${round.race}/laps`);
	}
	load() {
		return super
			.load(2500)
			.then(({ RaceTable }) => RaceTable)
			.then(({ Races }) => Races);
	}
}

export default Laptimes;
