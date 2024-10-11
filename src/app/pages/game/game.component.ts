import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  gameSettings: any;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    // Retrieve the game settings from the service
    this.gameSettings = this.gameService.getGameSettings();
    console.log('Game Settings:', this.gameSettings);
  }
}
