export const fetchPokemonList = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
  const data = await response.json();
  return data;
}