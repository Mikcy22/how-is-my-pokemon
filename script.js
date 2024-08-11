function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    return fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json());
}

function showRandomPokemons() {
    const pokemonInfoDiv = document.getElementById("pokemonInfo");
    pokemonInfoDiv.innerHTML = ''; // Limpiar contenido previo

    const promises = [];
    for (let i = 0; i < 6; i++) {
        promises.push(getRandomPokemon());
    }

    Promise.all(promises)
        .then(pokemons => {
            pokemons.forEach(data => {
                const container = document.createElement('div');
                container.classList.add('pokemon-container');
                container.style.display = 'inline-block';
                container.style.margin = '10px';
                container.style.textAlign = 'center';

                const img = document.createElement('img');
                img.src = data.sprites.front_default;
                img.alt = data.name;

                const input = document.createElement('input');
                input.type = 'text';
                input.size = '10';
                input.placeholder = 'Nombre Pokémon';

                const name = document.createElement('h2');
                name.textContent = data.name.toUpperCase();
                name.style.display = 'none'; // Ocultar nombre real

                input.addEventListener('input', function() {
                    if (input.value.toLowerCase() === data.name) {
                        img.style.filter = 'brightness(1)';
                    } else {
                        img.style.filter = 'brightness(0)';
                    }
                });

                container.appendChild(img);
                container.appendChild(input);
                container.appendChild(name);
                pokemonInfoDiv.appendChild(container);
            });
        })
        .catch(error => {
            pokemonInfoDiv.innerHTML = `<p>Error al obtener Pokémon.</p>`;
        });
}

// Mostrar los Pokémon al cargar la página
window.onload = showRandomPokemons;