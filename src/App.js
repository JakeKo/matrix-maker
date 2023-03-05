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

  function updateMatrix(index, newMatrix) {
    const newMatrices = [
      ...matrices.slice(0, index),
      newMatrix,
      ...matrices.slice(index + 1),
    ];
    setMatrices(newMatrices);
  }

  function addMatrix() {
    setMatrices([...matrices, 0]);
  }

  function updateHeight(newHeight) {
    setHeight(newHeight);
    resetMatrices();
  }

  function updateWidth(newWidth) {
    setWidth(newWidth);
    resetMatrices();
  }

  function resetMatrices() {
    setMatrices([0]);
  }

  return (
    <div className="app">
      <div className="canvas">
        <div className="controls">
          Height:
          <input
            type="number"
            value={height}
            onChange={(event) => updateHeight(event.target.value)}
          />
          Width:
          <input
            type="number"
            value={width}
            onChange={(event) => updateWidth(event.target.value)}
          />
          <button type="button" onClick={resetMatrices}>
            Reset
          </button>
        </div>
        {matrices.map((matrix, i) => (
          <InteractiveMatrix
            key={i}
            height={height}
            width={width}
            bits={matrix}
            onBitsChange={(newMatrix) => updateMatrix(i, newMatrix)}
          />
        ))}
        <button type="button" onClick={addMatrix}>
          +
        </button>
      </div>
      <div className="segments-container">
        <div className="segments-container-title">Segments</div>
        <div className="segments">
          {segments.map((segment, i) => (
            <Matrix key={i} height={height} width={width} bits={segment} />
          ))}
        </div>
        <div className="segments-container-counter">
          Total: {segments.length}
        </div>
      </div>
    </div>
  );
}

export default App;
