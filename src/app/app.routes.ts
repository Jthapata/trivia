import { Routes } from '@angular/router';
import { GameSetupComponent } from './pages/game-setup/game-setup.component';
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'game-setup', component: GameSetupComponent },
];
