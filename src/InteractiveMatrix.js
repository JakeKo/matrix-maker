import "./App.css";

function InteractiveMatrix({ height, width, bits, onBitsChange }) {
  const bitCount = height * width;
  const bitList = [];
  for (let i = bitCount - 1; i >= 0; i--) {
    bitList.push((bits >> i) & 1);
  }

  function flipBit(index) {
    const newBits = bits ^ (1 << index);
    console.log(newBits, newBits.toString(2));
    onBitsChange(newBits);
  }

  return (
    <div
      className="matrix"
      style={{
        gridTemplateColumns: `repeat(${width}, min-content)`,
        gridTemplateRows: `repeat(${height}, min-content)`,
      }}
    >
      {bitList.map((bit, i) => (
        <div
          key={Math.random()}
          className={bit ? "on" : "off"}
          onMouseDown={() => {
            flipBit(bitCount - i - 1);
          }}
        />
      ))}
    </div>
  );
}

export default InteractiveMatrix;
