export function getRandomPokemonUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/` +
         `sprites/pokemon/other/official-artwork/${id}.png`;
}