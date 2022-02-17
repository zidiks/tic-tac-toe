import { routes } from "../modules/routes";
import { ModuleModel } from "./module.model";

export class Router {

    private appEl: HTMLElement;
    private currentModule: any;

    constructor() {
        const body = document.body;
        this.appEl = document.createElement('app');
        body.appendChild(this.appEl);
        setTimeout(() => {
            this.routeTo( routes.find(route => route.bootstrap).patch );
        });
    }

    public getAllLinks(): void {
        Array.from( document.querySelectorAll('route') ).forEach(el => {
            el.addEventListener('click', () => {
                const src = el.getAttribute('src');
                if (src) {
                    this.routeTo(src);
                }

            });
        });
    }

    public routeTo(patch: string): void {
        const currentRoute = routes.find(route => route.patch === patch) || routes.find(route => route.patch === '*');
        if (currentRoute) {
            if (this.currentModule?.destroy) {
                this.currentModule.destroy();
            }
            const module: ModuleModel = new currentRoute.module();
            this.currentModule = module;
            this.appEl.innerHTML = module.interpolate(module.template);
            module.replaceClasses(this.appEl);
            module.doCheck();
            if (module?.init) {
                module.init();
            }
            this.getAllLinks();
        } else {
            throw new Error('Cannot find a correct route.');
        }
    }

}
