import template from "./single.module.html";
import styles from "./single.module.scss"
import { Module, ModuleCore } from "../../core/module";

type fieldValue = '' | '×' | '○'

interface Field {
    symbol: fieldValue;
}

@Module({
    styles: styles,
    template: template
})
export class SingleModule extends ModuleCore {

    public field: fieldValue[][] = [
        [ '○', '', '○' ],
        [ '○', '', '○' ],
        [ '○', '', '' ],
    ]
    public fieldIndexes: any[][] = [
        [ [0, 0],[0, 1], [0, 2] ],
        [ [1, 0],[1, 1], [1, 2] ],
        [ [2, 0],[2, 1], [2, 2] ],
    ]

    public fieldClick = (event: any, value: any) => {
        const field = this.field[value[0]][value[1]];
        if (!field) {
            this.field[value[0]][value[1]] = '×';
        }
    }

    public init(): void {
    }

    public destroy(): void {
        console.log('single game closed');
    }

}