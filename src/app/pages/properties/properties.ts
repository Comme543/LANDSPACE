import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-properties',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './properties.html',
  styleUrl: './properties.css'
})
export class Properties {

  properties: any[] = [];

  filteredProperties: any[] = [];

  searchText: string = '';

  selectedType: string = 'All Types';

  selectedPrice: string = 'Any Price';


  constructor(
    private propertyService: PropertyService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    this.loadProperties();

  }


  loadProperties() {

    this.propertyService
      .getProperties()
      .subscribe({

        next: (data: any[]) => {

          console.log(
            'Backend properties:',
            data
          );

          this.properties = data;

          this.filteredProperties = [
            ...data
          ];

          /*
           * Force Angular to refresh
           * the property list immediately.
           */
          this.changeDetectorRef.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading properties:',
            error
          );

          alert(
            'Unable to load properties from backend.'
          );

        }

      });

  }


  searchProperties() {

    const search =
      this.searchText
        .toLowerCase()
        .trim();


    this.filteredProperties =
      this.properties.filter(
        (property: any) => {

          const location =
            property.location
              ?.toLowerCase() || '';


          const typeMatch =
            this.selectedType ===
              'All Types' ||
            property.propertyType ===
              this.selectedType;


          const priceMatch =
            this.checkPrice(
              property.price
            );


          const locationMatch =
            !search ||
            location.includes(search);


          return (
            locationMatch &&
            typeMatch &&
            priceMatch
          );

        }
      );

  }


  checkPrice(price: string): boolean {

    if (
      this.selectedPrice ===
      'Any Price'
    ) {

      return true;

    }


    const priceText =
      price?.toLowerCase() || '';


    if (
      this.selectedPrice ===
      'Under ₹20 Lakh'
    ) {

      return (
        priceText.includes('lakh') &&
        parseFloat(priceText) < 20
      );

    }


    if (
      this.selectedPrice ===
      '₹20 - ₹50 Lakh'
    ) {

      return (
        priceText.includes('lakh') &&
        parseFloat(priceText) >= 20 &&
        parseFloat(priceText) <= 50
      );

    }


    if (
      this.selectedPrice ===
      '₹50 Lakh - ₹1 Crore'
    ) {

      return (
        (
          priceText.includes('lakh') &&
          parseFloat(priceText) > 50
        )
        ||
        priceText.includes('crore')
      );

    }


    if (
      this.selectedPrice ===
      'Above ₹1 Crore'
    ) {

      return priceText.includes(
        'crore'
      );

    }


    return true;

  }

}