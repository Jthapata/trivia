import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-type-selection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  templateUrl: './question-type-selection.component.html',
  styleUrls: ['./question-type-selection.component.scss'],
})
export class QuestionTypeSelectionComponent {
  // FormControl for question type with non-nullable option
  questionTypeControl = new FormControl<string | 'any'>('any', {
    validators: [Validators.required],
    nonNullable: true,
  });

  // Output event to emit the selected question type
  @Output() questionTypeChange = new EventEmitter<string | 'any'>();

  // Question type options
  questionTypes = [
    { value: 'any', viewValue: 'Any Type' },
    { value: 'multiple', viewValue: 'Multiple Choice' },
    { value: 'boolean', viewValue: 'True / False' },
  ];

  constructor() {
    // Emit initial value
    this.questionTypeChange.emit(this.questionTypeControl.value);

    // Listen for value changes and emit them
    this.questionTypeControl.valueChanges.subscribe((value) => {
      this.questionTypeChange.emit(value);
    });
  }
}
