import { Route } from "../core/route.model";
import { LobbyModule } from "./lobby/lobby.module";
import { MenuModule } from "./menu/menu.module";
import { ProfileModule } from "./profile/profile.module";
import { ScoreModule } from "./score/score.module";
import { OptionsModule } from "./options/options.modue";
import { SingleModule } from "./field.single/single.module";
import { MultiModule } from "./field.multi/multi.module";
import { ChoiceModule } from "./choice/choice.module";

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
        patch: 'options',
        module: OptionsModule,
    },
    {
        patch: 'single-field',
        module: SingleModule,
    },
    {
        patch: 'multi-field',
        module: MultiModule,
    },
    {
        patch: 'multi-choice',
        module: ChoiceModule,
    },
    {
        patch: '*',
        module: MenuModule
    },
];