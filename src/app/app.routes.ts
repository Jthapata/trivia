import { Routes } from '@angular/router';
import { GameSetupComponent } from './pages/game-setup/game-setup.component';
import { HomeComponent } from "./pages/home/home.component";
import { GameComponent } from './pages/game/game.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'game-setup', component: GameSetupComponent },
    { path: 'game', component: GameComponent },
    { path: 'home', component: HomeComponent },  
];
