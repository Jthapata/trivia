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
  }

  getGameSettings() {
    return this.gameSettings;
  }

  getCategories() {
    return this.categories;
  }

  getQuestions() {
    let baseUrl : string = 'https://opentdb.com/api.php?';
    const { numberOfQuestions, selectedDifficulty, selectedCategory, selectedQuestionType } = this.gameSettings;

    baseUrl += `amount=${numberOfQuestions}&category=${selectedCategory}`;

    if (selectedDifficulty !== 'any') {
      baseUrl += `&difficulty=${selectedDifficulty}`;
    }

    if (selectedQuestionType !== 'any') {
      baseUrl += `&type=${selectedQuestionType}`;
    }

    return fetch(baseUrl);
  }
}
