import template from "./lobby.module.html";
import { firebase } from "../../app";
import "./lobby.module.scss";
import { Unsubscribe } from "@firebase/firestore";
import { ModuleCore } from "../../core/module";

export class LobbyModule extends ModuleCore {

    public template = template;

    private unsubscribe: Unsubscribe;

    public init(): void {
        console.log('menu dicks');
        this.unsubscribe = firebase.getData();
    }

    public destroy(): void {
        console.log('menu closed');
        this.unsubscribe();
    }
}