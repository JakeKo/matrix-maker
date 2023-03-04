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
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
        aspectRatio: `${width} / ${height}`,
      }}
    >
      {bitList.map((bit, i) => (
        <div key={i} className={bit ? "on" : "off"} />
      ))}
    </div>
  );
}

export default Matrix;
