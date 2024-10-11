import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-selection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.scss'],
})
export class CategorySelectionComponent {
  // FormControl for the category with non-nullable option
  categoryControl = new FormControl<number | 'any'>('any', {
    validators: [Validators.required],
    nonNullable: true,
  });

  // Output event to emit the selected category
  @Output() categoryChange = new EventEmitter<number | 'any'>();

  // List of desired categories
  categories = [
    { id: 9, name: 'General Knowledge' },
    { id: 12, name: 'Entertainment: Music' },
    { id: 15, name: 'Entertainment: Video Games' },
    { id: 20, name: 'Mythology' },
    { id: 23, name: 'History' },
  ];

  constructor() {
    this.categoryChange.emit(this.categoryControl.value);

    // Listen for value changes and emit them
    this.categoryControl.valueChanges.subscribe((value) => {
      this.categoryChange.emit(value);
    });
  }
}
