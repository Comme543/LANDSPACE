import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  properties: any[] = [];

  listedProperties: number = 0;

  verifiedProperties: number = 0;


  constructor(
    private router: Router,
    private propertyService: PropertyService
  ) {

    this.loadDashboardData();

  }


  loadDashboardData() {

    this.propertyService
      .getProperties()
      .subscribe({

        next: (data: any[]) => {

          this.properties = data;

          this.listedProperties =
            this.properties.length;


          this.verifiedProperties =
            this.properties.filter(
              property =>
                !property.status ||
                property.status === 'Verified'
            ).length;

        },


        error: (error) => {

          console.error(
            'Error loading dashboard properties:',
            error
          );

          this.properties = [];

          this.listedProperties = 0;

          this.verifiedProperties = 0;

        }

      });

  }


  logout() {

    localStorage.removeItem(
      'isLoggedIn'
    );

    localStorage.removeItem(
      'rememberMe'
    );


    alert(
      'You have been logged out.'
    );


    this.router.navigate([
      '/login'
    ]);

  }

}