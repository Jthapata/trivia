import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-number-of-questions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  templateUrl: './number-of-questions.component.html',
  styleUrls: ['./number-of-questions.component.scss'],
})
export class NumberOfQuestionsComponent {
  // Array of question numbers in increments of 6 up to 48
  questionNumbers = Array.from({ length: 8 }, (_, i) => (i + 1) * 6);

  // FormControl for the number of questions with non-nullable option
  numberOfQuestionsControl = new FormControl(6, {
    validators: [
      Validators.required,
      Validators.min(6),
      Validators.max(48),
      this.incrementOfSixValidator,
    ],
    nonNullable: true,
  });

  // Output event to emit the selected number of questions
  @Output() numberOfQuestionsChange = new EventEmitter<number>();

  constructor() {
    // Emit initial value
    this.numberOfQuestionsChange.emit(this.numberOfQuestionsControl.value);

    // Listen for value changes and emit them
    this.numberOfQuestionsControl.valueChanges.subscribe((value) => {
      this.numberOfQuestionsChange.emit(value);
    });
  }

  // Custom validator to ensure the number is an increment of 6
  incrementOfSixValidator(control: AbstractControl) {
    const value = control.value;
    return value % 6 === 0 ? null : { notIncrementOfSix: true };
  }
}
