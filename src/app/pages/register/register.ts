import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  fullName: string = '';

  email: string = '';

  mobile: string = '';

  password: string = '';

  confirmPassword: string = '';

  private apiUrl =
    'http://localhost:8080/api/users';


  constructor(
    private router: Router,
    private http: HttpClient
  ) {

    // Check ID verification
    const idVerified =
      localStorage.getItem('idVerified');

    if (idVerified !== 'true') {

      alert(
        'Please verify your ID before creating an account.'
      );

      this.router.navigate([
        '/verify-id'
      ]);

    }

  }


  createAccount() {

    // Check ID verification
    const idVerified =
      localStorage.getItem('idVerified');

    if (idVerified !== 'true') {

      alert(
        'Please verify your ID before creating an account.'
      );

      this.router.navigate([
        '/verify-id'
      ]);

      return;
    }


    // Check all fields
    if (
      !this.fullName.trim() ||
      !this.email.trim() ||
      !this.mobile.trim() ||
      !this.password ||
      !this.confirmPassword
    ) {

      alert(
        'Please fill all the fields.'
      );

      return;
    }


    // Check email
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        this.email.trim()
      )
    ) {

      alert(
        'Please enter a valid email address.'
      );

      return;
    }


    // Check mobile
    const mobilePattern =
      /^[0-9]{10}$/;

    if (
      !mobilePattern.test(
        this.mobile.trim()
      )
    ) {

      alert(
        'Please enter a valid 10-digit mobile number.'
      );

      return;
    }


    // Check password length
    if (
      this.password.length < 6
    ) {

      alert(
        'Password must contain at least 6 characters.'
      );

      return;
    }


    // Check password confirmation
    if (
      this.password !==
      this.confirmPassword
    ) {

      alert(
        'Password and Confirm Password do not match.'
      );

      return;
    }


    // User data
    const user = {

      fullName:
        this.fullName.trim(),

      email:
        this.email.trim().toLowerCase(),

      mobile:
        this.mobile.trim(),

      password:
        this.password

    };


    // Send user to Spring Boot
    this.http
      .post(
        `${this.apiUrl}/register`,
        user
      )
      .subscribe({

        next: (response) => {

          if (!response) {

            alert(
              'An account with this email already exists.'
            );

            return;
          }


          // Remove old local user
          localStorage.removeItem(
            'user'
          );

          localStorage.removeItem(
            'isLoggedIn'
          );

          localStorage.removeItem(
            'rememberMe'
          );


          // Verification has been completed
          localStorage.removeItem(
            'idVerified'
          );


          alert(
            'Account created successfully!'
          );


          // Go to login
          this.router.navigate([
            '/login'
          ]);

        },


        error: (error) => {

          console.error(
            'Registration error:',
            error
          );


          alert(
            'Unable to create account. Please try again.'
          );

        }

      });

  }

}