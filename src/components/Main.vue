<template>
	<div>
		<RaceSelector @race-selected="openRace" />
		<div class="lapcounter" v-text="lapCounterDisplay"></div>
		<Animation
			:laptimes="laptimes"
			@next-lap="nextLap"
			:circuitId="circuitId"
			v-if="laptimes.length"
		/>
	</div>
</template>

<script>
import RaceSelector from './RaceSelector.vue';
import Animation from './Animation.vue';

import Laptimes from '../lib/Repository/Laptimes.js';

export default {
	name: 'main-page',
	data() {
		return {
			circuitId: '',
			laptimes: [],
			lapCounter: 1,
			lapCounterDisplay: 'Lap 0 / 0',
		};
	},
	methods: {
		openRace(round) {
			this.circuitId = round.circuitId;

			const allLaptimes = Laptimes.for(round);
			allLaptimes.load().then((json) => {
				console.log('loading laps done! ');
				this.laptimes = json[0].Laps;
			});
		},
		nextLap(event) {
			if (event.lap > this.lapCounter) {
				this.lapCounter = event.lap;
			}

			this.lapCounterDisplay =
				'Lap ' + (this.lapCounter + 1) + ' / ' + this.laptimes.length;
		},
	},
	components: {
		RaceSelector,
		Animation,
	},
};
</script>

<style scoped>
.lapcounter {
	text-align: center;
}
</style>
