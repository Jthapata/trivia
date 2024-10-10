import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss'],
})
export class GameSetupComponent {
  // Form group to manage the game setup form controls and validation
  gameSetupForm: FormGroup;

  // Placeholder data for available users (to be replaced with Firebase data)
  availableUsers = [
    { id: 'user1', name: 'Alice' },
    { id: 'user2', name: 'Bob' },
    { id: 'user3', name: 'Charlie' },
    // Add more users as needed
  ];

  constructor(private fb: FormBuilder) {
    // Initialize the form with default values and validators
    this.gameSetupForm = this.fb.group({
      // Number of players (1 to 3)
      numberOfPlayers: [
        1,
        [Validators.required, Validators.min(1), Validators.max(3)],
      ],
      // Selected players (required if numberOfPlayers > 1)
      selectedPlayers: [[]],
    });

    // Listen for changes in the numberOfPlayers control to update validators
    this.gameSetupForm.get('numberOfPlayers')?.valueChanges.subscribe(() => {
      this.onNumberOfPlayersChange();
    });
  }

  // Updates form validators when the number of players changes.
  // Ensures the selectedPlayers field is validated appropriately.
  onNumberOfPlayersChange() {
    const numberOfPlayers = this.gameSetupForm.get('numberOfPlayers')?.value;
    if (numberOfPlayers > 1) {
      // Require selection of exact number of players if more than one player
      this.gameSetupForm.get('selectedPlayers')?.setValidators([
        Validators.required,
        Validators.minLength(numberOfPlayers),
        Validators.maxLength(numberOfPlayers),
      ]);
    } else {
      // Clear validators if only one player
      this.gameSetupForm.get('selectedPlayers')?.clearValidators();
      this.gameSetupForm.get('selectedPlayers')?.setValue([]);
    }
    // Update the validity of selectedPlayers control
    this.gameSetupForm.get('selectedPlayers')?.updateValueAndValidity();
  }

  // Handles form submission to start the game.
  // Validates the form and logs the selected players.
  startGame() {
    if (this.gameSetupForm.valid) {
      const formValues = this.gameSetupForm.value;
      console.log('Number of Players:', formValues.numberOfPlayers);
      console.log('Selected Players:', formValues.selectedPlayers);
      // Proceed to the next step (e.g., navigate to the game page)
    } else {
      console.log('Form is invalid');
    }
  }
}
