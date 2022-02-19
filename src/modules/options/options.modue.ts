import template from "./options.module.html";
import styles from "./options.module.scss"
import { Module, ModuleCore } from "../../core/module";

@Module({
    styles: styles,
    template: template
})
export class OptionsModule extends ModuleCore {

    public init(): void {
    }

    public destroy(): void {
    }

}