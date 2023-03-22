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

  function removeMatrix(index) {
    setMatrices([...matrices.slice(0, index), ...matrices.slice(index + 1)]);
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
      <div className="controls">
        Matrix Maker
        <div className="row">
          Build a set of configurations you would like to represent with a
          matrix display and see what independent bit configurations are needed
          to create all of them.
        </div>
        <hr style={{ width: "100%" }} />
        <button className="positive-button" type="button" onClick={addMatrix}>
          Add Display
        </button>
        <div className="row">
          <div className="input-label-group">
            <label htmlFor="height">H</label>
            <input
              name="height"
              type="number"
              value={height}
              min={1}
              onChange={(event) => updateHeight(event.target.value)}
            />
          </div>
          <div className="input-label-group">
            <label htmlFor="width">W</label>
            <input
              name="width"
              type="number"
              value={width}
              min={1}
              onChange={(event) => updateWidth(event.target.value)}
            />
          </div>
        </div>
        <button
          className="negative-button"
          type="button"
          onClick={resetMatrices}
        >
          Reset
        </button>
      </div>
      <div className="canvas">
        {matrices.map((matrix, i) => (
          <div>
            <InteractiveMatrix
              key={i}
              height={height}
              width={width}
              bits={matrix}
              onBitsChange={(newMatrix) => updateMatrix(i, newMatrix)}
            />
            {matrices.length > 1 && (
              <button onClick={() => removeMatrix(i)}>Remove</button>
            )}
          </div>
        ))}
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
