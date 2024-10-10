import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOfPlayersComponent } from '../../components/number-of-players/number-of-players.component';
import { SelectedPlayersComponent } from '../../components/selected-players/selected-players.component';
import { StartGameButtonComponent } from '../../components/start-game-button/start-game-button.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [
    CommonModule,
    NumberOfPlayersComponent,
    SelectedPlayersComponent,
    StartGameButtonComponent,
    ReactiveFormsModule, // Add if using reactive forms
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss'],
})
export class GameSetupComponent implements OnInit {
  // Observable of users fetched from Firebase
  availableUsers$!: Observable<User[]>;

  // Variables to store form values
  numberOfPlayers: number = 1;
  selectedPlayers: string[] = [];

  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    // Fetch users from Firebase Firestore
    this.fetchAvailableUsers();
  }

  // Fetches users who have previously logged into the app from Firebase
  fetchAvailableUsers() {
    // Reference to the 'users' collection in Firestore
    const usersRef = collection(this.firestore, 'users');

    // Get observable of user data
    this.availableUsers$ = collectionData(usersRef, { idField: 'id' }) as Observable<User[]>;
  }

  // Handles changes in the number of players
  onNumberOfPlayersChange(value: number) {
    this.numberOfPlayers = value;
    // Reset selected players when the number of players changes
    this.selectedPlayers = [];
  }

  // Handles changes in the selected players
  onSelectedPlayersChange(value: string[]) {
    this.selectedPlayers = value;
  }

  // Handles form submission to start the game
  startGame() {
    // Perform validation checks
    if (this.numberOfPlayers > 1 && this.selectedPlayers.length !== this.numberOfPlayers) {
      console.log('Please select the correct number of players.');
      return;
    }

    // Log the game settings
    console.log('Number of Players:', this.numberOfPlayers);
    console.log('Selected Players:', this.selectedPlayers);

    // TODO: Proceed to the next step (e.g., navigate to the game page)
  }
}
