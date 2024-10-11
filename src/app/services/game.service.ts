import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameSettings: any = {};

  // Stores the game settings
  setGameSettings(settings: any) {
    this.gameSettings = settings;
  }

  // Retrieves the game settings
  getGameSettings() {
    return this.gameSettings;
  }
}
