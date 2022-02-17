import { ModuleCore } from "../../core/module";
import template from "./score.module.html";

export class ScoreModule extends ModuleCore {

    public template = template;

    public init(): void {
        console.log('score dicks');
    }
}