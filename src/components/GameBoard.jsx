import { useState, useEffect } from 'react'
import PuzzleBoard from './PuzzleBoard'
import Wheel from './Wheel'
import PlayerScores from './PlayerScores'
import './GameBoard.css'

function GameBoard({ config, onNewGame }) {
  const [players, setPlayers] = useState(config.players)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [revealedLetters, setRevealedLetters] = useState(new Set())
  const [guessedLetters, setGuessedLetters] = useState(new Set())
  const [wheelValue, setWheelValue] = useState(null)
  const [gamePhase, setGamePhase] = useState('spin')
  const [message, setMessage] = useState('Spin the wheel to begin!')
  const [letterInput, setLetterInput] = useState('')
  const [roundScore, setRoundScore] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const currentPlayer = players[currentPlayerIndex]

  useEffect(() => {
    checkWin()
  }, [revealedLetters])

  const checkWin = () => {
    const puzzleLetters = new Set(
      config.puzzle
        .split('')
        .filter(char => /[A-Z]/.test(char))
    )

    const allRevealed = [...puzzleLetters].every(letter => revealedLetters.has(letter))

    if (allRevealed && puzzleLetters.size > 0) {
      setGameWon(true)
      setMessage(`${currentPlayer.name} wins with $${currentPlayer.score + roundScore}!`)
      setGamePhase('won')
    }
  }

  const handleSpin = (result) => {
    setWheelValue(result)

    if (result.type === 'special') {
      if (result.value === 'BANKRUPT') {
        setMessage(`BANKRUPT! ${currentPlayer.name} loses $${roundScore}!`)
        setRoundScore(0)
        setTimeout(() => nextTurn(), 2000)
      } else if (result.value === 'LOSE A TURN') {
        setMessage(`LOSE A TURN! Moving to next player.`)
        setTimeout(() => nextTurn(), 2000)
      }
    } else {
      setGamePhase('guess')
      setMessage(`${currentPlayer.name} spun $${result.value}. Choose a letter!`)
    }
  }

  const handleLetterGuess = (e) => {
    e.preventDefault()
    const letter = letterInput.toUpperCase()

    if (!letter || !/^[A-Z]$/.test(letter)) {
      setMessage('Please enter a valid letter (A-Z)')
      return
    }

    if (guessedLetters.has(letter)) {
      setMessage(`${letter} has already been guessed! Try another letter.`)
      return
    }

    setGuessedLetters(new Set([...guessedLetters, letter]))
    setLetterInput('')

    const count = config.puzzle.split('').filter(char => char === letter).length

    if (count > 0) {
      setRevealedLetters(new Set([...revealedLetters, letter]))
      const earned = wheelValue.value * count
      setRoundScore(roundScore + earned)
      setMessage(`Correct! ${count} ${letter}'s worth $${earned}. Spin again or solve!`)
      setGamePhase('spin')
    } else {
      setMessage(`Sorry, there is no ${letter}. Next player!`)
      setTimeout(() => nextTurn(), 2000)
    }
  }

  const nextTurn = () => {
    const updatedPlayers = [...players]
    updatedPlayers[currentPlayerIndex].score += roundScore
    setPlayers(updatedPlayers)
    setRoundScore(0)
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length)
    setGamePhase('spin')
    setWheelValue(null)
    setMessage('Spin the wheel!')
  }

  const handleSolve = () => {
    const solution = prompt('Enter your solution:')
    if (solution && solution.toUpperCase() === config.puzzle) {
      const updatedPlayers = [...players]
      updatedPlayers[currentPlayerIndex].score += roundScore
      setPlayers(updatedPlayers)
      setGameWon(true)
      setMessage(`${currentPlayer.name} solved it! Winner with $${updatedPlayers[currentPlayerIndex].score}!`)
      setGamePhase('won')

      const puzzleLetters = config.puzzle.split('').filter(char => /[A-Z]/.test(char))
      setRevealedLetters(new Set(puzzleLetters))
    } else {
      setMessage(`Incorrect solution! Next player!`)
      setTimeout(() => nextTurn(), 2000)
    }
  }

  return (
    <div className="game-board">
      <h1 className="game-title">WHEEL OF FORTUNE</h1>

      <PlayerScores players={players} currentPlayerIndex={currentPlayerIndex} />

      <PuzzleBoard
        puzzle={config.puzzle}
        revealedLetters={revealedLetters}
        category={config.category}
      />

      <div className="game-content">
        <div className="wheel-section">
          <Wheel
            onSpin={handleSpin}
            disabled={gamePhase !== 'spin' || gameWon}
          />
          {wheelValue && wheelValue.type === 'money' && (
            <div className="wheel-result">Spun: ${wheelValue.value}</div>
          )}
        </div>

        <div className="controls-section">
          <div className="message-box">{message}</div>

          {gamePhase === 'guess' && !gameWon && (
            <form onSubmit={handleLetterGuess} className="letter-input-form">
              <input
                type="text"
                value={letterInput}
                onChange={(e) => setLetterInput(e.target.value)}
                maxLength="1"
                placeholder="Enter letter"
                className="letter-input"
                autoFocus
              />
              <button type="submit" className="guess-button">
                GUESS
              </button>
            </form>
          )}

          {gamePhase === 'spin' && !gameWon && roundScore > 0 && (
            <button onClick={handleSolve} className="solve-button">
              SOLVE PUZZLE
            </button>
          )}

          {gameWon && (
            <button onClick={onNewGame} className="new-game-button">
              NEW GAME
            </button>
          )}

          <div className="round-score">
            Current Round: ${roundScore}
          </div>

          <div className="guessed-letters">
            <strong>Guessed:</strong> {Array.from(guessedLetters).sort().join(', ') || 'None'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameBoard
