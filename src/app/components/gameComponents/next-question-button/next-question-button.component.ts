import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-next-question-button',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './next-question-button.component.html',
  styleUrl: './next-question-button.component.scss'
})
export class NextQuestionButtonComponent {
  @Output() nextQuestion = new EventEmitter<void>();

  buttonClick() {
    this.nextQuestion.emit();
  }
}
