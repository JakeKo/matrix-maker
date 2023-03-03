import logo from "./logo.svg";
import "./App.css";

function testBit(b, i) {
  return (b >> i) & 1;
}

export function calculateSuperSegments(bitCount, matrices) {
  const superSegments = new Set();

  for (let i = 0; i < bitCount; i++) {
    let superSegment = Number.MAX_SAFE_INTEGER;
    let bitWasOnSomewhere = false;

    for (let j = 0; j < matrices.length; j++) {
      if (testBit(matrices[j], i)) {
        superSegment &= matrices[j];
        bitWasOnSomewhere = true;
      }
    }

    if (bitWasOnSomewhere) {
      superSegments.add(superSegment);
    }
  }

  return superSegments;
}

export function makeSegmentsUnique(superSegments) {
  const segments = new Set([superSegments[0]]);
  let mask = superSegments[0];

  for (let i = 1; i < superSegments.length; i++) {
    const uniqueSegment = superSegments[i] & ~mask;

    if (uniqueSegment > 0) {
      mask |= uniqueSegment;
      segments.add(uniqueSegment);
    }
  }

  return segments;
}

export function calculateSegments(bitCount, matrices) {
  const superSegments = [...calculateSuperSegments(bitCount, matrices)].sort(
    (a, b) => (a < b ? -1 : 1)
  );
  return makeSegmentsUnique(superSegments);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
