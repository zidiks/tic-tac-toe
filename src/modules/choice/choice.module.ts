import template from "./choice.module.html";
import styles from "./choice.module.scss";
import { Module, ModuleCore } from "../../core/module";

@Module({
    styles: styles,
    template: template
})
export class ChoiceModule extends ModuleCore {

    public init(): void {
    }

    public destroy(): void {
        console.log('choice tab closed');
    }

}