import Base from './Base.js';
import Round from './Round.js';

class Season extends Base {
	constructor(...args) {
		super(...args);
		this.rounds = new Map();
	}
	load() {
		return super
			.load()
			.then(({ RaceTable }) => RaceTable)
			.then(({ Races }) => Races);
	}
	round(round) {
		if (!this.rounds.has(round)) {
			this.rounds.set(round, new Round(round, this));
		}
		return this.rounds.get(round);
	}
}

export default Season;
