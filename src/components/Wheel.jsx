import { useState } from "react";
import "./Wheel.css";

const WHEEL_VALUES = [
  { value: 500, type: "money", color: "#FF0000" },
  { value: 700, type: "money", color: "#00BFFF" },
  { value: 600, type: "money", color: "#FFD700" },
  { value: "BANKRUPT", type: "special", color: "#000000" },
  { value: 800, type: "money", color: "#FF1493" },
  { value: 550, type: "money", color: "#00FF7F" },
  { value: 400, type: "money", color: "#FF4500" },
  { value: "LOSE A TURN", type: "special", color: "#1a1a1a" },
  { value: 900, type: "money", color: "#32CD32" },
  { value: 650, type: "money", color: "#9370DB" },
  { value: 500, type: "money", color: "#FF6347" },
  { value: 700, type: "money", color: "#00CED1" },
  { value: 600, type: "money", color: "#FF69B4" },
  { value: 350, type: "money", color: "#ADFF2F" },
  { value: 800, type: "money", color: "#FF00FF" },
  { value: 450, type: "money", color: "#00FF00" },
  { value: 500, type: "money", color: "#1E90FF" },
  { value: "BANKRUPT", type: "special", color: "#000000" },
];

function Wheel({ onSpin, disabled }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (spinning || disabled) return;

    setSpinning(true);

    const spins = 5 + Math.random() * 3;
    const segmentAngle = 360 / WHEEL_VALUES.length;
    const randomIndex = Math.floor(Math.random() * WHEEL_VALUES.length);
    const targetRotation = spins * 360 + randomIndex * segmentAngle;

    setRotation(rotation + targetRotation);

    setTimeout(() => {
      setSpinning(false);
      const resultIndex =
        (WHEEL_VALUES.length - randomIndex) % WHEEL_VALUES.length;
      onSpin(WHEEL_VALUES[resultIndex]);
    }, 3000);
  };

  const createWedgePath = (index, total) => {
    const angle = 360 / total;
    const startAngle = (angle * index - 90) * (Math.PI / 180);
    const endAngle = (angle * (index + 1) - 90) * (Math.PI / 180);
    const radius = 140;

    const x1 = 150 + radius * Math.cos(startAngle);
    const y1 = 150 + radius * Math.sin(startAngle);
    const x2 = 150 + radius * Math.cos(endAngle);
    const y2 = 150 + radius * Math.sin(endAngle);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M 150 150 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index, total) => {
    const angle = 360 / total;
    const midAngle = (angle * index + angle / 2 - 90) * (Math.PI / 180);
    const radius = 100;

    return {
      x: 150 + radius * Math.cos(midAngle),
      y: 150 + radius * Math.sin(midAngle),
    };
  };

  return (
    <div className="wheel-container">
      <div className="wheel-pointer"></div>
      <svg
        className="wheel"
        viewBox="0 0 300 300"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <circle
          cx="150"
          cy="150"
          r="145"
          fill="none"
          stroke="#FFD700"
          strokeWidth="10"
        />

        {WHEEL_VALUES.map((item, index) => {
          const angle =
            (360 / WHEEL_VALUES.length) * index + 360 / WHEEL_VALUES.length / 2;
          const displayText =
            item.type === "money" ? `$${item.value}` : item.value;
          const chars = displayText.split("").reverse();

          return (
            <g key={index}>
              <path
                d={createWedgePath(index, WHEEL_VALUES.length)}
                fill={item.color}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {chars.map((char, i) => {
                const charSpacing = item.type === "special" ? 5 : 14;
                const radialDistance = 80 + i * charSpacing;
                const midAngle = (angle - 90) * (Math.PI / 180);
                const charX = 150 + radialDistance * Math.cos(midAngle);
                const charY = 150 + radialDistance * Math.sin(midAngle);

                return (
                  <text
                    key={i}
                    x={charX}
                    y={charY}
                    fill={item.type === "special" ? "#FFFFFF" : "#000000"}
                    fontSize={item.type === "special" ? "5" : "16"}
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${angle}, ${charX}, ${charY})`}
                  >
                    {char}
                  </text>
                );
              })}
            </g>
          );
        })}

        <circle
          cx="150"
          cy="150"
          r="20"
          fill="#FFD700"
          stroke="#FF6B00"
          strokeWidth="3"
        />
      </svg>
      <button
        className="spin-button"
        onClick={handleSpin}
        disabled={spinning || disabled}
      >
        {spinning ? "SPINNING..." : "SPIN"}
      </button>
    </div>
  );
}

export default Wheel;
