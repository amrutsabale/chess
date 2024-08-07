import { Chess } from "chess.js";
import WebSocket from "ws";
import { GEME_OVER, INIT_GAME, MOVE } from "./messages";

export type ChessMove = {
    from: string,
    to: string
}
export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private moveCount: number;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moveCount = 0;
        this.startTime = new Date();
        // let players know game is started
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'white'
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'black'
            }
        }))
    }

    makeMove(socket: WebSocket, move: ChessMove) {
        // Validations
        if (this.moveCount % 2 === 0 && socket !== this.player1) return;
        if (this.moveCount % 2 === 1 && socket !== this.player2) return;
        try {
            this.board.move(move);
        } catch (error) {
            console.error(error);
            return;
        }

        // Check if game is over
        if (this.board.isGameOver()) {
            // send the game over message to both players
            const winnerPayload = { winner: this.board.turn() === 'w' ? 'black' : 'white' }
            const winnerMsg = JSON.stringify({ type: GEME_OVER, payload: winnerPayload });
            this.player1.send(winnerMsg);
            this.player2.send(winnerMsg);
            return;
        }
        // Do if game is not over
        if (this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({ type: MOVE, payload: move }))
        } else {
            this.player1.send(JSON.stringify({ type: MOVE, payload: move }))
        }
        this.moveCount++;
    }
}