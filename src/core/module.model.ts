export interface ModuleModel {
    template: string;
    styles?: any;
    init?(): void;
    destroy?(): void;
    interpolate(template: string): string;
    doCheck(): void;
    replaceClasses(moduleEL: HTMLElement): void;
}

export interface ModuleDecoratorOptions {
    template: string;
    styles: any;
}