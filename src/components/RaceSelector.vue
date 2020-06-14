
<template>
    <div>
        <select v-model="selectedYear" @change="yearChanged">
            <option :value="null" disabled>Select year</option>
            <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
        </select>
        <select v-model="selectedRace" @change="raceChanged" :disabled="seasonRaces.length == 0">
            <option :value="null" disabled>Select grand prix</option>
            <option
                v-for="race in seasonRaces"
                :value="race.round"
                :key="race.round"
            >{{ race.raceName }}</option>
        </select>
    </div>
</template>

<script>
import Season from "../lib/Repository/Season.js";

export default {
    name: "race-selector",
    data() {
        return {
            selectedYear: null,
            selectedRace: null,
            seasonRaces: []
        };
    },
    methods: {
        yearChanged() {
            const rounds = Season.for(this.selectedYear);
            rounds.load().then(json => (this.seasonRaces = json));
        },
        raceChanged() {
            this.$emit("race-selected", {
                year: this.selectedYear,
                race: this.selectedRace,
                circuitId: this.seasonRaces[this.selectedRace - 1].Circuit
                    .circuitId
            });
        }
    },
    computed: {
        years() {
            let years = [];
            let currentYear = new Date().getFullYear();
            for (let year = 1996; year < currentYear; year++) {
                years.push(year);
            }

            return years;
        }
    }
};
</script>

<style scoped>
select {
    height: 30px;
}
</style>