import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardHeader} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [
    MatCard,
    NgForOf,
    MatCardHeader,
    NgIf
  ],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss'
})
export class AnswersComponent {
  @Input() currentAnswers: string[] = [];
  @Output() answerSelected = new EventEmitter<string>();

  selectAnswer(answer: string) {
    this.answerSelected.emit(answer);
  }
}
