import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [
    MatCard,
    NgForOf,
    MatCardHeader,
    NgIf,
    MatCardContent,
    NgClass
  ],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss'
})
export class AnswersComponent {
  @Input() currentAnswers: string[] = [];
  @Input() selectedAnswer: string = '';
  @Output() selectedAnswerChange = new EventEmitter<string>();
  @Input() correctAnswer: string = '';

  selectAnswer(answer: string) {
    this.selectedAnswerChange.emit(answer);
  }
}
