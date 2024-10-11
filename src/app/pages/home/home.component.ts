import {Component, inject, OnInit} from '@angular/core';
import {LoginComponent} from "../../components/login/login.component";
import {RegisterComponent} from "../../components/register/register.component";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService)
  router = inject(Router)

  ngOnInit() {
    this.authService.user$.subscribe((user: any) => {
      if (user) {
        this.router.navigate(['/game-setup'])
      }
    })
  }
}
