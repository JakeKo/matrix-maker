function testBit(b, i) {
  return (b >> i) & 1;
}

function calculateSuperSegments(bitCount, matrices) {
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

function makeSegmentsUnique(superSegments) {
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

function calculateSegments(bitCount, matrices) {
  const superSegments = [...calculateSuperSegments(bitCount, matrices)].sort(
    (a, b) => (a < b ? -1 : 1)
  );
  return makeSegmentsUnique(superSegments);
}

export {
  testBit,
  calculateSuperSegments,
  makeSegmentsUnique,
  calculateSegments,
};
