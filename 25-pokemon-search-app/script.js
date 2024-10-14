// Form Elements
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

// Sections
const generalInfo = document.getElementById("general-info")
const typeSection = document.getElementById("type-section")
const statSection = document.getElementById("stat-section")
const noResultsEl = document.getElementById("no-results")
const images = document.getElementById("images")

// Properties
const pokemonId = document.getElementById("pokemon-id")
const pokemonName = document.getElementById("pokemon-name")
const pokemonWeight = document.getElementById("weight")
const pokemonHeight= document.getElementById("height")
const pokemonTypes = document.getElementById("types")

const apiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"

const renderData = (jsonData) => {
  // Clear Previous Search Data
  pokemonTypes.innerHTML = ""
  images.innerHTML = ""
  noResultsEl.style.display = "none"

  // General Info
  const {id, name, height, weight} = jsonData
  pokemonName.textContent = name
  pokemonId.textContent = id
  pokemonHeight.textContent = height
  pokemonWeight.textContent = weight
  generalInfo.style.display = "block"

  // Stats
  for (const stat of jsonData.stats) {
    const spanElement = document.getElementById(stat.stat.name)
    spanElement.textContent = stat.base_stat
  }
  statSection.style.display = "block"

  // Types
  jsonData.types.forEach((type) => {
    pokemonTypes.innerHTML += `<p>${type.type.name.toUpperCase()}`
  })
  typeSection.style.display = "block"

  // Images
  images.innerHTML += `
  <img class="user-img" src="${jsonData.sprites.front_default}" id="sprite" alt="${name} Sprite">`
  images.style.display = "block"
}

const noResults = () => {
  // Hide Previous Results and display no results block
  noResultsEl.style.display = "block"
  generalInfo.style.display = "none"
  statSection.style.display = "none"
  typeSection.style.display = "none"
  images.style.display = "none"
}

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderData(data)
  } catch (err) {
    noResults()
    alert("Pokémon not found")
  }
};

// Event Listeners
searchButton.addEventListener("click", () => {
  let searchValue = searchInput.value
  searchValue = searchValue.toLowerCase()
  // TODO add more search cleaning steps
  fetchData(`${apiUrl}/${searchValue}`)
})