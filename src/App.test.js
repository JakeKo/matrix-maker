import { render, screen } from "@testing-library/react";
import App, {
  calculateSegments,
  calculateSuperSegments,
  makeSegmentsUnique,
} from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("calculateSuperSegments", () => {
  it("handles single matrix", () => {
    const matrices = [0b0110];

    const expected = new Set(matrices);
    const actual = calculateSuperSegments(4, matrices);

    expect(actual).toEqual(expected);
  });

  it("handles two discrete matrices", () => {
    const matrices = [0b0110, 0b1001];

    const expected = new Set(matrices);
    const actual = calculateSuperSegments(4, matrices);

    expect(actual).toEqual(expected);
  });

  it("handles two overlapping matrices", () => {
    const matrices = [0b0110, 0b1111];

    const expected = new Set(matrices);
    const actual = calculateSuperSegments(4, matrices);

    expect(actual).toEqual(expected);
  });

  it("handles three overlapping matrices", () => {
    const matrices = [0b10101010, 0b11101110, 0b11111111];

    const expected = new Set([0b10101010, 0b11101110, 0b11111111]);
    const actual = calculateSuperSegments(8, matrices);

    expect(actual).toEqual(expected);
  });
});

describe("makeSegmentsUnique", () => {
  it("handles single segment", () => {
    const segments = [0b0110];

    const expected = new Set(segments);
    const actual = makeSegmentsUnique(segments);

    expect(actual).toEqual(expected);
  });

  it("handles two discrete segments", () => {
    const segments = [0b0110, 0b1001];

    const expected = new Set(segments);
    const actual = makeSegmentsUnique(segments);

    expect(actual).toEqual(expected);
  });

  it("handles two overlapping segments", () => {
    const segments = [0b0110, 0b1111];

    const expected = new Set([0b1001, 0b0110]);
    const actual = makeSegmentsUnique(segments);

    expect(actual).toEqual(expected);
  });

  it("handles three overlapping segments", () => {
    const matrices = [0b10101010, 0b11101110, 0b11111111];

    const expected = new Set([0b10101010, 0b01000100, 0b00010001]);
    const actual = makeSegmentsUnique(matrices);

    expect(actual).toEqual(expected);
  });
});

describe("calculateSegments", () => {
  it("handles single matrix", () => {
    const matrix = 0b0110;

    const expected = new Set([matrix]);
    const actual = calculateSegments(4, [matrix]);

    expect(actual).toEqual(expected);
  });

  it("handles two discrete matrices", () => {
    const matrices = [0b0110, 0b1001];

    const expected = new Set([0b1001, 0b0110]);
    const actual = calculateSegments(4, matrices);

    expect(actual).toEqual(expected);
  });

  it("handles two overlapping matrices", () => {
    const matrices = [0b0110, 0b1111];

    const expected = new Set([0b1001, 0b0110]);
    const actual = calculateSegments(4, matrices);

    expect(actual).toEqual(expected);
  });

  it("handles three overlapping matrices", () => {
    const matrices = [0b10101010, 0b11101110, 0b11111111];

    const expected = new Set([0b10101010, 0b01000100, 0b00010001]);
    const actual = calculateSegments(8, matrices);

    expect(actual).toEqual(expected);
  });
});
