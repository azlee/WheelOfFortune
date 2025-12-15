import './PlayerScores.css'

function PlayerScores({ players, currentPlayerIndex }) {
  return (
    <div className="player-scores">
      {players.map((player, index) => (
        <div
          key={index}
          className={`player-card player-${index + 1} ${index === currentPlayerIndex ? 'active' : ''}`}
        >
          <div className="player-name">{player.name}</div>
          <div className="player-score">${player.score}</div>
          {index === currentPlayerIndex && (
            <div className="current-turn-indicator">CURRENT TURN</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default PlayerScores
