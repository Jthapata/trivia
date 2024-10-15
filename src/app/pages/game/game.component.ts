import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { documentId } from '@angular/fire/firestore';
import { QuestionsService } from "../../services/questions.service";
import {PlayersService} from "../../services/players.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {QuestionComponent} from "../../components/gameComponents/question/question.component";
import {AnswersComponent} from "../../components/gameComponents/answers/answers.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatCard, QuestionComponent, AnswersComponent, MatCardTitle, MatCardHeader, MatCardContent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  gameSettings: any;
  selectedPlayers: User[] = [];
  private playersSubscription!: Subscription;
  currentPlayerIndex = 0;
  loading = true;

  constructor(
    private gameService: GameService,
    private firestore: Firestore,
    private questionsService: QuestionsService,
    private playersService: PlayersService,
  ) {}

  ngOnInit() {
    // Retrieve the game settings from the service
    this.gameSettings = this.gameService.getGameSettings();

    // Now fetch the user details for the selectedPlayers
    const selectedPlayerIds: string[] = this.gameSettings.selectedPlayers;

    // Fetch the questions, get the first question and mix the answers
    this.gameService.getQuestions()
      .then(response => response.json())
      .then(data => {
        this.questionsService.setQuestions(data.results);
      });

    if (selectedPlayerIds && selectedPlayerIds.length > 0) {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where(documentId(), 'in', selectedPlayerIds));

      this.playersSubscription = collectionData(q, { idField: 'docId' }).subscribe((users: User[]) => {
        this.selectedPlayers = users;

        // Log each user's ID and email
        this.selectedPlayers.forEach(user => {
          this.playersService.setPlayerStats(user.email, 0, 0);
        });
      });
      this.loading = false;
    } else {
      console.log('No selected players');
    }
  }


  ngOnDestroy() {
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
  }
}
