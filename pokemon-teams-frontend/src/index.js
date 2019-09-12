const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const pageMain = document.getElementsByTagName('main')[0];

document.addEventListener('DOMContentLoaded', loadTrainers);

function loadTrainers() {
    console.log("Loading trainers...");
    fetchTrainer();
};

function generateTrainerCard(trainerObject) {
    // console.log(trainerObject);
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');
    cardDiv.setAttribute('data-id', trainerObject.id);

    const trainerNameP = document.createElement('p');
    trainerNameP.innerText = trainerObject.name;

    const cardBtn = document.createElement('button');
    cardBtn.setAttribute('data-trainer-id', trainerObject.id);
    cardBtn.innerText = 'Add Pokemon';
    cardBtn.addEventListener('click', addPokemon);

    const cardUl = document.createElement('ul');
    const trainerPkmn = trainerObject.pokemon;
    trainerPkmn.forEach(pkmn => {
        appendPokemonToList(pkmn, cardUl);
    });

    cardDiv.appendChild(trainerNameP);
    cardDiv.appendChild(cardBtn);
    cardDiv.appendChild(cardUl);

    pageMain.appendChild(cardDiv);
};

function fetchTrainer() {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => {
            // console.log(json);
            json.forEach(trainerObject => {
                generateTrainerCard(trainerObject);
            }); 
        });  
};

function addPokemon(event) {
    const trainerId = event.target.parentNode.getAttribute('data-id');
    const trainerUl = event.target.nextSibling;
    const formData = {
        trainer_id: trainerId
    };
    const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };
    fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(json => {
            appendPokemonToList(json, trainerUl)
        });
};

function appendPokemonToList(pkmn, parentUl) {
    const cardUl = parentUl;
    const pkmnLi = document.createElement('li');
    pkmnLi.innerText = `${pkmn.nickname} (${pkmn.species})`;
    const pkmnBtn = document.createElement('button');
    pkmnBtn.innerText = 'Release';
    pkmnBtn.setAttribute('class', 'release');
    pkmnBtn.setAttribute('data-pokemon-id', pkmn.id);
    pkmnBtn.addEventListener('click', releasePokemon);
    pkmnLi.appendChild(pkmnBtn);
    cardUl.appendChild(pkmnLi);
};

function releasePokemon(event) {
    
    const pokemonLi = event.target.parentNode;
    const pokemonId = event.target.getAttribute('data-pokemon-id');

    pokemonLi.remove();

    const formData = {
        pokemon_id: pokemonId
    };
    const configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };
    fetch(`${POKEMONS_URL}/${pokemonId}`, configObj)
        .then(resp => resp.json())
        .then(json => console.log(json));
};