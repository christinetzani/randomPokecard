import "./styles.css";
import RandomPokemon from "./RandomPokemon";

export default function App() {
  // This line defines a new React component named App and sets it as the default export of the file.
  // A React component is a JavaScript function that returns UI elements.
  // The default keyword means this component can be imported with any name in other files.
  return (
    // the return statement defines the JSX (HTML-like syntax used in React) that will be rendered to the screen
    <div className="App">
      <RandomPokemon />
      {/* The RandomPokemon component is rendered here and will display its own UI */}
    </div>
  );
}
