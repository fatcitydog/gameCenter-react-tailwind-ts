import { useState, useEffect } from "react";

const NUMBER = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

const TwoZeroFourEight = () => {
  const [board, setBorad] = useState<any>(NUMBER);
  const [score, setScore] = useState<number>(0);

  const handleRandomNumber = () => {
    const copyBoard = [...board];
    const rowIndex = Math.floor(Math.random() * 4);
    const colIndex = Math.floor(Math.random() * 4);
    if (copyBoard[rowIndex][colIndex] === null) {
      copyBoard[rowIndex][colIndex] = 2;
      setBorad(copyBoard);
    } else {
      handleRandomNumber();
    }
  };

  const handleLeftAction = () => {
    const copyBoard = [...board];
    for (let rowIndex = 0; rowIndex < copyBoard.length; rowIndex++) {
      const row = copyBoard[rowIndex];
      for (let colIndex = 1; colIndex < row.length; colIndex++) {
        if (row[colIndex] !== null) {
          let moveStep = colIndex;
          while (moveStep > 0) {
            if (row[moveStep - 1] === null) {
              [row[moveStep], row[moveStep - 1]] = [null, row[moveStep]];
            } else if (row[moveStep - 1] === row[moveStep]) {
              [row[moveStep], row[moveStep - 1]] = [null, row[moveStep] * 2];
              setScore((prev) => prev + row[moveStep]);
            }
            moveStep--;
          }
        }
      }
    }
    return copyBoard;
  };

  const handleRightAction = () => {
    const copyBoard = [...board];
    for (let rowIndex = 0; rowIndex < copyBoard.length; rowIndex++) {
      const row = copyBoard[rowIndex];
      for (let colIndex = row.length - 2; colIndex >= 0; colIndex--) {
        if (row[colIndex] !== null) {
          let moveStep = colIndex;
          while (moveStep < row.length - 1) {
            if (row[moveStep + 1] === null) {
              [row[moveStep], row[moveStep + 1]] = [null, row[moveStep]];
            } else if (row[moveStep + 1] === row[moveStep]) {
              [row[moveStep], row[moveStep + 1]] = [null, row[moveStep] * 2];
              setScore((prev) => prev + row[moveStep]);
            }
            moveStep++;
          }
        }
      }
    }
    return copyBoard;
  };

  const handleUpAction = () => {
    const copyBoard = [...board];
    for (let colIndex = 0; colIndex < copyBoard.length; colIndex++) {
      for (
        let rowIndex = 1;
        rowIndex < copyBoard[colIndex].length;
        rowIndex++
      ) {
        if (copyBoard[rowIndex][colIndex] !== null) {
          let moveStep = rowIndex;
          while (moveStep > 0) {
            if (copyBoard[moveStep - 1][colIndex] === null) {
              [
                copyBoard[moveStep][colIndex],
                copyBoard[moveStep - 1][colIndex],
              ] = [null, copyBoard[moveStep][colIndex]];
            } else if (
              copyBoard[moveStep - 1][colIndex] ===
              copyBoard[moveStep][colIndex]
            ) {
              [
                copyBoard[moveStep][colIndex],
                copyBoard[moveStep - 1][colIndex],
              ] = [null, copyBoard[moveStep][colIndex] * 2];
              setScore((prev) => prev + copyBoard[moveStep][colIndex]);
            }
            moveStep--;
          }
        }
      }
    }
    return copyBoard;
  };

  const handleDownAction = () => {
    const copyBoard = [...board];
    for (let colIndex = 0; colIndex < copyBoard.length; colIndex++) {
      for (
        let rowIndex = copyBoard[colIndex].length - 2;
        rowIndex >= 0;
        rowIndex--
      ) {
        if (copyBoard[rowIndex][colIndex] !== null) {
          let moveStep = rowIndex;
          while (moveStep < copyBoard[colIndex].length - 1) {
            if (copyBoard[moveStep + 1][colIndex] === null) {
              [
                copyBoard[moveStep][colIndex],
                copyBoard[moveStep + 1][colIndex],
              ] = [null, copyBoard[moveStep][colIndex]];
            } else if (
              copyBoard[moveStep + 1][colIndex] ===
              copyBoard[moveStep][colIndex]
            ) {
              [
                copyBoard[moveStep][colIndex],
                copyBoard[moveStep + 1][colIndex],
              ] = [null, copyBoard[moveStep][colIndex] * 2];
              setScore(copyBoard[moveStep][colIndex]);
            }
            moveStep++;
          }
        }
      }
    }
    return copyBoard;
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        setBorad(handleLeftAction());
      } else if (e.key === "ArrowRight") {
        setBorad(handleRightAction());
      } else if (e.key === "ArrowUp") {
        setBorad(handleUpAction());
      } else if (e.key === "ArrowDown") {
        setBorad(handleDownAction());
      }
      handleRandomNumber();
    });
  }, []);

  useEffect(() => {
    handleRandomNumber();

    return () => {
      handleRandomNumber();
    };
  }, []);

  return (
    <div className="">
      <div>Total score: {score}</div>
      {board.map((column: number[] | null[], index: number) => (
        <div key={index} className="flex flex-row">
          {column.map((number, index) => {
            if (number === null) {
              return (
                <div
                  key={index}
                  className="flex justify-center items-center w-20 h-20 border-2 border-stone-200"
                ></div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="flex justify-center items-center w-20 h-20 border-2 border-stone-200 text-2xl"
                >
                  {number}
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default TwoZeroFourEight;
