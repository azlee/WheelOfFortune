import './PuzzleBoard.css'

const TILES_PER_ROW = 13
const TOTAL_ROWS = 4

function PuzzleBoard({ puzzle, revealedLetters, category }) {
  const revealedArray = Array.from(revealedLetters || [])

  const createGrid = () => {
    const grid = Array(TOTAL_ROWS).fill(null).map(() => Array(TILES_PER_ROW).fill(null))

    if (!puzzle) return grid

    const lines = []
    const inputLines = puzzle.split('\n')

    inputLines.forEach(inputLine => {
      if (!inputLine.trim()) {
        lines.push('')
        return
      }

      const words = inputLine.split(' ')
      let currentLine = ''

      words.forEach((word, wordIndex) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word

        if (testLine.length <= TILES_PER_ROW) {
          currentLine = testLine
        } else {
          if (currentLine) {
            lines.push(currentLine)
          }
          currentLine = word
        }
      })

      if (currentLine) {
        lines.push(currentLine)
      }
    })

    const verticalOffset = Math.floor((TOTAL_ROWS - lines.length) / 2)

    lines.forEach((line, lineIndex) => {
      const rowIndex = verticalOffset + lineIndex
      if (rowIndex >= TOTAL_ROWS) return

      const startCol = Math.floor((TILES_PER_ROW - line.length) / 2)
      line.split('').forEach((char, charIndex) => {
        const col = startCol + charIndex
        if (col < TILES_PER_ROW && col >= 0) {
          grid[rowIndex][col] = char
        }
      })
    })

    return grid
  }

  const renderTile = (char, rowIndex, colIndex) => {
    if (char === null) {
      return (
        <div key={`${rowIndex}-${colIndex}`} className="puzzle-tile empty"></div>
      )
    }

    const isLetter = /[A-Z]/.test(char)
    const isSpace = char === ' '
    const isRevealed = revealedArray.includes(char)

    if (isSpace) {
      return <div key={`${rowIndex}-${colIndex}`} className="puzzle-tile space"></div>
    }

    if (!isLetter) {
      return (
        <div key={`${rowIndex}-${colIndex}`} className="puzzle-tile special revealed">
          {char}
        </div>
      )
    }

    return (
      <div key={`${rowIndex}-${colIndex}`} className={`puzzle-tile letter ${isRevealed ? 'revealed' : 'hidden'}`}>
        {isRevealed ? char : ''}
      </div>
    )
  }

  const grid = createGrid()

  return (
    <div className="puzzle-board">
      <div className="category-label">{category}</div>
      <div className="puzzle-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="puzzle-row">
            {row.map((char, colIndex) => renderTile(char, rowIndex, colIndex))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PuzzleBoard
