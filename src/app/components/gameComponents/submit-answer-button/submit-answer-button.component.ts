import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-submit-answer-button',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './submit-answer-button.component.html',
  styleUrl: './submit-answer-button.component.scss'
})
export class SubmitAnswerButtonComponent {
  @Output() submitAnswer = new EventEmitter<void>();

  buttonClick() {
    this.submitAnswer.emit();
  }
}
