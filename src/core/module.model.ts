export interface ModuleModel {
    template: any;
    init?(): void;
    destroy?(): void;
}