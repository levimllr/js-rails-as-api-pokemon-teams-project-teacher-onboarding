const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener('DOMContentLoaded', loadTrainers);

function loadTrainers() {
    console.log("Loading trainers...")
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => {console.log(json)    });  
};



