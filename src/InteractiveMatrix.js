import "./App.css";

function InteractiveMatrix({ height, width, bits, onBitsChange }) {
  const bitCount = height * width;
  const bitList = [];
  for (let i = bitCount - 1; i >= 0; i--) {
    bitList.push((bits >> i) & 1);
  }

  function flipBit(index) {
    const newBits = bits ^ (1 << index);
    onBitsChange(newBits);
  }

  return (
    <div
      className="matrix"
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
        aspectRatio: `${width} / ${height}`,
      }}
    >
      {bitList.map((bit, i) => (
        <div
          key={i}
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
