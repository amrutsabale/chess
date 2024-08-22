/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../utils";

const ChessBoard = ({
  board,
  socket,
  chess,
  setBoard,
}: {
  chess: Chess;
  setBoard: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<Square | null>(null);

  const handleMove = (
    sqr: {
      square: Square;
      type: PieceSymbol;
      color: Color;
    } | null,
    squareRep: Square
  ) => {
    if (!from) {
      setFrom(squareRep);
    } else {
      socket.send(
        JSON.stringify({
          type: MOVE,
          payload: {
            move: {
              from,
              to: squareRep,
            },
          },
        })
      );
      setFrom(null);
      chess.move({
        from,
        to: squareRep,
      });
      setBoard(chess.board());
      console.log("from, to", from, squareRep);
    }
  };

  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map(
              (
                square: {
                  square: Square;
                  type: PieceSymbol;
                  color: Color;
                } | null,
                j
              ) => {
                const squareRep: Square = (String.fromCharCode(97 + (j % 8)) +
                  "" +
                  (8 - i)) as Square;
                return (
                  <div
                    key={j}
                    className={`w-16 h-16 flex justify-center items-center ${
                      (i + j) % 2 == 0 ? "bg-green-500" : "bg-white"
                    }`}
                    onClick={() => handleMove(square, squareRep)}
                  >
                    {square ? (
                      <img
                        className="w-14"
                        src={`/${
                          square?.color === "w"
                            ? square?.type.toUpperCase()
                            : `${square?.type} copy`
                        }.png`}
                      />
                    ) : null}
                  </div>
                );
              }
            )}
          </div>
        );
      })}
      p
    </div>
  );
};

export default ChessBoard;
