// search.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pokemon-search-form');
    const pokemonInput = document.getElementById('pokemon-input');
    const pokemonData = document.getElementById('pokemon-data');

    // Function to fetch Pokémon data from PokeAPI
    const fetchPokemon = async (query) => {
        try {
            // Clear any previous data
            pokemonData.innerHTML = '';

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }

            const pokemon = await response.json();
            displayPokemonData(pokemon);
        } catch (error) {
            pokemonData.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        }
    };

    // Function to display fetched Pokémon data
    const displayPokemonData = (pokemon) => {
        const types = pokemon.types.map(type => type.type.name).join(', ');
        const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');

        pokemonData.innerHTML = `
            <div class="card mx-auto" style="width: 18rem;">
                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (#${pokemon.id})</h5>
                    <p class="card-text"><strong>Type:</strong> ${types}</p>
                    <p class="card-text"><strong>Abilities:</strong> ${abilities}</p>
                    <p class="card-text"><strong>Height:</strong> ${pokemon.height / 10} m</p>
                    <p class="card-text"><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
                    <a href="details.html?id=${pokemon.id}" class="btn btn-primary">More Details</a>
                </div>
            </div>
        `;
    };

    // Event listener for the form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = pokemonInput.value.trim();
        if (query) {
            fetchPokemon(query);
        } else {
            pokemonData.innerHTML = '<p class="text-warning">Please enter a valid Pokémon name or ID</p>';
        }
    });
});
