import {Injectable} from '@angular/core';
import {PlayerStats} from "../interfaces/player-stats";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private playerStats: PlayerStats[] = [];

  constructor() { }

  setPlayerStats(email: string, correctAnswers: number, incorrectAnswers: number) {
    const existingStats = this.playerStats.find(stat => stat.email === email);
    if (existingStats) {
      existingStats.correctAnswers += correctAnswers;
      existingStats.incorrectAnswers += incorrectAnswers;
    } else {
      this.playerStats.push({ email, correctAnswers, incorrectAnswers });
    }
  }

  getPlayerStats(email: string) {
    return this.playerStats.find(stat => stat.email === email);
  }

  resetPlayerStats() {
    this.playerStats = [];
  }

  getAllPlayerStats() {
    return this.playerStats;
  }
}
