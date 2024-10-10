import {inject, Injectable, signal} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<User | null | undefined>(undefined)

  constructor() { }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => {})

    return from(promise)
  }

  register(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => updateProfile(response.user, {}))

    return from(promise)
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut()
    return from(promise)
  }
}
