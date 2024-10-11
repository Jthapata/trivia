import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { NumberOfPlayersComponent } from '../../components/gameSetupComponents/number-of-players/number-of-players.component';
import { SelectedPlayersComponent } from '../../components/gameSetupComponents/selected-players/selected-players.component';
import { NumberOfQuestionsComponent } from '../../components/gameSetupComponents/number-of-questions/number-of-questions.component';
import { CategorySelectionComponent } from '../../components/gameSetupComponents/category-selection/category-selection.component';
import { DifficultySelectionComponent } from '../../components/gameSetupComponents/difficulty-selection/difficulty-selection.component';
import { QuestionTypeSelectionComponent } from '../../components/gameSetupComponents/question-type-selection/question-type-selection.component';
import { StartGameButtonComponent } from '../../components/gameSetupComponents/start-game-button/start-game-button.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

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
  ],
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss'],
})
export class GameSetupComponent implements OnInit {
  availableUsers$!: Observable<User[]>;
  numberOfPlayers: number = 1;
  selectedPlayers: string[] = [];
  numberOfQuestions: number = 6;
  selectedCategory: number | 'any' = 'any';
  selectedDifficulty: string | 'any' = 'any';
  selectedQuestionType: string | 'any' = 'any';

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.fetchAvailableUsers();
  }

  fetchAvailableUsers() {
    const usersRef = collection(this.firestore, 'users');
    this.availableUsers$ = collectionData(usersRef, { idField: 'id' }) as Observable<User[]>;
  }

  onNumberOfPlayersChange(value: number) {
    this.numberOfPlayers = value;
    this.selectedPlayers = [];
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

    // Navigate to the game page
    this.router.navigate(['/game']);
  }
}