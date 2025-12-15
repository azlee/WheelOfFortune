import { useState } from "react";
import "./Wheel.css";

const WHEEL_VALUES = [
  { value: 200, type: "money", color: "#a17bb7" },
  { value: 700, type: "money", color: "#54aedf" },
  { value: 600, type: "money", color: "#e25b56" },
  { value: "BANKRUPT", type: "special", color: "#000000" },
  { value: 800, type: "money", color: "#f9ea26" },
  { value: 550, type: "money", color: "#11ae79" },
  { value: 400, type: "money", color: "#f37232" },
  { value: "LOSE A TURN", type: "special", color: "#fff" },
  { value: 250, type: "money", color: "#54aedf" },
  { value: 650, type: "money", color: "#9f80bc" },
  { value: 500, type: "money", color: "#e25b56" },
  { value: "BANKRUPT", type: "special", color: "#000000" },
  { value: 600, type: "money", color: "#f38ba3" },
  { value: 350, type: "money", color: "#17b07b" },
  { value: 800, type: "money", color: "#f37232" },
  { value: 450, type: "money", color: "#f9ea26" },
  { value: "LOSE A TURN", type: "special", color: "#fff" },
  { value: 100, type: "money", color: "#f38ba3" },
];

function Wheel({ onSpin, disabled }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (spinning || disabled) return;

    setSpinning(true);

    const segmentAngle = 360 / WHEEL_VALUES.length;
    const spins = 5 + Math.random() * 3;

    const winningIndex = Math.floor(Math.random() * WHEEL_VALUES.length);

    const POINTER_ANGLE = -90; // pointer at top
    const wedgeCenter = -90 + winningIndex * segmentAngle + segmentAngle / 2;

    // Calculate target angle where wedge center aligns with pointer
    const targetAngle = POINTER_ANGLE - wedgeCenter;

    // Calculate minimum rotation (current + spins)
    const minRotation = rotation + spins * 360;

    // Find k such that targetAngle + k*360 >= minRotation
    const k = Math.ceil((minRotation - targetAngle) / 360);
    const newRotation = targetAngle + k * 360;

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      onSpin(WHEEL_VALUES[winningIndex]);
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
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "50% 50%",
          transformBox: "fill-box",
          cursor: spinning || disabled ? "default" : "pointer",
        }}
        onClick={handleSpin}
      >
        <circle cx="150" cy="150" r="145" fill="none" />

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
                    fill={
                      item.type === "special" && item.value !== "LOSE A TURN"
                        ? "#FFFFFF"
                        : "#000000"
                    }
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
          r="30"
          strokeWidth={1}
          stroke={"black"}
          fill="rgb(17, 174, 121)"
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
