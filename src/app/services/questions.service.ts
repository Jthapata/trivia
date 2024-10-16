import { Injectable } from '@angular/core';
import {Question} from "../interfaces/question";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questions: Question[] = [];
  private currentQuestion: Question | undefined;
  private currentAnswers: string[] = [];

  constructor() { }

  setQuestions(questions: Question[]) {
    this.questions = questions;
    if (this.questions.length > 0) {
      this.currentQuestion = this.questions.shift();
    }
    this.mixAnswers();
  }

  getCurrentQuestion() : Question | undefined {
    return this.currentQuestion;
  }

  getCurrentAnswers() : string[] {
    return this.currentAnswers;
  }

  checkAnswer(selectedAnswer: string) {
    return !!(this.currentQuestion && selectedAnswer === this.currentQuestion.correct_answer);
  }

  nextQuestion() {
    if (this.questions.length > 0) {
      this.currentQuestion = this.questions.shift();
    } else {
      this.currentQuestion = undefined;
    }
    this.mixAnswers();
  }

  mixAnswers() {
    if (this.currentQuestion) {
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer);
      answers = this.shuffle(answers);
      this.currentAnswers = answers;
    }
  }

  private shuffle(answers: string[]) {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }
}
