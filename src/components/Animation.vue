<template>
	<div class="animation" v-on="$listeners">
		<svg
			:viewBox="circuitViewBox"
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
		>
			<path
				fill="none"
				stroke="lightgrey"
				:d="circuitPath"
				stroke-width="5"
			/>
			<g v-for="(laptimes, index) in driverLaptimes" :key="index">
				<Car
					v-on="$listeners"
					:circuitPath="circuitPath"
					:driver="index"
					:laptimes="laptimes"
					:start="start"
				/>
			</g>
		</svg>

		<Loader :loading="loading" />
	</div>
</template>

<script>
import Car from './Car.vue';
import Loader from './Loader.vue';

export default {
	name: 'Animation',
	props: {
		laptimes: Array,
		default: [],
		circuitId: String,
	},
	data() {
		return {
			lapCounter: 0,
			speed: 1,
			driverLaptimes: [],
			start: false,
		};
	},
	computed: {
		circuitPath() {
			return circuitPaths[this.circuitId]
				? circuitPaths[this.circuitId].path
				: circuitPaths.potato.path;
		},
		circuitViewBox() {
			return circuitPaths[this.circuitId]
				? circuitPaths[this.circuitId].viewBox
				: circuitPaths.potato.viewBox;
		},
		loading() {
			return !this.laptimes.length;
		},
	},
	components: {
		Car,
		Loader,
	},
	mounted() {
		const driverLaptimes = {};
		for (let i = 0; i < this.laptimes.length; ++i) {
			const { Timings } = this.laptimes[i];
			for (let j = 0; j < Timings.length; ++j) {
				const { driverId, time } = Timings[j];
				if (!(driverId in driverLaptimes)) {
					driverLaptimes[driverId] = [];
				}
				driverLaptimes[driverId].push(time);
			}
		}
		this.driverLaptimes = driverLaptimes;
	},
};

const circuitPaths = {
	potato: {
		path:
			'M97.7120133,0.883591521 C98.7111388,0.852354965 111.171313,0.906435395 112.107995,0.883591521 C128.706153,0.478794496 129.463134,1.34242739 146.733179,4.77047433 C161.281602,7.65828817 176.042102,12.706201 183.224003,21.5314717 C192.078773,32.4123984 195.015779,55.5135999 183.224003,60.6414534 C175.015977,64.2108526 156.603566,65.0486203 149.779768,68.3538975 C142.686017,71.7899335 133.201337,82.9831836 133.106518,83.1030882 C123.283679,95.5247158 86.7450876,90.3143582 58.5309155,85.3403803 C50.85658,83.987444 27.1206255,80.925541 21.1342829,78.7322367 C14.3535499,76.24788 8.00711487,74.8251091 4.97448675,70.2155318 C3.59716598,68.1220121 1.94596501,62.913484 1.60464441,60.6414534 C0.817714941,55.4031883 0.861874177,50.1012731 1.41108262,44.8497551 C2.84112652,31.1757094 4.67788823,24.9349159 24.0041257,20.0435439 C32.7976883,17.8179381 44.6247682,16.9120234 46.2898973,16.1749157 C53.1677818,13.1302617 51.4212464,7.57242175 58.5309155,4.77047433 C66.8019264,1.51083775 69.5529339,0.883591521 74.278912,0.883591521 L97.7120133,0.883591521 Z',
		viewBox: '0 0 300 150',
	},
	BAK: {
		path:
			'M595.946507,122.360875 C615.351116,114.175522 629.746659,108.079654 636.6,105.15 C642.14,102.78 632.08,87.12 599.08,12.55 C596.85,7.53 596.85,5.73 592.51,4.27 C589.96,3.44 583.82,6.71 579.51,8.44 C530.02,28.32 477.43,49.48 429.32,70.93 C424.56,73.05 422.93,72.54 421.51,75.87 C420.38,78.49 422.49,81.55 423.68,84.14 C426.54,90.38 446.8,132.17 447.38,136.14 C447.96,140.11 444.12,141.99 440.46,143.78 C430.26,148.77 348.02,185.66 330.86,194.02 C326.34,196.22 322.22,200.08 319.95,201.47 C308.16,208.68 300.79,214.11 289.01,221.31 C284.5,224.01 283.91,224.19 283.5,228.31 C283.22,231.26 290.38,239.05 285.67,241.31 C277.11,245.4 218.42,292.36 214.42,293.21 C208.54,294.47 211.08,290.81 201.79,299.02 C193.18,306.66 199.54,311.8 192.54,312.66 C189.27,313.06 177.49,267.22 173.63,257.99 C170.97,251.64 169.33,258.63 166.05,256.35 C160.43,252.42 162.83,252.41 156.51,251.8 C152.19,251.38 149.91,254.89 143.72,252.18 C138,249.68 139.4,231.87 131,233.76 C105.63,239.49 49.2,269 28.37,283.02 C19.31,289.09 6.92,340.62 5.55,346.62 C2.96,357.91 8.61,401.96 8.96,404.7 C9.68,410.28 6.38,419.53 9.27,421.63 C12.59,424.03 13.77,423.03 17.98,425.03 C21.9,426.93 98.77,467.11 104.68,468.83 C107.11,469.54 113.04,468.09 115.5,459.76 C116.99,454.72 128.94,419.2 138.69,410.52 L186.53,365.94 C192.3,362.34 199.9,327.21 202.84,321.34 C204.75,317.59 287.5,255.64 299.75,247.8 C302.85,245.82 328.02,234.29 339.17,229.69 C414.750149,198.499088 517.311777,155.492594 581.315296,128.528611z',
		viewBox: '0 0 692 511',
	},
};
</script>

<style scoped>
.animation {
	position: relative;
	padding: 40px;
}
</style>
