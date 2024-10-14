import { Component, Input, OnChanges, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../../interfaces/user';
import { Observable, Subscription } from 'rxjs';
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
export class SelectedPlayersComponent implements OnInit, OnChanges, OnDestroy {
  @Input() numberOfPlayers: number = 1;
  @Input() availableUsers$!: Observable<User[]>;
  @Input() currentUserId: string | null = null; 
  @Output() selectedPlayersChange = new EventEmitter<string[]>();

  selectedPlayersControl = new FormControl<string[]>([], {
    validators: [Validators.required],
    nonNullable: true,
  });

  users: User[] = [];
  currentUserName: string = '';
  private usersSubscription!: Subscription;

  constructor() {
    // Emit initial value
    this.selectedPlayersChange.emit(this.selectedPlayersControl.value);

    // Listen for value changes and emit them
    this.selectedPlayersControl.valueChanges.subscribe((value) => {
      this.selectedPlayersChange.emit(value);
    });
  }

  ngOnInit() {
    // Subscribe to availableUsers$ to get users
    this.usersSubscription = this.availableUsers$.subscribe((users) => {
      this.users = users;

      // Find the current user's details
      if (this.currentUserId) {
        const currentUser = this.users.find((user) => user.id === this.currentUserId);
        if (currentUser) {
          this.currentUserName = currentUser.email; // Or use 'name' if available
        }
      }
    });
  }

  ngOnChanges() {
    // Update validators based on numberOfPlayers
    this.selectedPlayersControl.setValidators([
      Validators.required,
      Validators.minLength(this.numberOfPlayers),
      Validators.maxLength(this.numberOfPlayers),
    ]);
    this.selectedPlayersControl.updateValueAndValidity();

    if (this.numberOfPlayers === 1 && this.currentUserId) {
      // Automatically select the current user
      if (this.currentUserId !== null) {
        this.selectedPlayersControl.setValue([this.currentUserId]);
        this.selectedPlayersControl.disable(); // Disable control since no selection is needed
      }
    } else {
      this.selectedPlayersControl.enable();
      this.selectedPlayersControl.setValue([]);
    }
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}