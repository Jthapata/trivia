import {Component, Input} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {Question} from "../../../interfaces/question";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input() currentQuestion: Question | undefined;
}
