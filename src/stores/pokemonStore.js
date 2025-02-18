import { defineStore } from 'pinia'

export const usePokemonStore = defineStore({
    id: "pokemon",
    state: () => ({
        id: "0",
        name: "Name",
        sprite: "Sprite",
        types: "Type",
        color: "black",
        abilities: "Ability",
        flavor_text: "Flavor Text",
        base_exp: 0,
        height: 0,
        weight: 0,
        base_stats: {
            hp: 0,
            atk: 0,
            dfs: 0,
            sp_atk: 0,
            sp_dfs: 0,
            spd: 0
        },
        base_happiness: 0,
        capture_rate: 0,
        growth_rate: "n/a",
        evolutions: "n/a",
        locations_url: "",
        location_info: {}
    }),
    actions: {
        setPokemonData(pokemonData) {
            this.id = pokemonData.id;
            this.name = pokemonData.name;
            this.sprite = pokemonData.sprite;
            this.types = pokemonData.types;
            this.color = pokemonData.color;
            this.abilities = pokemonData.abilities;
            this.flavor_text = pokemonData.flavor_text;
            this.base_exp = pokemonData.base_exp;
            this.height = pokemonData.height;
            this.weight = pokemonData.weight;
            this.base_stats = pokemonData.base_stats;
            this.base_happiness = pokemonData.base_happiness;
            this.capture_rate = pokemonData.capture_rate;
            this.growth_rate = pokemonData.growth_rate;
            this.evolutions = pokemonData.evolutions;
            this.locations_url = pokemonData.locations_url;
            this.location_info = pokemonData.location_info;
        }
    }
})