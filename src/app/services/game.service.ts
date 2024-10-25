import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameSettings: any = {};

  constructor( private firestore: AngularFirestore) {}

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

  addPlayerStatsToFirebase(playerStats: any) {
    playerStats.forEach((player: any) => {
      this.firestore.collection('users').doc(player.docId).update({
        cat_general: player.cat_general ?? 0,
        cat_music: player.cat_music ?? 0,
        cat_videoGames: player.cat_videoGames ?? 0,
        cat_mythology: player.cat_mythology ?? 0,
        cat_history: player.cat_history ?? 0,
        correct_answers: player.correct_answers ?? 0,
        games_lost: player.games_lost ?? 0,
        games_played: player.games_played ?? 0,
        games_won: player.games_won ?? 0,
        total_questions: player.total_questions ?? 0,
        wrong_answers: player.wrong_answers ?? 0,
      });
    });
  };
}
