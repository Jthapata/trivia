import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../../interfaces/user';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';


@Component({
  selector: 'app-selected-players',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatOptionModule
  ],
  templateUrl: './selected-players.component.html',
  styleUrls: ['./selected-players.component.scss'],
})
export class SelectedPlayersComponent implements OnChanges {
  @Input() numberOfPlayers!: number;
  @Input() availableUsers$!: Observable<User[]>;
  @Output() selectedPlayersChange = new EventEmitter<string[]>();

  selectedPlayersControl = new FormControl<string[]>([], {
    validators: [],
    nonNullable: true,
  });

  constructor() {
    // Emit initial value
    this.selectedPlayersChange.emit(this.selectedPlayersControl.value);

    // Listen for value changes and emit them
    this.selectedPlayersControl.valueChanges.subscribe((value) => {
      this.selectedPlayersChange.emit(value);
    });
  }

  ngOnChanges() {
    if (this.numberOfPlayers > 1) {
      // Set validators based on the number of players
      this.selectedPlayersControl.setValidators([
        Validators.required,
        Validators.minLength(this.numberOfPlayers),
        Validators.maxLength(this.numberOfPlayers),
      ]);
    } else {
      // Clear validators if only one player
      this.selectedPlayersControl.clearValidators();
      this.selectedPlayersControl.setValue([]);
    }
    this.selectedPlayersControl.updateValueAndValidity();
  }
}
