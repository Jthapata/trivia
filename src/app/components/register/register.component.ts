import {Component, inject} from '@angular/core';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../../services/auth.service";
import { FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatError
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService = inject(AuthService)
  emailFC = new FormControl('', [Validators.required, Validators.email])
  passwordFC = new FormControl('', [Validators.required, Validators.minLength(6)])
  router = inject(Router)
  emailInUseError: boolean = false

  register() {
    if (this.emailFC.invalid || this.passwordFC.invalid) {
      return
    }
    this.authService.register(this.emailFC.value!, this.passwordFC.value!)
      .subscribe({
        next: () => {
          console.log('User registered')
        },
        error: (error) => {
          if (error.code === 'auth/email-already-in-use') {
            this.emailInUseError = true
            console.log('Email already in use')
        }}
      })
  }
}
