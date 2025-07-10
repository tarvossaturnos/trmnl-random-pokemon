import { getRandomPokemonUrl } from '../random-pokemon.js';

export default async function handler(req, res) {
  const url = getRandomPokemonUrl();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ url });
}