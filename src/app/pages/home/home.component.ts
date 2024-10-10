import { Component } from '@angular/core';
import {LoginComponent} from "../../components/login/login.component";
import {RegisterComponent} from "../../components/register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
