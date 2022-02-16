import { ModuleCore } from "../../core/module";
import template from "./score.module.html";
import "./score.module.scss";

export class ScoreModule extends ModuleCore {

    public template = template;

    public init(): void {
        console.log('score dicks');
    }
}