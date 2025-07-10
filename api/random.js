import { getRandomPokemonUrl } from '../random-pokemon.js';

export default async function handler(req, res) {
  const MAX_ID = 1025;
  const id  = Math.floor(Math.random() * MAX_ID) + 1;

  const url = getRandomPokemonUrl(id);
  const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const species    = await speciesRes.json();

  const name = species.names.find(n => n.language.name === 'en')?.name ?? species.name;
  const desc =
    species.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text
      ?.replace(/\f|\n/g, ' ')
      ?.replace(/\s+/g, ' ')
      ?.trim() ?? '';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.status(200).json({ id, name, description: desc, url });
}