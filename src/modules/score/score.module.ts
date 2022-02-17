import template from "./score.module.html";
import styles from "./score.module.scss"
import { Module, ModuleCore } from "../../core/module";

@Module({
    styles: styles,
    template: template
})
export class ScoreModule extends ModuleCore {

    public init(): void {
    }

    public destroy(): void {
    }

}