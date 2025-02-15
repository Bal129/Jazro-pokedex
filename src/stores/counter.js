import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
	id: "counter",
	state: () => ({
		id: 0,
		name: "pokemon",
		sprites: {},
		types: {},
		height: 0,
		weight: 0,
		abilities: {},
		base_experience: 0,
		stats: {},
		locations: {}
	})
})
