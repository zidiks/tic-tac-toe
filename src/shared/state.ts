export class State {

    public turn = "";
    public oMovesCount = 0;
    public result = "still running";
    public board: any[] = [];

    constructor(old?: State) {
        if(typeof old !== "undefined") {
            // if the state is constructed using a copy of another state
            const len = old.board.length;
            this.board = new Array(len);
            for(let itr = 0 ; itr < len ; itr++) {
                this.board[itr] = old.board[itr];
            }

            this.oMovesCount = old.oMovesCount;
            this.result = old.result;
            this.turn = old.turn;
        }
    }

    public advanceTurn() {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    public emptyCells() {
        const indxs = [];
        for(let itr = 0; itr < 9 ; itr++) {
            if(this.board[itr] === "E") {
                indxs.push(itr);
            }
        }
        return indxs;
    }

    public isTerminal() {
        const B = this.board;

        //check rows
        for(let i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.result = B[i] + "-won"; //update the state result
                return true;
            }
        }

        //check columns
        for(let i = 0; i <= 2 ; i++) {
            if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.result = B[i] + "-won"; //update the state result
                return true;
            }
        }

        //check diagonals
        for(let i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.result = B[i] + "-won"; //update the state result
                return true;
            }
        }

        const available = this.emptyCells();
        if(available.length == 0) {
            //the game is draw
            this.result = "draw"; //update the state result
            return true;
        }
        else {
            return false;
        }
    };

}