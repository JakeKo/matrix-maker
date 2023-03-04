import { useState } from "react";
import "./App.css";
import InteractiveMatrix from "./InteractiveMatrix";
import Matrix from "./Matrix";
import { calculateSegments } from "./segmentCalculator";

function App() {
  const [height, setHeight] = useState(7);
  const [width, setWidth] = useState(4);
  const [matrices, setMatrices] = useState([0b111001, 0b101010]);
  const segments = [...calculateSegments(height * width, matrices)];
  console.log(segments);

  function updateMatrix(index, newMatrix) {
    const newMatrices = [
      ...matrices.slice(0, index),
      newMatrix,
      ...matrices.slice(index + 1),
    ];
    setMatrices(newMatrices);
  }

  return (
    <div className="app">
      <div style={{ display: "flex", gap: "24px" }}>
        {matrices.map((matrix, i) => (
          <InteractiveMatrix
            key={i}
            height={height}
            width={width}
            bits={matrix}
            onBitsChange={(newMatrix) => updateMatrix(i, newMatrix)}
          />
        ))}
      </div>
      <hr />
      Segments: {segments.length}
      <div style={{ display: "flex", gap: "24px" }}>
        {segments.map((segment, i) => (
          <Matrix key={i} height={height} width={width} bits={segment} />
        ))}
      </div>
    </div>
  );
}

export default App;
