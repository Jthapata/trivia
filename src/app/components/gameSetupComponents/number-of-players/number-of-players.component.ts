import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-number-of-players',
  standalone: true,
  imports: [
    CommonModule, 
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
  
  ],
  templateUrl: './number-of-players.component.html',
  styleUrls: ['./number-of-players.component.scss'],
})
export class NumberOfPlayersComponent {
  // FormControl for the number of players with non-nullable option
  numberOfPlayersControl = new FormControl<number>(1, {
    validators: [Validators.required, Validators.min(1), Validators.max(3)],
    nonNullable: true,
  });

  // Output event to emit the selected number of players
  @Output() numberOfPlayersChange = new EventEmitter<number>();

  constructor() {
    // Emit initial value
    this.numberOfPlayersChange.emit(this.numberOfPlayersControl.value);

    // Listen for value changes and emit them
    this.numberOfPlayersControl.valueChanges.subscribe((value) => {
      this.numberOfPlayersChange.emit(value);
    });
  }
}
