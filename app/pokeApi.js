async function fetchData(pokeNumber) {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + pokeNumber
  );
  const pokemon = await response.json();
  return pokemon;
}

async function fetchDataByName(pokeName) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokeName);
  const pokemon = await response.json();
  return pokemon;
}

async function createPokemon(pokemon) {
  // const pokemon = await fetchData(pokeNumber);

  const container = document.getElementById("container");
  const card = document.createElement("div");
  const code = document.createElement("h2");
  const sprite = document.createElement("img");
  const bottom = document.createElement("div");
  const name = document.createElement("span");

  card.className = "card";
  bottom.className = "card-bottom";
  code.textContent = `#${pokemon.order}`;
  name.textContent = pokemon.name;
  sprite.src = pokemon.sprites.front_default;

  bottom.appendChild(name);
  bottom.style = "background-color: red";

  card.appendChild(code);
  card.appendChild(sprite);
  card.appendChild(bottom);
  container.appendChild(card);

  document.body.appendChild(container);
}

async function onInit() {
  for (let index = 1; index < 152; index++) {
    const pokemon = await fetchData(index);
    createPokemon(pokemon);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

async function onSearch() {
  const container = document.querySelector("#container");
  removeAllChildNodes(container);
  
  var pokeName = document.getElementById("pokeSearch");
  if (pokeName.value === "") {
    onInit();
  } else {
    const pokemon = await fetchDataByName(pokeName.value);
    createPokemon(pokemon);
  }
}

onInit();
