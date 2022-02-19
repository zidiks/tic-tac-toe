import template from "./lobby.module.html";
import styles from "./lobby.module.scss"
import { Module, ModuleCore } from "../../core/module";

@Module({
    styles: styles,
    template: template
})
export class LobbyModule extends ModuleCore {

    public init(): void {
    }

    public destroy(): void {
    }

}