class Base {
	constructor(endpoint, parent) {
		this.endpoint = endpoint;
		this.parent = parent;
	}
	get path() {
		const {
			parent: { path = '//ergast.com/api/f1' } = {},
			endpoint,
		} = this;
		return `${path}/${endpoint}`;
	}
	load(limit) {
		return fetch(`${this.path}.json${limit ? `?limit=${limit}` : ''}`)
			.then((response) => response.json())
			.then(({ MRData }) => MRData);
	}
	static for(endpoint) {
		this.cache = this.cache || new Map();
		if (!this.cache.has(endpoint)) {
			this.cache.set(endpoint, new this(endpoint));
		}
		return this.cache.get(endpoint);
	}
}

export default Base;
