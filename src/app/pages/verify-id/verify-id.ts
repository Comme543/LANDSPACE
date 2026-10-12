import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-id',
  imports: [FormsModule],
  templateUrl: './verify-id.html',
  styleUrl: './verify-id.css'
})
export class VerifyId {

  idNumber: string = '';

  isVerifying: boolean = false;


  constructor(
    private router: Router
  ) {}


  verifyId() {

    if (!this.idNumber.trim()) {

      alert(
        'Please enter your ID number.'
      );

      return;
    }


    if (this.idNumber.trim().length < 6) {

      alert(
        'Please enter a valid ID number.'
      );

      return;
    }


    this.isVerifying = true;


    // Simulate ID verification
    setTimeout(() => {

      this.isVerifying = false;


      // Save verification status
      localStorage.setItem(
        'idVerified',
        'true'
      );


      alert(
        'ID verification successful!'
      );


      // Continue to registration
      this.router.navigate([
        '/register'
      ]);

    }, 1500);

  }

}