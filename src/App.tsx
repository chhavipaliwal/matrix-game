import { useState } from "react";

export default function App() {
  const [matrix, setMatrix] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill("white"))
  );
  const [clickOrder, setClickOrder] = useState<{ row: number; col: number }[]>(
    []
  );

  const handleClick = (row: number, col: number) => {
    if (matrix[row][col] === "white") {
      const newMatrix = matrix.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? "green" : c))
      );
      setMatrix(newMatrix);
      setClickOrder([...clickOrder, { row, col }]);
    }

    if (clickOrder.length === 8) {
      changeToOrange([...clickOrder, { row, col }]);
    }
  };

  const changeToOrange = (order: any) => {
    order.forEach(
      ({ row, col }: { row: number; col: number }, index: number) => {
        setTimeout(() => {
          setMatrix((prevMatrix) =>
            prevMatrix.map((r, i) =>
              r.map((c, j) => (i === row && j === col ? "orange" : c))
            )
          );
        }, index * 300);
      }
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-40">
      {matrix.map((row, i) =>
        row.map((color, j) => (
          <div
            key={`${i}-${j}`}
            onClick={() => handleClick(i, j)}
            className="w-12 h-12 border flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: color }}
          />
        ))
      )}
    </div>
  );
}
