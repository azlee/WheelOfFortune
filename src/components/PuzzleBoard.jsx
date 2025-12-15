import './PuzzleBoard.css'

function PuzzleBoard({ puzzle, revealedLetters, category }) {
  const renderChar = (char, index) => {
    const isLetter = /[A-Z]/.test(char)
    const isRevealed = revealedLetters.has(char)
    const isSpace = char === ' '

    if (isSpace) {
      return <div key={index} className="puzzle-char space"></div>
    }

    if (!isLetter) {
      return (
        <div key={index} className="puzzle-char special">
          {char}
        </div>
      )
    }

    return (
      <div key={index} className={`puzzle-char letter ${isRevealed ? 'revealed' : ''}`}>
        {isRevealed ? char : ''}
      </div>
    )
  }

  const lines = puzzle.split('\n').filter(line => line.trim() !== '')

  return (
    <div className="puzzle-board">
      <div className="category-label">{category}</div>
      <div className="puzzle-container">
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="puzzle-line">
            {line.split('').map((char, charIndex) => renderChar(char, `${lineIndex}-${charIndex}`))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PuzzleBoard
