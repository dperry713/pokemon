// types.js

document.addEventListener('DOMContentLoaded', () => {
    const pokemonTypesContainer = document.getElementById('pokemon-types');

    // Function to fetch Pokémon types from PokeAPI
    const fetchPokemonTypes = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type');
            if (!response.ok) {
                throw new Error('Failed to fetch Pokémon types');
            }

            const data = await response.json();
            displayPokemonTypes(data.results);
        } catch (error) {
            pokemonTypesContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        }
    };

    // Function to display Pokémon types on the page
    const displayPokemonTypes = (types) => {
        pokemonTypesContainer.innerHTML = types.map(type => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card text-center bg-light">
                    <div class="card-body">
                        <h5 class="card-title text-capitalize">${type.name}</h5>
                        <a href="#" class="btn btn-primary" data-type-url="${type.url}">Explore</a>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to the "Explore" buttons for each type
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const typeUrl = button.getAttribute('data-type-url');
                fetchPokemonsByType(typeUrl);
            });
        });
    };

    // Function to fetch Pokémon by type
    const fetchPokemonsByType = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch Pokémon by type');
            }

            const data = await response.json();
            displayPokemonsByType(data.pokemon);
        } catch (error) {
            pokemonTypesContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        }
    };

    // Function to display Pokémon list for a specific type
    const displayPokemonsByType = (pokemons) => {
        pokemonTypesContainer.innerHTML = pokemons.map(pokemonData => `
            <div class="col-lg-3 col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title text-center text-capitalize">${pokemonData.pokemon.name}</h6>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // Fetch and display Pokémon types on page load
    fetchPokemonTypes();
});
