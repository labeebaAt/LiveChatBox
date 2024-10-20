import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (err) => console.error(err),
    });
  }
}
