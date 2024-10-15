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

  getQuestions() {
    let baseUrl = 'https://opentdb.com/api.php?';
    const { numberOfQuestions, selectedDifficulty, selectedCategory, selectedQuestionType } = this.gameSettings;

    baseUrl += `amount=${numberOfQuestions}`;

    if (selectedDifficulty !== 'any') {
      baseUrl += `&difficulty=${selectedDifficulty}`;
    }

    if (selectedCategory !== 'any') {
      baseUrl += `&category=${selectedCategory}`;
    }

    if (selectedQuestionType !== 'any') {
      baseUrl += `&type=${selectedQuestionType}`;
    }

    return fetch(baseUrl);
  }
}
