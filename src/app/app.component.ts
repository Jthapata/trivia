import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  authService = inject(AuthService)

  ngOnInit() {
    this.authService.user$.subscribe((user: { email: any; uid: any; }) => {
      if (user) {
        this.authService.currentUserSig.set(
          {
            email: user.email,
            id: user.uid
          }
        )
      } else {
        this.authService.currentUserSig.set(null)
      }
      console.log(this.authService.currentUserSig())
    })
  }

  title = 'trivia';
}
