import template from "./menu.module.html";
import styles from "./menu.module.scss";
import { Module, ModuleCore } from "../../core/module";

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
    
    public lolka = () => {
        console.log('lolka');
    }

    public init(): void {
    }

    public destroy(): void {
    }

}