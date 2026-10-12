
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;

  private apiUrl =
    'http://localhost:8080/api/users';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login() {
    if (!this.email.trim() || !this.password) {
      alert('Please enter email and password.');
      return;
    }

    this.isLoading = true;

    const loginData = {
      email: this.email.trim().toLowerCase(),
      password: this.password
    };

    this.http.post<any>(
      `${this.apiUrl}/login`,
      loginData
    ).subscribe({
      next: (user) => {
        this.isLoading = false;

        if (!user || !user.id) {
          alert('Invalid email or password.');
          return;
        }

        localStorage.setItem('isLoggedIn', 'true');

        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }

        // Store user details, but never store the password.
        localStorage.setItem('loggedInUser', JSON.stringify({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          mobile: user.mobile
        }));

        alert('Login successful!');

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;

        console.error('Login error:', error);

        if (error.status === 0) {
          alert('Cannot connect to the backend. Please check Spring Boot.');
        } else {
          alert('Login failed. Please check your email and password.');
        }
      }
    });
  }
}