import {Injectable} from '@angular/core';
import {PlayerStats} from "../interfaces/player-stats";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private playerStats: PlayerStats[] = [];

  constructor() { }

  setPlayerStats(id: string, email: string, correctAnswers: number, incorrectAnswers: number) {
    const existingStats = this.playerStats.find(stat => stat.id === id);
    if (existingStats) {
      existingStats.correctAnswers += correctAnswers;
      existingStats.incorrectAnswers += incorrectAnswers;
    } else {
      this.playerStats.push({id, email, correctAnswers, incorrectAnswers });
    }
  }

  resetPlayerStats() {
    this.playerStats = [];
  }

  getAllPlayerStats() {
    return this.playerStats;
  }
}
