import { Module } from "../../core/module.model";
import template from "./menu.module.html";
import "./menu.module.scss";

export class MenuModule implements Module {

    public template = template;

    public init(): void {
        console.log('menu dicks');
    }
}