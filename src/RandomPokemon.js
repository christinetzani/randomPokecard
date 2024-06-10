import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RandomPokemon.css";

export default function RandomPokemon() {
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async () => {
    const pokeNum = Math.floor(Math.random() * 151) + 1;
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeNum}`,
      );
      setPokemon(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { name, sprites } = pokemon;
  const imageUrl = sprites.other["official-artwork"].front_default;

  return (
    <div className="RandomPokemon">
      <div className="PokemonCard">
        <h1>
          Pokémon #{pokemon.id}: {name.charAt(0).toUpperCase() + name.slice(1)}
        </h1>
        <img src={imageUrl} alt={name} />
        <div className="PokemonDetails">
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base experience: {pokemon.base_experience}</p>
        </div>
      </div>
      <button className="NextButton" onClick={fetchPokemon}>
        Next Pokémon
      </button>
    </div>
  );
}
