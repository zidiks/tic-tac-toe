import template from "./local.module.html";
import styles from "./local.module.scss"
import { Module, ModuleCore } from "../../core/module";
import { Game } from "../../shared/game.local";
import { State } from "../../shared/state";

export type fieldValue = '' | '×' | '○'

@Module({
    styles: styles,
    template: template
})
export class LocalModule extends ModuleCore {

    public game: Game = new Game(this);

    public board: string[] = [
        '', '' , '',
        '', '' , '',
        '', '' , '',
    ];
    public boardIndexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    public turn: string = 'Waiting...';


    public click = (e: any, value: number) => {
        if(this.game.status === "running" && this.game.currentState.turn === "X" && !this.board[value]) {
            const indx = value

            const next = new State(this.game.currentState);
            next.board[indx] = "X";

            this.board[indx] = "×";

            next.advanceTurn();

            this.game.advanceTo(next);

        } else if(this.game.status === "running" && this.game.currentState.turn === "O" && !this.board[value]){
            const indx = value

            const next = new State(this.game.currentState);
            this.board[indx] = "O";

            this.board[indx] = "○";

            next.advanceTurn();

            this.game.advanceTo(next);
        } 
    }

    public init(): void {
        setTimeout(() => {
            this.game.start();
        }, 10);
    }

    public destroy(): void {

    }

}