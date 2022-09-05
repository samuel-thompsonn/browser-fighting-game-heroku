interface StatsProps {
  movementSpeed: number;
  maxHealth: number;
  knockbackStrength: number;
}

function StatsBox(props: StatsProps) {
  return (
    <div className="Stats-Box">
      <h2>Stats</h2>
      <div className="Stat-List">
        <p>Movement Speed: {props.movementSpeed}</p>
        <p>Maximum Health: {props.maxHealth}</p>
        <p>Knockback Strength: {props.knockbackStrength}</p>
      </div>
    </div>
  )
}

export default StatsBox;