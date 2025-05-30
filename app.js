(function () {
    const responseContainer = document.querySelector('#response-container');
    const limit = 20;
    let offset = 0;

    window.addEventListener('load', function() {

        // fetch all pokemons with limit 20
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
            .then(response => response.json())
            .then(addPokemon)
            .catch(err => console.error(err)); 
            
        document.querySelector('.next').addEventListener('click', () => {
            offset += 20;
            responseContainer.innerHTML = "";
            // fetch the next 20 pokemons when clicking on the next button
            fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
                .then(response => response.json())
                .then(addPokemon)
                .catch(err => console.error(err)); 

                showLoadingScreen();
                setTimeout(function() {
                hideLoadingScreen();
                }, 200);
        });

        document.querySelector('.previous').addEventListener('click', () => {
            offset -= 20;
            if (offset < 0)
            {
                offset = 0;
                return
            }
            responseContainer.innerHTML = "";
            // fetch the previous 20 pokemons when clicking on the previous button
            fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
                .then(response => response.json())
                .then(addPokemon)
                .catch(err => console.error(err)); 

                showLoadingScreen();
                setTimeout(function() {
                hideLoadingScreen();
                }, 200);
        });
    
    });

    function addPokemon(data) {

        // disable button when offset is lower than 20
        if (offset < 20) {
            document.querySelector('.previous').disabled = true;
            document.querySelector('.previous').classList.add('disabled');
        } else {
            document.querySelector('.previous').disabled = false;
            document.querySelector('.previous').classList.remove('disabled');
        }

        data.results.forEach(element => {

            let div = document.createElement('div');
            div.classList.add('pokemon-info');

            // click div to open model
            div.addEventListener('click', () => {
                openModal(id);
                links.innerHTML = "";
                rechts.innerHTML= "";
                abilities.innerHTML= "";
                stats.innerHTML= "";
            });


            let url = element.url;
            let id = url.split("/")[6];

            let img = document.createElement('img');
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            div.appendChild(img);

            let isShiny = false;

            // toggle all images shiny
            logo.addEventListener('click', () => {
                toggleImageAll()
            });

            function toggleImageAll() {
                if (isShiny) {
                img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
                isShiny = false;
                } else {
                img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
                isShiny = true;
                }
            }

            let h3 = document.createElement('h3');
            h3.innerText = `${id}. ${element.name}`;
            div.appendChild(h3);

            responseContainer.appendChild(div);
        });
    }

    function openModal(id) {
        modal.style.display = 'block';
        // fetch the pokemon for the detail page
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => response.json())
                .then(addPokemon2)
                .catch(err => console.error(err)); 

        // Close the modal when the close button is clicked
        const closeButton = document.getElementsByClassName('close')[0];
        closeButton.onclick = function() {
            modal.style.display = 'none';
        };
    
        // Close the modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }


    // pokemon details
    function addPokemon2(data) {
        console.log(data)

        let img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
        links.appendChild(img);

        let isShiny = false;

        img.addEventListener('click', () => {
            toggleImage()
        });

        // shiny toggle
        function toggleImage() {
            if (isShiny) {
              img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
              isShiny = false;
            } else {
              img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${data.id}.png`;
              isShiny = true;
            }
        }

        // PokemonID + name text
        let h3 = document.createElement('h3');
        h3.innerText = `${data.id}. ${data.name}`;
        links.appendChild(h3)

        // previous button
        let buttonLeft = document.createElement('button')
        buttonLeft.innerText = "Previous";
        buttonLeft.classList.add("detailLeft");
        links.appendChild(buttonLeft)

        // next button
        let buttonRight = document.createElement('button')
        buttonRight.innerText = "Next";
        buttonRight.classList.add("detailRight");
        links.appendChild(buttonRight)

        let id = data.id;
        // If the PokemonID is less than or equal to 1, disable the left button
        if(id <= 1){
            buttonLeft.disabled = true;
            buttonLeft.classList.add('disabled');
        }else {
            buttonLeft.disabled = false;
            buttonLeft.classList.remove('disabled');
        }

        // fetch previous detailpokemon
        buttonLeft.addEventListener('click', () => {
            links.innerHTML = "";
            rechts.innerHTML= "";
            abilities.innerHTML= "";
            stats.innerHTML= "";

            let id = data.id;
            console.log(id)

            id -= 1;

            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => response.json())
                .then(addPokemon2)
                .catch(err => console.error(err)); 
                
        });

        // fetch next detailpokemon
        buttonRight.addEventListener('click', () => {
            links.innerHTML = "";
            rechts.innerHTML= "";
            abilities.innerHTML= "";
            stats.innerHTML= "";
            
            let id = data.id;
            id += 1;
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => response.json())
                .then(addPokemon2)
                .catch(err => console.error(err)); 
        });

        // add class to specific type
        const typeClassMapping = {
            "normal": "normal-type",
            "fire": "fire-type",
            "water": "water-type",
            "electric": "electric-type",
            "grass": "grass-type",
            "ice": "ice-type",
            "fighting": "fighting-type",
            "poison": "poison-type",
            "ground": "ground-type",
            "flying": "flying-type",
            "psychic": "psychic-type",
            "bug": "bug-type",
            "rock": "rock-type",
            "ghost": "ghost-type",
            "dragon": "dragon-type",
            "dark": "dark-type",
            "steel": "steel-type",
            "fairy": "fairy-type"
        };
        
        // get all types
        for (let i = 0; i < data.types.length; i++) {
            let type = data.types[i].type.name;
    
            let h3 = document.createElement('h3');
    
            h3.innerText = type;
    
            // Add class based on the type name mapping
            if (typeClassMapping.hasOwnProperty(type)) {
                h3.classList.add(typeClassMapping[type]);
            }
            rechts.appendChild(h3);
        }

        // height h3
        let height = document.createElement('h3');
        height.innerText = `height: ${data.height / 10} m`;
        rechts.appendChild(height)

        // weight h3
        let weight = document.createElement('h3');
        weight.innerText = `Weight: ${data.weight / 10} kg`;
        rechts.appendChild(weight)

        // abilities h5
        let abilityText = document.createElement('h5');
        abilityText.innerText = "Abilities:"
        abilities.appendChild(abilityText)
        
        // get all abilities
        for (let i = 0; i < data.abilities.length; i++) {
            let ability = data.abilities[i].ability.name;

            let h3 = document.createElement('h3');

            h3.innerText = ability;

            abilities.appendChild(h3);
        }

        // add class to specific stat
        const statsClassMapping = {
            "hp": "hp",
            "attack": "attack",
            "defense": "defense",
            "special-attack": "special-attack",
            "special-defense": "special-defense",
            "speed": "speed",
        };

        // get all stats
        for (let i = 0; i < data.stats.length; i++) {

            let stat = data.stats[i].base_stat; 
            let statname = data.stats[i].stat.name;

            let h3 = document.createElement('h3');
            h3.innerText = stat + " " + statname;

            // Add class based on the type name mapping
            if (statsClassMapping.hasOwnProperty(statname)) {
                h3.classList.add(statsClassMapping[statname]);
            }

            stats.appendChild(h3);
        }
    }

    //loading screen
    function showLoadingScreen() {
        document.getElementById('loading-screen').classList.remove('hidden');
    }

    function hideLoadingScreen() {
        document.getElementById('loading-screen').classList.add('hidden');
    }

    document.addEventListener('DOMContentLoaded', function() {
        showLoadingScreen();
        setTimeout(function() {
            hideLoadingScreen();
        }, 500); 
    });
})();

