export interface ModuleModel {
    template: string;
    styles?: string;
    init?(): void;
    destroy?(): void;
    interpolate(template: string): string;
    doCheck(): void;
}

export interface ModuleDecoratorOptions {
    template: string;
    styles: string;
}