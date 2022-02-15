import { routes } from "../modules/routes";

export class Router {

    private appEl: HTMLElement;

    constructor() {
        const body = document.body;
        this.appEl = document.createElement('app');
        body.appendChild(this.appEl);
        this.routeTo( routes.find(route => route.bootstrap).patch );
    }

    public getAllLinks(): void {
        Array.from( document.querySelectorAll('route') ).forEach(el => {
            el.addEventListener('click', () => {
                this.routeTo( el.getAttribute('src') );
            });
        });
    }

    public routeTo(patch: string): void {
        const currentRoute = routes.find(route => route.patch === patch) || routes.find(route => route.patch === '*');
        if (currentRoute) {
            const module = new currentRoute.module();
            this.appEl.innerHTML = module.template;
            module.init();
            this.getAllLinks();
        } else {
            throw new Error('Cannot find a correct route.');
        }
    }

}