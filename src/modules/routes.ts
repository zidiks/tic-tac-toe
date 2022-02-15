import { Route } from "../core/route.model";
import { MenuModule } from "./menu/menu.module";
import { ScoreModule } from "./score/score.module";

export const routes: Route[] = [
    {
        patch: 'menu',
        module: MenuModule
    },
    {
        patch: 'score',
        module: ScoreModule,
        bootstrap: true,
    },
    {
        patch: '*',
        module: MenuModule
    },
];