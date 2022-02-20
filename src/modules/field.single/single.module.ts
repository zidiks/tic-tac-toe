import template from "./single.module.html";
import styles from "./single.module.scss"
import { Module, ModuleCore } from "../../core/module";
import {Game} from "../../shared/game";
import {AI} from "../../shared/ai";
import {State} from "../../shared/state";

export type fieldValue = '' | '×' | '○'

@Module({
    styles: styles,
    template: template
})
export class SingleModule extends ModuleCore {

    public board: string[] = [
        '', '' , '',
        '', '' , '',
        '', '' , '',
    ];
    public boardIndexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    public turn: string = 'Waiting...';

    public game: Game = new Game(new AI(2), this);

    public click = (e: any, value: number) => {
        if(this.game.status === "running" && this.game.currentState.turn === "X" && !this.board[value]) {
            const indx = value

            const next = new State(this.game.currentState);
            next.board[indx] = "X";

            this.board[indx] = "×";

            next.advanceTurn();

            this.game.advanceTo(next);

        }
    }

    public init(): void {
        setTimeout(() => {
            this.game.ai.plays(this.game);
            this.game.start();
        }, 1000);
    }

    public destroy(): void {

    }

}