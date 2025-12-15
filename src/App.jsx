import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import GameSetup from "./components/GameSetup";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameConfig, setGameConfig] = useState(null);

  const handleStartGame = (config) => {
    setGameConfig(config);
    setGameStarted(true);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setGameConfig(null);
  };

  return (
    <div className="App city">
      {!gameStarted ? (
        <GameSetup onStartGame={handleStartGame} />
      ) : (
        <GameBoard config={gameConfig} onNewGame={handleNewGame} />
      )}
    </div>
  );
}

export default App;
