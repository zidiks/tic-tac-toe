import { ModuleModel } from "./module.model";

export class ModuleCore implements ModuleModel {

    public template: string;

    public getProp(propName: string): any {
        const name =  propName.slice(1,-1);
        const result = Object.entries(this).find(item => item[0] === name)
        if (result) {
            return result[1].toString();
        }
        throw new Error(`Can't find parameter with name "${name}"`);
    }


    public interpolate(template: string): string {
        try {
            const curlyRe = /\{(.+?)\}/g;
            const replacer = (match: string) => {
                return this.getProp(match.replace(/\s+/g, '')) || 'empty'
            }
            return template.replace(curlyRe, replacer);
        }
        catch (e) {
            return `
                <h2 style="color: red;">Can't render template...</h2>
                <p>${e}</p>
            `;
        }
    }
}