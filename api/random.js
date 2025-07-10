import { getRandomPokemonUrl } from '../random-pokemon.js';

export default async function handler(req, res) {
  const MAX_ID = 1025;                               // Gen IX last number
  const id = Math.floor(Math.random() * MAX_ID) + 1; // 1‥1025

  const image = getRandomPokemonUrl(id);

  const speciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    { next: { revalidate: 86400 } }                
  );

  let name = `#${id}`;
  let description = '';

  if (speciesRes.ok) {
    const species = await speciesRes.json();

    name = species.names.find(n => n.language.name === 'en')?.name
      ?? species.name;

    const entry = species.flavor_text_entries
      .find(e => e.language.name === 'en');

    if (entry) {
      description = entry.flavor_text
        .replace(/\f|\n/g, ' ')            
        .replace(/\s+/g, ' ')               
        .trim();
    }
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=86400'); 
  return res.status(200).json({ id, name, description, image });
}