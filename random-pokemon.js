export function getRandomPokemonUrl() {
  const MAX_ID = 1025;                         // Gen IX last dex-nummer
  const id = Math.floor(Math.random() * MAX_ID) + 1;   // 1..1025
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/` +
         `sprites/pokemon/other/official-artwork/${id}.png`;
}