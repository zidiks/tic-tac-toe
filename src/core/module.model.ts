export interface Module {
    template: any;
    init(): void;
    destroy?(): void;
}