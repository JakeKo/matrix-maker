import "./App.css";

function Matrix({ height, width, bits }) {
  const bitCount = height * width;
  const bitList = [];
  for (let i = 0; i < bitCount; i++) {
    bitList.push((bits >> i) & 1);
  }

  const style = {
    gridTemplateColumns: `repeat(${width}, min-content)`,
    gridTemplateRows: `repeat(${height}, min-content)`,
  };

  return (
    <div className="matrix" style={style}>
      {bitList.map((bit) =>
        bit ? <div className="on" /> : <div className="off" />
      )}
    </div>
  );
}

export default Matrix;
