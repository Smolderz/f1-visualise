<template>
	<g>
		<g
			class="driver"
			:class="this.driver"
			transform="scale(.015) rotate(90)"
		>
			<g transform="translate(0 578)">
				<path fill="#9B9B9B" d="M77 60h312v30H77z" />
				<rect width="110" height="150" fill="#000" rx="10" />
				<rect width="110" height="150" x="360" fill="#000" rx="10" />
			</g>
			<g transform="translate(0 108)">
				<path fill="#9B9B9B" d="M77 60h312v30H77z" />
				<rect width="110" height="150" fill="#000" rx="10" />
				<rect width="110" height="150" x="360" fill="#000" rx="10" />
			</g>
			<g fill="#37C4F7">
				<!-- front wing -->
				<path d="M50 31l184-10 183 10v57H50z" />
				<path
					fill="#000"
					fill-opacity="0.1"
					d="M50 687l184-10 183 10v107H50z"
				/>

				<!-- body -->
				<path
					d="M167 698L77 398l70-20 56-358c10-13 20-20 30-20s20 7 30 20l56 358 70 20-90 300H167z"
				/>

				<!-- back wing -->
				<path d="M50 687l184-10 183 10v107H50z" />
				<path
					fill="#000"
					fill-opacity="0.1"
					d="M50 687l184-10 183 10v107H50z"
				/>
			</g>
			<path
				fill="#000"
				d="M280 503v20c0 6-4 10-10 10h-70c-6 0-10-4-10-10v-20h90zm-45-154c24 0 44 19 44 43v1h1v80h-90v-80h1c0-24 20-44 44-44z"
			/>
		</g>
		<animateMotion
			:class="'animate-driver-' + this.driver"
			:dur="lapTimeS"
			:path="circuitPath"
			rotate="auto"
			:repeatCount="numberOfLaps"
			restart="indefinite"
			@repeatEvent="eventRepeated"
			@endEvent="eventEnd"
		/>
	</g>
</template>

<script>
export default {
	name: 'car',
	props: {
		circuitPath: String,
		carInfo: Object,
		driver: String,
		laptimes: Array,
		start: Boolean,
	},
	data() {
		return {
			speed: 15,
			lapCounter: 0,
		};
	},
	methods: {
		lapTime() {
			if (this.laptimes[this.lapCounter]) {
				let laptime = this.laptimes[this.lapCounter];
				let laptimeSplit = laptime.split(':');

				return (
					(laptimeSplit[0] * 60 + parseFloat(laptimeSplit[1])) /
					this.speed
				);
			} else {
				return 0;
			}
		},
		nextLap() {
			if (this.lapTime()) {
				if (this.lapCounter == 0) {
					console.log(this.driver + ' starts');
				} else {
					console.log(this.driver + ' next lap');
				}
				//  start next lap
				document
					.querySelector('.animate-driver-' + this.driver)
					.beginElement();
			}

			this.lapCounter++;
		},
		eventRepeated() {
			this.$emit('next-lap', { lap: this.lapCounter });

			this.nextLap();
		},
		eventEnd() {
			if (this.lapCounter == this.numberOfLaps) {
				console.log(this.driver + ' finished!');
			}
		},
	},
	computed: {
		numberOfLaps() {
			return this.laptimes.length;
		},
		lapTimeS() {
			return this.lapTime() ? this.lapTime() + 's' : 0 + 's';
		},
	},
	components: {},
	mounted() {
		this.nextLap();
	},
};
</script>

<style scoped>
html,
body,
svg {
	height: 100%;
	margin: 0;
	padding: 0;
	display: block;
}

svg path:not([fill]) {
	fill: var(--car-color, #f596c8);
}

.driver.bottas {
	--car-color: #00d2be;
}
.driver.button {
	--car-color: black;
}
.driver.webber {
	--car-color: blue;
}
.driver.vettel {
	--car-color: blue;
}
.driver.alonso {
	--car-color: red;
}
.driver.rosberg {
	--car-color: gray;
}
.driver.maldonado {
	--car-color: white;
}
.driver.raikkonen {
	--car-color: gold;
}
.driver.kobayashi {
	--car-color: white;
}
.driver.massa {
	--car-color: red;
}
.driver.perez {
	--car-color: pink;
}
.driver.resta {
	--car-color: orange;
}
.driver.hulkenberg {
	--car-color: orange;
}
.driver.vergne {
	--car-color: darkblue;
}
.driver.kovalainen {
	--car-color: black;
}
.driver.michael_schumacher {
	--car-color: gray;
}
.driver.ricciardo {
	--car-color: darkblue;
}
.driver.petrov {
	--car-color: white;
}
.driver.glock {
	--car-color: green;
}
.driver.pic {
	--car-color: green;
}
.driver.grosjean {
	--car-color: gold;
}
.driver.karthikeyan {
	--car-color: gold;
}
.driver.rosa {
	--car-color: black;
}
.driver.bruno_senna {
	--car-color: white;
}
</style>
