import { ModuleDecoratorOptions, ModuleModel } from "./module.model";

export const Module = (options: ModuleDecoratorOptions) => {
    return <T extends {new(...args:any[]):{}}>(constructor: T) => {
        return class extends constructor {
            public template = options.template;
            public styles = options.styles;
        }
    }
}

export class ModuleCore implements ModuleModel {

    public template: string;
    public styles: any;
    public vChangeEls: HTMLElement[] = [];
    public vProps: string[] = [];


    public getProp(propString: string): any {
        const result = this.propByObjString(this, propString);
        if (result) {
            return result;
        }
        throw new Error(`Can't find parameter "${propString}"`);
    }

    public doCheck(): void {
        const thisClass = this;
        this.vChangeEls = Array.from(document.querySelectorAll('v-change'));
        this.vProps = this.vChangeEls.map(el => {
            const prop = el.getAttribute('prop');
            const propValue = this.getProp(prop);
            el.textContent = propValue.prop.value;
            // @ts-ignore
            this[prop + "_internal"] = propValue.prop.value;
            (function(k){
                Object.defineProperty(propValue.parent, k, {
                    get:function() {
                        // @ts-ignore
                        return thisClass[k + "_internal"];
                    },
                    set: function(x) {
                        thisClass.vChangeEls.find((el: HTMLElement) => el.getAttribute('prop') === prop).textContent = x;
                        // @ts-ignore
                        thisClass[k + "_internal"] = x;
                    }
                });
            })(propValue.prop.name);
            return prop;
        });
    }

    public replaceClasses(moduleEl: HTMLElement): void {
        Object.keys(this.styles).forEach(cssClass => {
            Array.from(moduleEl.getElementsByClassName(cssClass)).forEach(el => {
               el.classList.remove(cssClass);
               el.classList.add(this.styles[cssClass]);
            });
        });
    }

    public interpolate(template: string): string {
        if (!template) {
            throw new Error(`Can't get template`);
        }
        const curlyRe = /\{(.+?)\}/g;
        const replacer = (match: string) => {
            return `<v-change prop='${match.replace(/\s+/g, '').slice(1,-1)}'></v-change>`
        }
        return template.replace(curlyRe, replacer);
    }

    public propByObjString (o: any, s: string): any {
        s = s.replace(/\[(\w+)\]/g, '.$1');
        s = s.replace(/^\./, '');
        const a = s.split('.');
        let parent: any = undefined;
        for (let i = 0, n = a.length; i < n; ++i) {
            let k = a[i];
            if (i === n - 1) {
                parent = o;
            }
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return {
            prop: {
                value: o,
                name: a[a.length-1]
            },
            parent: parent
        };
    }
}