import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Array to hold the list of users
  loggedInUserId: number | null = null;  // Variable to store the logged-in user's ID

  constructor(private authService: AuthService, private chatService: ChatService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers(); // Load users on component initialization
  }

  loadUsers(): void {
    // Get the logged-in user's ID from AuthService
    this.loggedInUserId = this.authService.getLoggedInUserId();

   /* this.chatService.getUserChats(this.loggedInUserId).subscribe({
      next: (data) => {
        this.users = data; // Assign the fetched users to the component's users array
      },
      error: (err) => console.error(err),
    });
  }*/
    if (this.loggedInUserId !== null) {
      this.chatService.getUserChats(this.loggedInUserId).subscribe({
        next: (data) => {
          this.users = data; // Assign the fetched users to the component's users array
        },
        error: (err) => console.error(err),
      });
    } else {
      console.error('No logged-in user found.');
    }
  }

  startChat(userId: number): void {
    // Navigate to chat component with the selected user's ID
    this.router.navigate(['/chat', userId]);
  }
}
