export const fetchPokemonsList = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9');
  const data = await response.json();
  return data;
};

export const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
