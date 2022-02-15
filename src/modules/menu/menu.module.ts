import { Module } from "../../core/module.model";
import template from "./menu.module.html";
import { firebase } from "../../app";
import "./menu.module.scss";
import { Unsubscribe } from "@firebase/firestore";

export class MenuModule implements Module {

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