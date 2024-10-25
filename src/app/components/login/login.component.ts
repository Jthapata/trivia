import {Component, inject} from '@angular/core';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatInput,
    FormsModule,
    MatButton,
    MatError,
    ReactiveFormsModule,
    MatDivider,
    NgIf

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService)
  emailFC = new FormControl('', [Validators.required, Validators.email])
  passwordFC = new FormControl('', [Validators.required])
  router = inject(Router)
  errorMessage: string | null = null

  login() {
    if (this.emailFC.invalid || this.passwordFC.invalid) {
      return
    }
    this.authService.login(this.emailFC.value!, this.passwordFC.value!)
      .subscribe({
        next: () => {
          this.router.navigate(['/game-setup'])
        },
        error: () => {
          this.errorMessage = 'Invalid email or password'
        }
      })
  }
}
