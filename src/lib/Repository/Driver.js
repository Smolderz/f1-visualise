import Base from './Base.js';

class Driver extends Base {
	constructor(name) {
		super(`drivers/${name}`);
	}
	load() {
		return super
			.load()
			.then(({ DriverTable: { Drivers } }) => Drivers.shift());
	}
}

export default Driver;
