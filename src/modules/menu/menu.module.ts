import template from "./menu.module.html";
import styles from "./menu.module.scss"
import { firebase } from "../../app";
import { Unsubscribe } from "@firebase/firestore";
import { Module, ModuleCore } from "../../core/module";

@Module({
    styles: styles,
    template: template
})
export class MenuModule extends ModuleCore {

    public buttons = {
        playSingle: 'Play Single',
        playMultiplayer: 'Play Multiplayer'
    }
    public title: string = 'Menu title';
    private unsubscribe: Unsubscribe;

    public init(): void {
        this.unsubscribe = firebase.getData();
    }

    public destroy(): void {
        console.log('menu closed');
        this.unsubscribe();
    }

}