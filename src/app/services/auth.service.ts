import {inject, Injectable, signal} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {User} from "../interfaces/user";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)
  route = inject(Router)
  currentUserSig = signal<User | null | undefined>(undefined)

  constructor(
    private db: AngularFirestore
  ) { }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => {})

    return from(promise)
  }

  register(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => this.addUserToDatabase(response.user.email!, response.user.uid!))

    return from(promise)
  }

  addUserToDatabase(email: string, uid: string) {
    const user: User = {
      email,
      id: uid,
      games_played: 0,
      games_won: 0,
      games_lost: 0,
      total_questions: 0,
      correct_answers: 0,
      wrong_answers: 0,
      cat_general: 0,
      cat_music: 0,
      cat_videoGames: 0,
      cat_mythology: 0,
      cat_history: 0
    }
    this.db.collection('users').doc(uid).set(user).then(() => console.log('User added to database'));
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut()
    return from(promise)
  }
}
