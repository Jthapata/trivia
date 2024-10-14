import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Firestore, docData, doc } from '@angular/fire/firestore';
import { User as FirebaseUser } from '@angular/fire/auth'; 
import { User as AppUser, User } from '../../interfaces/user';   
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser$!: Observable<AppUser | undefined>;
  currentUserId: string | null = null;

  bestCategory: string = '';
  worstCategory: string = '';

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the current user's ID
    this.authService.user$.subscribe((user: FirebaseUser | null) => {
      if (user) {
        this.currentUserId = user.uid;
        console.log('Current User ID:', this.currentUserId);
        this.fetchUserData();
      } else {
        console.error('User not logged in');

        this.router.navigate(['/login']);
      }
    });
  }

  fetchUserData() {
    if (this.currentUserId) {
      const userDocRef = doc(this.firestore, 'users', this.currentUserId);
      this.currentUser$ = docData(userDocRef) as Observable<AppUser>;
  
      this.currentUser$.subscribe((userData) => {
        if (userData) {
          console.log('User Data:', userData);
          this.calculateBestAndWorstCategories(userData);
        } else {
          console.error('No user data found for ID:', this.currentUserId);
        }
      });
    } else {
      console.error('Current User ID is null');
    }
  }

  calculateBestAndWorstCategories(userData: User) {
    // Create an array of category objects
    const categories = [
      { name: 'General Knowledge', value: userData.cat_general || 0 },
      { name: 'History', value: userData.cat_history || 0 },
      { name: 'Music', value: userData.cat_music || 0 },
      { name: 'Mythology', value: userData.cat_mythology || 0 },
      { name: 'Video Games', value: userData.cat_videoGames || 0 },
    ];

    // Sort categories alphabetically to handle ties
    categories.sort((a, b) => a.name.localeCompare(b.name));

    // Find the category with the highest value
    const bestCategory = categories.reduce((prev, current) => {
      return current.value > prev.value ? current : prev;
    }, categories[0]);

    // Find the category with the lowest value
    const worstCategory = categories.reduce((prev, current) => {
      return current.value < prev.value ? current : prev;
    }, categories[0]);

    this.bestCategory = bestCategory.name;
    this.worstCategory = worstCategory.name;
  }

  calculateAccuracy(correctAnswers?: number, totalQuestions?: number): number {
    if (!correctAnswers || !totalQuestions || totalQuestions === 0) {
      return 0;
    }
    return Math.round((correctAnswers / totalQuestions) * 100);
  }
  navigateToGameSetup() {
    this.router.navigate(['/game-setup']);
  }
}