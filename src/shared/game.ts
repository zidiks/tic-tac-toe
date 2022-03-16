import { AI } from "./ai";
import {State} from "./state";

export class Game {

    public ai: AI;
    public currentState: State;
    public status: string;
    public gameModule: any;

    constructor(
        public autoPlayer: AI,
        public module: any
    ) {
        this.gameModule = module;
        this.ai = autoPlayer;
        this.currentState = new State();
        this.currentState.board = [
            "E", "E", "E",
            "E", "E", "E",
            "E", "E", "E"
        ];

        this.currentState.turn = "X"; //X plays first
        this.status = "beginning";
    }

    public advanceTo (_state: State) {
        this.currentState = _state;
        if(_state.isTerminal()) {
            this.status = "ended";

            if(_state.result === "X-won") {
                //X won
                this.module.turn = "X won!";
                document.getElementById('turn').style.color = 'green';
            }
            else if(_state.result === "O-won") {
                //X lost
                this.module.turn = "O won!";
                document.getElementById('turn').style.color = 'red';
            }
            else {
                //it's a draw
                this.module.turn = "Draw";
                document.getElementById('turn').style.color = 'orange';
            }
        }
        else {
            //the game is still running

            if(this.currentState.turn === "X") {
                this.module.turn = "Now your turn";
            }
            else {
                this.module.turn = "Now AI turn";

                //notify the AI player its turn has come up
                setTimeout(() => {
                    this.ai.notify("O");
                }, 1000);
            }
        }
    };

    public start () {
        if(this.status == "beginning") {
            //invoke advanceTo with the intial state
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }

    public score(_state: State) {
        if(_state.result !== "still running") {
            if(_state.result === "X-won"){
                // the x player won
                return 10 - _state.oMovesCount;
            }
            else if(_state.result === "O-won") {
                //the x player lost
                return -10 + _state.oMovesCount;
            }
            else {
                //it's a draw
                return 0;
            }
        }
    }
}