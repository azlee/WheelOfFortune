import { useState } from 'react'
import GameSetup from './components/GameSetup'
import GameBoard from './components/GameBoard'
import './App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameConfig, setGameConfig] = useState(null)

  const handleStartGame = (config) => {
    setGameConfig(config)
    setGameStarted(true)
  }

  const handleNewGame = () => {
    setGameStarted(false)
    setGameConfig(null)
  }

  return (
    <div className="App">
      {!gameStarted ? (
        <GameSetup onStartGame={handleStartGame} />
      ) : (
        <GameBoard config={gameConfig} onNewGame={handleNewGame} />
      )}
    </div>
  )
}

export default App
