import { Module } from "../../core/module.model";
import template from "./score.module.html";
import "./score.module.scss";

export class ScoreModule implements Module {

    public template = template;

    public init(): void {
        console.log('score dicks');
    }
}