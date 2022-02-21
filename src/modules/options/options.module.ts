import template from "./options.module.html";
import styles from "./options.module.scss"
import { Module, ModuleCore } from "../../core/module";
import { AI } from "../../shared/ai";

export let isSounds = true;
export let difficulty:any;
let justNumber = 3;
difficulty = justNumber;

@Module({
    styles: styles,
    template: template
})

export class OptionsModule extends ModuleCore {

    public init(): void {
        this.setClass();
    }

    public destroy(): void {
    }
    
    public onActive = true;
    public offActive = false;

    public changeDifficulty1 = () => {
        difficulty = 1;
        document.getElementById("easy").className = "dif-active";
        document.getElementById("medium").className = "dif";
        document.getElementById("hard").className = "dif";
    }

    public changeDifficulty2 = () => {
        difficulty = 2;
        document.getElementById("easy").className = "dif";
        document.getElementById("medium").className = "dif-active";
        document.getElementById("hard").className = "dif";
    }

    public changeDifficulty3 = () => {
        difficulty = 3;
        document.getElementById("easy").className = "dif";
        document.getElementById("medium").className = "dif";
        document.getElementById("hard").className = "dif-active";
    }

    setClass = () => {
        if (isSounds === true) {
            document.getElementById('on').className = "on-active";
        } else {
            document.getElementById('off').className = "on-active";
        }
        if (difficulty === 1) {
            document.getElementById("easy").className = "dif-active";
            document.getElementById("medium").className = "dif";
            document.getElementById("hard").className = "dif";
        } else if (difficulty === 2) {
            document.getElementById("easy").className = "dif";
            document.getElementById("medium").className = "dif-active";
            document.getElementById("hard").className = "dif";
        } else if (difficulty === 3) {
            document.getElementById("easy").className = "dif";
            document.getElementById("medium").className = "dif";
            document.getElementById("hard").className = "dif-active";
        }
    }

    changeClass = () => {
        if (this.onActive === true && this.offActive === false) {
            document.getElementById('on').className = "on-active";
            document.getElementById('off').className = "on";
        } else if (this.onActive === false && this.offActive === true) {
            document.getElementById('off').className = "on-active";
            document.getElementById('on').className = "on";
        }
    }

    soundsOn = () => {
        isSounds = true;
        this.onActive = true;
        this.offActive = false;
        this.changeClass();
    }

    soundsOff = () => {
        isSounds = false;
        this.onActive = false;
        this.offActive = true;
        this.changeClass();
    }

}