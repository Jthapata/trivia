import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CategorySelectionComponent } from '../../components/gameSetupComponents/category-selection/category-selection.component';
import { DifficultySelectionComponent } from '../../components/gameSetupComponents/difficulty-selection/difficulty-selection.component';
import { NumberOfPlayersComponent } from '../../components/gameSetupComponents/number-of-players/number-of-players.component';
import { NumberOfQuestionsComponent } from '../../components/gameSetupComponents/number-of-questions/number-of-questions.component';
import { QuestionTypeSelectionComponent } from '../../components/gameSetupComponents/question-type-selection/question-type-selection.component';
import { SelectedPlayersComponent } from '../../components/gameSetupComponents/selected-players/selected-players.component';
import { StartGameButtonComponent } from '../../components/gameSetupComponents/start-game-button/start-game-button.component';
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [
    CommonModule,
    NumberOfPlayersComponent,
    SelectedPlayersComponent,
    NumberOfQuestionsComponent,
    CategorySelectionComponent,
    DifficultySelectionComponent,
    QuestionTypeSelectionComponent,
    StartGameButtonComponent,
    MatCardModule,
    MatDividerModule,
    MatButtonModule

  ],
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss'],
})
export class GameSetupComponent implements OnInit, OnDestroy {
  availableUsers$!: Observable<User[]>;
  numberOfPlayers: number = 1;
  selectedPlayers: string[] = [];
  numberOfQuestions: number = 6;
  selectedCategory: number | 'any' = 'any';
  selectedDifficulty: string | 'any' = 'any';
  selectedQuestionType: string | 'any' = 'any';
  categories: any[] = [];

  // Variable to hold the current user's ID
  currentUserId: string | null = null;
  private userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router,
    private gameService: GameService
  ) {
    this.categories = this.gameService.getCategories();
  }

  ngOnInit() {
    this.fetchAvailableUsers();
    this.subscribeToAuthUser();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  subscribeToAuthUser() {
    this.userSubscription = this.authService.user$.subscribe((user: { uid: string | null; }) => {
      if (user) {
        this.currentUserId = user.uid;
        if (this.numberOfPlayers === 1) {
          this.selectedPlayers = [this.currentUserId!];
        }
      } else {
        this.currentUserId = null;
        this.selectedPlayers = [];
      }
    });
  }

  fetchAvailableUsers() {
    const usersRef = collection(this.firestore, 'users');
    this.availableUsers$ = collectionData(usersRef, { idField: 'id' }) as Observable<User[]>;
  }

  onNumberOfPlayersChange(value: number) {
    this.numberOfPlayers = value;
    if (this.numberOfPlayers === 1) {
      if (this.currentUserId) {
        this.selectedPlayers = [this.currentUserId];
      } else {
        this.selectedPlayers = [];
      }
    } else {
      this.selectedPlayers = [];
    }
  }

  onSelectedPlayersChange(value: string[]) {
    this.selectedPlayers = value;
  }

  onNumberOfQuestionsChange(value: number) {
    this.numberOfQuestions = value;
  }

  onCategoryChange(value: number | 'any') {
    this.selectedCategory = value;
  }

  onDifficultyChange(value: string | 'any') {
    this.selectedDifficulty = value;
  }

  onQuestionTypeChange(value: string | 'any') {
    this.selectedQuestionType = value;
  }

  startGame() {
    // Validation checks
    if (this.numberOfPlayers > 1 && this.selectedPlayers.length !== this.numberOfPlayers) {
      console.log('Please select the correct number of players.');
      return;
    }

    //check when number of players is 1
    if (this.numberOfPlayers === 1 && (!this.selectedPlayers || this.selectedPlayers.length !== 1)) {
      console.log('Error: No player selected.');
      return;
    }

    // Store the game settings in the GameService
    const gameSettings = {
      numberOfPlayers: this.numberOfPlayers,
      selectedPlayers: this.selectedPlayers,
      numberOfQuestions: this.numberOfQuestions,
      selectedCategory: this.selectedCategory,
      selectedDifficulty: this.selectedDifficulty,
      selectedQuestionType: this.selectedQuestionType,
    };

    this.gameService.setGameSettings(gameSettings);

    this.router.navigate(['/game']);
  }
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('User logged out successfully');
        this.router.navigate(['/home']); // Redirect to Home Page
      },
      error: (error) => {
        console.error('Error logging out:', error);
      },
    });
  }
}
