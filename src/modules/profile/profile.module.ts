import template from "./profile.module.html";
import styles from "./profile.module.scss"
import { Module, ModuleCore } from "../../core/module";

@Module({
    styles: styles,
    template: template
})
export class ProfileModule extends ModuleCore {

    public init(): void {
    }

    public destroy(): void {
        console.log('profile tab closed');
    }

}