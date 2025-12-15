import { useState } from 'react'
import './GameSetup.css'

function GameSetup({ onStartGame }) {
  const [puzzle, setPuzzle] = useState('')
  const [category, setCategory] = useState('')
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [player3, setPlayer3] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (puzzle && player1 && player2 && player3) {
      onStartGame({
        puzzle: puzzle.toUpperCase(),
        category: category || 'GENERAL',
        players: [
          { name: player1, score: 0 },
          { name: player2, score: 0 },
          { name: player3, score: 0 }
        ]
      })
    }
  }

  return (
    <div className="game-setup">
      <h1 className="title">WHEEL OF FORTUNE</h1>
      <form onSubmit={handleSubmit} className="setup-form">
        <div className="form-group">
          <label htmlFor="category">Category (optional)</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., PHRASE, PLACE, PERSON"
          />
        </div>

        <div className="form-group">
          <label htmlFor="puzzle">Puzzle *</label>
          <input
            type="text"
            id="puzzle"
            value={puzzle}
            onChange={(e) => setPuzzle(e.target.value)}
            placeholder="Enter the puzzle answer"
            required
          />
        </div>

        <div className="players-section">
          <h2>Players</h2>
          <div className="form-group">
            <label htmlFor="player1">Player 1 *</label>
            <input
              type="text"
              id="player1"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              placeholder="Player 1 name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="player2">Player 2 *</label>
            <input
              type="text"
              id="player2"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              placeholder="Player 2 name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="player3">Player 3 *</label>
            <input
              type="text"
              id="player3"
              value={player3}
              onChange={(e) => setPlayer3(e.target.value)}
              placeholder="Player 3 name"
              required
            />
          </div>
        </div>

        <button type="submit" className="start-button">
          START GAME
        </button>
      </form>
    </div>
  )
}

export default GameSetup
