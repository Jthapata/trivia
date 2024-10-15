import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { documentId } from '@angular/fire/firestore';
import { QuestionsService } from "../../services/questions.service";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  gameSettings: any;
  selectedPlayers: User[] = [];
  private playersSubscription!: Subscription;

  constructor(
    private gameService: GameService,
    private firestore: Firestore,
    private questionsService: QuestionsService,
  ) {}

  ngOnInit() {
    // Retrieve the game settings from the service
    this.gameSettings = this.gameService.getGameSettings();
    console.log('Game Settings:', this.gameSettings);

    // Now fetch the user details for the selectedPlayers
    const selectedPlayerIds: string[] = this.gameSettings.selectedPlayers;
    console.log('Selected Player IDs:', selectedPlayerIds); // Add this line

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
          console.log(`ID: ${user.id}, Email: ${user.email}`);
        });
      });
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
