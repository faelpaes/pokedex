const types = [
  "grass",
  "fire",
  "water",
  "normal",
  "bug",
  "electric",
  "ghost",
  "psychic",
  "rock",
];

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
  const container = document.getElementById("container");
  const card = document.createElement("div");
  const code = document.createElement("h2");
  const sprite = document.createElement("img");
  const bottom = document.createElement("div");
  const name = document.createElement("span");

  card.className = "card";
  bottom.className = "card-bottom";
  code.textContent = `#${pokemon.order}`;
  name.textContent = await capitalizeFirstLetter(pokemon.name);
  sprite.src = pokemon.sprites.front_default;

  const typeClass = await getType(pokemon);
  bottom.className = typeClass;
  bottom.appendChild(name);
  await setStyle(typeClass, card, code);

  card.appendChild(code);
  card.appendChild(sprite);
  card.appendChild(bottom);
  container.appendChild(card);

  document.body.appendChild(container);
}

async function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function setStyle(type, card, code) {
  switch (type) {
    case "fire":
      card.style = "border-color: #F57D31";
      code.style = "color: #F57D31";
      break;
    case "grass":
      card.style = "border-color: #74CB48";
      code.style = "color: #74CB48";
      break;
    case "water":
      card.style = "border-color: #6493EB";
      code.style = "color: #6493EB";
      break;
    case "bug":
      card.style = "border-color: #A7B723";
      code.style = "color: #A7B723";
      break;
    case "normal":
      card.style = "border-color: #AAA67F";
      code.style = "color: #AAA67F";
      break;
    case "electric":
      card.style = "border-color: #F9CF30";
      code.style = "color: #F9CF30";
      break;
    case "ghost":
      card.style = "border-color: #70559B";
      code.style = "color: #70559B";
      break;
    case "psychic":
      card.style = "border-color: #FB5584";
      code.style = "color: #FB5584";
      break;
    case "rock":
      card.style = "border-color: #B69E31";
      code.style = "color: #B69E31";
      break;

    default:
      break;
  }

}

async function getType(pokemon) {
  const type = pokemon.types[0].type.name;
  if (types.includes(type)) {
    return type;
  }

  return "normal";
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
    const pokemon = await fetchDataByName(pokeName.value.toLowerCase());
    createPokemon(pokemon);
  }
}

onInit();
