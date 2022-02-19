import { Route } from "../core/route.model";
import { LobbyModule } from "./lobby/lobby.module";
import { MenuModule } from "./menu/menu.module";
import { ProfileModule } from "./profile/profile.module";
import { ScoreModule } from "./score/score.module";

export const routes: Route[] = [
    {
        patch: 'menu',
        module: MenuModule,
        bootstrap: true,
    },
    {
        patch: 'score',
        module: ScoreModule,
    },
    {
        patch: 'profile',
        module: ProfileModule,
    },
    {
        patch: 'lobby',
        module: LobbyModule,
    },
    {
        patch: '*',
        module: MenuModule
    },
];