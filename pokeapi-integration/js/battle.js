// battle.js

document.addEventListener('DOMContentLoaded', () => {
    const battleResult = document.getElementById('battle-result');
    const startBattleBtn = document.getElementById('start-battle');
    const pokemon1Input = document.getElementById('pokemon1');
    const pokemon2Input = document.getElementById('pokemon2');

    // Function to fetch Pokémon data from PokeAPI
    const fetchPokemonData = async (pokemonNameOrId) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId.toLowerCase()}`);
            if (!response.ok) {
                throw new Error(`Pokémon not found: ${pokemonNameOrId}`);
            }
            return await response.json();
        } catch (error) {
            battleResult.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
            throw error;
        }
    };

    // Function to calculate the winner based on stats
    const determineWinner = (pokemon1, pokemon2) => {
        const pokemon1Total = pokemon1.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
        const pokemon2Total = pokemon2.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

        let winner;
        if (pokemon1Total > pokemon2Total) {
            winner = pokemon1.name;
        } else if (pokemon2Total > pokemon1Total) {
            winner = pokemon2.name;
        } else {
            winner = 'It\'s a tie!';
        }

        displayBattleResult(pokemon1, pokemon2, winner, pokemon1Total, pokemon2Total);
    };

    // Function to display the battle result
    const displayBattleResult = (pokemon1, pokemon2, winner, pokemon1Total, pokemon2Total) => {
        battleResult.innerHTML = `
            <h3>Battle Results</h3>
            <div class="row">
                <div class="col-md-6">
                    <h4>${pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</h4>
                    <img src="${pokemon1.sprites.front_default}" alt="${pokemon1.name}">
                    <p>Total Stats: ${pokemon1Total}</p>
                </div>
                <div class="col-md-6">
                    <h4>${pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</h4>
                    <img src="${pokemon2.sprites.front_default}" alt="${pokemon2.name}">
                    <p>Total Stats: ${pokemon2Total}</p>
                </div>
            </div>
            <h4 class="mt-4">Winner: ${winner === 'It\'s a tie!' ? winner : winner.charAt(0).toUpperCase() + winner.slice(1)}</h4>
        `;
    };

    // Event listener for the "Start Battle" button
    startBattleBtn.addEventListener('click', async () => {
        const pokemon1Name = pokemon1Input.value.trim();
        const pokemon2Name = pokemon2Input.value.trim();

        if (!pokemon1Name || !pokemon2Name) {
            battleResult.innerHTML = '<p class="text-warning">Please enter names or IDs for both Pokémon.</p>';
            return;
        }

        try {
            const [pokemon1, pokemon2] = await Promise.all([
                fetchPokemonData(pokemon1Name),
                fetchPokemonData(pokemon2Name)
            ]);

            determineWinner(pokemon1, pokemon2);
        } catch (error) {
            // Error is handled within fetchPokemonData
        }
    });
});
