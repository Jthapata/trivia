import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameSettings: any = {};

  setGameSettings(settings: any) {
    this.gameSettings = settings;
  }

  getGameSettings() {
    return this.gameSettings;
  }
}
