import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-start-game-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './start-game-button.component.html',
  styleUrls: ['./start-game-button.component.scss'],
})
export class StartGameButtonComponent {
  // Output event to emit when the start game button is clicked
  @Output() startGame = new EventEmitter<void>();

  constructor() {}

  onStartGame() {
    this.startGame.emit();
  }
}
