import { Routes } from '@angular/router';
import { GameSetupComponent } from './pages/game-setup/game-setup.component';
import { HomeComponent } from "./pages/home/home.component";
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'game-setup', component: GameSetupComponent },
    { path: 'game', component: GameComponent },
];
