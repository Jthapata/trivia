import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-difficulty-selection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  templateUrl: './difficulty-selection.component.html',
  styleUrls: ['./difficulty-selection.component.scss'],
})
export class DifficultySelectionComponent {
  // FormControl for difficulty level with non-nullable option
  difficultyControl = new FormControl<string | 'any'>('any', {
    validators: [Validators.required],
    nonNullable: true,
  });

  // Output event to emit the selected difficulty
  @Output() difficultyChange = new EventEmitter<string | 'any'>();

  // Difficulty options
  difficulties = [
    { value: 'any', viewValue: 'Any Difficulty' },
    { value: 'easy', viewValue: 'Easy' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'hard', viewValue: 'Hard' },
  ];

  constructor() {
    // Emit initial value
    this.difficultyChange.emit(this.difficultyControl.value);

    // Listen for value changes and emit them
    this.difficultyControl.valueChanges.subscribe((value) => {
      this.difficultyChange.emit(value);
    });
  }
}
