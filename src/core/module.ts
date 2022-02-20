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

    public getProp(propString: string, cl: any): any {
        const result = this.propByObjString(cl, propString);
        if (result) {
            return result;
        }
        throw new Error(`Can't find parameter "${propString}"`);
    }

    public doCheck(): void {
        this.vBind(Array.from(document.querySelectorAll(`[v-bind]`)));

    }

    public replaceClasses(moduleEl: HTMLElement): void {
        Object.keys(this.styles).forEach(cssClass => {
            Array.from(moduleEl.getElementsByClassName(cssClass)).forEach(el => {
               el.classList.remove(cssClass);
               el.classList.add(this.styles[cssClass]);
            });
        });
    }

    private vBind(vBindEls: HTMLElement[]): void {
        const propsSet = new Set();
        vBindEls.forEach(el => {
            const thisClass = this;
            const prop = el.getAttribute('v-bind');
            if (!propsSet.has(prop)) {
                propsSet.add(prop);
                const propValue = this.getProp(prop, thisClass);
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
                            const setEls = vBindEls.filter((el: HTMLElement) => el.getAttribute('v-bind') === prop);
                            if (setEls.length > 0) {
                                setEls.forEach((setEl => {
                                    setEl.textContent = x;
                                }))
                            }
                            // @ts-ignore
                            thisClass[k + "_internal"] = x;
                        }
                    });
                })(propValue.prop.name);
            } else {
                // @ts-ignore
                el.textContent = thisClass[prop + "_internal"];
            }
        });
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
            const r = o[k];
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