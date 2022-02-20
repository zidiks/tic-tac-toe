import template from "./menu.module.html";
import styles from "./menu.module.scss";
import { Module, ModuleCore } from "../../core/module";

import { firebase } from "../../app";
import { Unsubscribe } from "@firebase/firestore";

@Module({
    styles: styles,
    template: template
})
export class MenuModule extends ModuleCore {

    public buttons = {
        playSingle: 'Play Single',
        playMultiplayer: 'Play Multiplayer',
        profile: 'Profile',
        score: 'Score',
        options: 'Options',
    }
    public title: string = 'Menu';
    private unsubscribe: Unsubscribe;

    public init(): void {
        this.unsubscribe = firebase.getData();
    }

    public destroy(): void {
        console.log('menu closed');
        this.unsubscribe();
    }

}