// details.js

document.addEventListener('DOMContentLoaded', () => {
    const pokemonDetails = document.getElementById('pokemon-details');

    // Function to extract Pokémon ID from URL parameters
    const getPokemonIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    // Function to fetch Pokémon details from PokeAPI
    const fetchPokemonDetails = async (id) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) {
                throw new Error('Pokémon details not found');
            }

            const pokemon = await response.json();
            displayPokemonDetails(pokemon);
        } catch (error) {
            pokemonDetails.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        }
    };

    // Function to display Pokémon details on the page
    const displayPokemonDetails = (pokemon) => {
        const types = pokemon.types.map(type => type.type.name).join(', ');
        const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');

        pokemonDetails.innerHTML = `
            <div class="card mx-auto" style="width: 20rem;">
                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h3 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (#${pokemon.id})</h3>
                    <p class="card-text"><strong>Type:</strong> ${types}</p>
                    <p class="card-text"><strong>Abilities:</strong> ${abilities}</p>
                    <p class="card-text"><strong>Height:</strong> ${pokemon.height / 10} m</p>
                    <p class="card-text"><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
                    <p class="card-text"><strong>Base Stats:</strong></p>
                    <ul class="list-group">
                        ${pokemon.stats.map(stat => `
                            <li class="list-group-item">
                                <strong>${stat.stat.name}:</strong> ${stat.base_stat}
                            </li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    };

    // Fetch and display the Pokémon details when the page loads
    const pokemonId = getPokemonIdFromUrl();
    if (pokemonId) {
        fetchPokemonDetails(pokemonId);
    } else {
        pokemonDetails.innerHTML = '<p class="text-warning">No Pokémon ID provided in the URL.</p>';
    }
});
