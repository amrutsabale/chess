import { useEffect, useState } from "react";
import { useSocket } from "../../hooks";
import { GAME_OVER, INIT_GAME, MOVE } from "../../utils";
import Button from "../Button";
import ChessBoard from "../ChessBoard";
import { Chess } from "chess.js";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("message", message);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true);
          console.log("Game initialized");
          break;
        case MOVE: {
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("move made", move);
          break;
        }
        case GAME_OVER:
          setStarted(false);
          console.log("Game over");
          break;
      }
    };
  }, [socket]);

  if (!socket) {
    return <div>Connecting...</div>;
  }
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
          <div className="cols-span-4 flex justify-center w-full">
            <ChessBoard
              chess={chess}
              setBoard={setBoard}
              board={board}
              socket={socket}
            />
          </div>
          <div className="cols-span-1 w-full flex-col flex justify-center bg-slate-800">
            <div className="w-full flex justify-center">
              {!started && (
                <Button
                  onClick={() => {
                    socket.send(
                      JSON.stringify({
                        type: INIT_GAME,
                      })
                    );
                  }}
                >
                  Play
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
