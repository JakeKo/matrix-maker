import "./App.css";

function Matrix({ height, width, bits }) {
  const bitCount = height * width;
  const bitList = [];
  for (let i = bitCount - 1; i >= 0; i--) {
    bitList.push((bits >> i) & 1);
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
        <div key={Math.random()} className={bit ? "on" : "off"} />
      ))}
    </div>
  );
}

export default Matrix;
