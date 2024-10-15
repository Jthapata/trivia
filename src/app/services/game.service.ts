import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameSettings: any = {};

  categories = [
    { name: 'General Knowledge', value: 'cat_general' },
    { name: 'Music', value: 'cat_music' },
    { name: 'Video Games', value: 'cat_videoGames' },
    { name: 'Mythology', value: 'cat_mythology' },
    { name: 'History', value: 'cat_history' },

  ];

  setGameSettings(settings: any) {
    this.gameSettings = settings;
    console.log('Game Settings set in service:', this.gameSettings);
  }

  getGameSettings() {
    console.log('Game Settings retrieved from service:', this.gameSettings);
    return this.gameSettings;
  }

  getCategories() {
    return this.categories;
  }
}
