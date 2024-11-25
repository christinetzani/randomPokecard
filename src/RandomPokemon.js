import React, { useState, useEffect } from "react";
// This line imports React and two hooks: useState (for managing state) and useEffect (for running side effects like fetching data when the component mounts => when the component is added to the page for the first time)
// components phases: Mounting, Updating (when state/props changes), Unmounting
import axios from "axios";
//Imports the axios library, which is used for making HTTP requests.
//  In this case, it will be used to fetch data from the Pokémon API.
import "./RandomPokemon.css";
import Loading from "./Loading";
import "./Loading.css";

export default function RandomPokemon() {
  const [pokemon, setPokemon] = useState(null);
  // useState hook => create a state variable called `pokemon`, initialized as null. The `setPokemon` function is used to update the state when new Pokémon data is fetched
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    // Defines an asynchronous function named fetchPokemon to fetch Pokémon data.
    setPokemon(null); //to reset previous pokemon and display "Loading.." <div>
    const pokeNum = Math.floor(Math.random() * 151) + 1;
    // Generates a random number between 1 and 151 (inclusive). These numbers correspond to the original 151 Pokémon from Generation I.
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeNum}`
        // Attempts to fetch data from the Pokémon API using the random number as the Pokémon ID.
        // The await keyword is used in JavaScript with asynchronous functions to pause the execution of code until a promise is resolved.
        // It's a part of the async/await syntax, which allows you to write asynchronous code in a way that looks and behaves like synchronous code, making it easier to read and manage.
        // You can only use await inside functions that are declared with the async keyword.
        // The promise above is inside the parentesises.
      );
      setPokemon(response.data);
      // if successful, updates the `pokemon` state variable with the fetched data.
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      // If an error occurs, it logs the error to the console - e.g. API Downtime
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);
  // The useEffect hook runs the fetchPokemon function when the component mounts (first renders) => when the component is added to the page for the first time
  // The empty dependency array [] means this effect runs only once.
  // useEffect is used to run side effects like fetching data, directly updating the DOM and timers.

  if (!pokemon && !error) {
    // Show loading only if there's no Pokemon data (yet) and no error
    return (
      <div>
        <Loading />
      </div>
    );
  }
  // If the pokemon state is still null (because the data hasn’t been fetched yet), the component renders a simple loading message.

  if (error) {
    // Show error message if there's an error
    return <div>{error}</div>;
  }

  const { name, sprites } = pokemon;
  // Destructures name and sprites from the pokemon object.
  let sprite2 = "showdown";

  const imageUrl = sprites.other[sprite2].front_default;
  // Extracts the URL for the Pokémon's official artwork image from the sprites object.

  return (
    <div className="RandomPokemon">
      {/*  container <div> with the class RandomPokemon */}
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
      {/* A button labeled "Next Pokémon" that calls fetchPokemon when clicked, fetching data for another random Pokémon. */}
    </div>
  );
}
