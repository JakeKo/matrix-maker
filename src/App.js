import { useState } from "react";
import "./App.css";
import InteractiveMatrix from "./InteractiveMatrix";

function App() {
  const [bits, setBits] = useState(0b111001);

  return (
    <div className="app">
      <InteractiveMatrix
        height={5}
        width={5}
        bits={bits}
        onBitsChange={setBits}
      />
    </div>
  );
}

export default App;
