import { useState } from "react";
import { cn } from "./lib/utils";

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
        }, index * 100);
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 mx-auto mt-32 gap-2 w-40">
        {matrix.map((row, i) =>
          row.map((color, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => handleClick(i, j)}
              className={cn(
                "w-12 h-12 border flex items-center shadow-inner justify-center cursor-pointer",
                i === 0 && j === 0 && "rounded-tl-lg",
                i === 0 && j === 2 && "rounded-tr-lg",
                i === 2 && j === 0 && "rounded-bl-lg",
                i === 2 && j === 2 && "rounded-br-lg",
                i === 0 && "border-b-0",
                i === 2 && "border-t-0",
                j === 0 && "border-r-0",
                j === 2 && "border-l-0",
                color === "green" && "bg-green-500",
                color === "orange" && "bg-orange-500",
                color === "white" && "bg-white",
                color === "white" && "hover:bg-gray-200"
              )}
            />
          ))
        )}
      </div>
      <div className="text-center">
        {clickOrder.length === 9 ? (
          <div className="flex flex-col gap-2">
            <span>Bingo</span>
            <button
              onClick={() => {
                setClickOrder([]);
                setMatrix(
                  Array(3)
                    .fill(null)
                    .map(() => Array(3).fill("white"))
                );
              }}
              className="border-[#004733] hover:bg-[#00473320] border-2 transition-all text-[#004733] rounded-full px-10 py-2"
            >
              Reset
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
