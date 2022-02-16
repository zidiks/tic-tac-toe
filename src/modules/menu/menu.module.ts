import template from "./menu.module.html";
import { firebase } from "../../app";
import "./menu.module.scss";
import { Unsubscribe } from "@firebase/firestore";
import { ModuleCore } from "../../core/module";

export class MenuModule extends ModuleCore {

    public title: string = 'Menu title';

    public template = this.interpolate(template);

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