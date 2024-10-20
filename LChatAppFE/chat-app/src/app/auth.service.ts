import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9831/api/users';
//  private loggedInUser: any; // Variable to store logged-in user information
  private loggedInUser: any; // Store logged-in user information

  constructor(private http: HttpClient) {
    this.loggedInUser = null; // Initially, no user is logged in

  }

  register(user: { email: string; firstName: string; lastName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email });
  }

  getLoggedInUserId(): number | null {
    return this.loggedInUser ? this.loggedInUser.id : null; // Return the user's ID or null if not logged in
  }
}
