import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-finish-game-button',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './finish-game-button.component.html',
  styleUrl: './finish-game-button.component.scss'
})
export class FinishGameButtonComponent {
  @Output() finishGame = new EventEmitter<void>();

  buttonClick() {
    this.finishGame.emit();
  }
}
