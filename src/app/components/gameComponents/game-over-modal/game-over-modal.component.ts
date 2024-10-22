import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-over-modal',
  standalone: true,
  imports: [MatButton, CommonModule],
  templateUrl: './game-over-modal.component.html',
  styleUrl: './game-over-modal.component.scss'
})
export class GameOverModalComponent {
  @Input() winners: string[] = [];

  constructor( private router: Router) {}

  navigateToGameSetup() {
    this.router.navigate(['/game-setup']);
  }
}
