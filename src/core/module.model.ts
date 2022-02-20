export interface ModuleModel {
    template: string;
    styles?: any;
    init?(): void;
    destroy?(): void;
    doCheck(): void;
    replaceClasses(moduleEL: HTMLElement): void;
}

export interface ModuleDecoratorOptions {
    template: string;
    styles: any;
}