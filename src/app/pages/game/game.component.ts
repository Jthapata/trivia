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
import {GameStatsComponent} from "../../components/gameComponents/game-stats/game-stats.component";
import {
  SubmitAnswerButtonComponent
} from "../../components/gameComponents/submit-answer-button/submit-answer-button.component";
import {
  NextQuestionButtonComponent
} from "../../components/gameComponents/next-question-button/next-question-button.component";
import {Question} from "../../interfaces/question";
import {
  FinishGameButtonComponent
} from "../../components/gameComponents/finish-game-button/finish-game-button.component";
import {GameOverModalComponent} from "../../components/gameComponents/game-over-modal/game-over-modal.component";
import {PlayerStats} from "../../interfaces/player-stats";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatCard, QuestionComponent, AnswersComponent, MatCardTitle, MatCardHeader, MatCardContent, GameStatsComponent, SubmitAnswerButtonComponent, NextQuestionButtonComponent, FinishGameButtonComponent, GameOverModalComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  gameSettings: any;
  selectedPlayers: User[] = [];
  private playersSubscription!: Subscription;
  currentPlayerIndex = 0;
  loading = true;
  submitted = false;
  showNextButton = false;
  noMoreQuestions = false;
  gameOver = false;
  currentAnswers: string[] = [];
  selectedAnswer: string = '';
  currentQuestion: Question | undefined;
  isAnswerCorrect: boolean = true;
  winner: string = '';
  playersStats: PlayerStats[] = [];

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

    this.gameService.getQuestions()
      .then(response => response.json())
      .then(data => {
        this.questionsService.setQuestions(data.results);
      })
      .then(() => {
        this.loading = false;
        this.currentAnswers = this.questionsService.getCurrentAnswers();
        this.currentQuestion = this.questionsService.getCurrentQuestion();
      });

    if (selectedPlayerIds && selectedPlayerIds.length > 0) {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where(documentId(), 'in', selectedPlayerIds));

      this.playersSubscription = collectionData(q, { idField: 'docId' }).subscribe((users: User[]) => {
        this.selectedPlayers = users;

        this.playersService.resetPlayerStats();
        this.selectedPlayers.forEach(user => {
          this.playersService.setPlayerStats(user.email, 0, 0);
        });
        this.playersStats = this.playersService.getAllPlayerStats();
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

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
  }

  submitAnswer() {
    if (this.selectedAnswer) {
      const currentPlayer = this.selectedPlayers[this.currentPlayerIndex];
      this.isAnswerCorrect = this.questionsService.checkAnswer(this.selectedAnswer);
      if (this.isAnswerCorrect) {
        this.playersService.setPlayerStats(currentPlayer.email, 1, 0);
      } else {
        this.playersService.setPlayerStats(currentPlayer.email, 0, 1);
      }
      this.submitted = true;
      this.questionsService.nextQuestion();
      if (this.questionsService.getCurrentQuestion() === undefined) {
        this.noMoreQuestions = true;
        this.winner = this.playersService.getAllPlayerStats()
          .reduce((prev, current) => {
            return (prev.correctAnswers > current.correctAnswers) ? prev : current;
          }).email;
        return;
      }
      this.showNextButton = true;
    }
  }

  nextButtonClicked() {
    this.nextQuestion()
  }

  nextQuestion() {
    this.submitted = false;
    this.showNextButton = false;
    this.selectedAnswer = '';
    this.currentAnswers = this.questionsService.getCurrentAnswers();
    this.currentQuestion = this.questionsService.getCurrentQuestion();
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.selectedPlayers.length;
  }

  finishGame() {
    this.playersService.getAllPlayerStats().forEach(stat => {
      console.log(`Player: ${stat.email}, Correct: ${stat.correctAnswers}, Incorrect: ${stat.incorrectAnswers}`);
    });
    this.gameOver = true;
  }
}
