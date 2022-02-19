import template from "./single.module.html";
import styles from "./single.module.scss"
import { Module, ModuleCore } from "../../core/module";

@Module({
    styles: styles,
    template: template
})
export class SingleModule extends ModuleCore {

    public init(): void {
    }

    public destroy(): void {
        console.log('single game closed');
    }

}