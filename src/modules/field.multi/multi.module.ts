import template from "./multi.module.html";
import styles from "./multi.module.scss"
import { Module, ModuleCore } from "../../core/module";

@Module({
    styles: styles,
    template: template
})
export class MultiModule extends ModuleCore {

    public init(): void {
    }

    public destroy(): void {
        console.log('single game closed');
    }

}